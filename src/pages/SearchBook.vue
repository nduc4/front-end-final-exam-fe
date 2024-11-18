<template>
  <AdminComponent
    :items="itemsA"
    :showUserCard="true"
    :showInputFields="true"
    :repeatCount="repeatCount"
  >
    <template v-slot:input-fields>
      <v-responsive class="mx-auto" max-width="75%">
        <v-card
          class="pt-4 pb-8 pr-8 pl-8"
          elevation="2"
          max-width="100%"
          color="grey-lighten-4"
        >
          <h1 class="mb-4 text-center">TÌM KIẾM</h1>
          <!-- Sử dụng @submit.prevent trên form để gọi handleSubmit -->
          <v-form @submit.prevent="handleSubmit" ref="form">
            <!-- Tên sách và Tác giả -->
            <v-row>
              <v-col cols="12" md="6" class="pt-1 pb-1">
                <InputField
                  :label="inputLabels[0]"
                  v-model="formData.Title"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-1 pb-1">
                <InputField
                  :label="inputLabels[1]"
                  v-model="formData.author"
                  item-text="name"
                  item-value="id"
                  return-object
                />
              </v-col>
            </v-row>

            <!-- Thể loại -->
            <v-row>
              <v-col cols="12" md="4" class="pt-1 pb-1">
                <ComboBox
                  :label="inputLabels[2]"
                  v-model="formData.category"
                  :items="categoryOptions"
                />
              </v-col>

            </v-row>
            <!-- Nút Tìm Kiếm -->

            <ButtonComponent
              style="margin-top: 30px;"
              color="white"
              text="Tìm Kiếm"
              @click="handleSubmit"
            ></ButtonComponent>
          </v-form>
          <!-- Hiển thị kết quả tìm kiếm -->
          <v-data-table
            v-if="searchResults.length"
            :items="searchResults"
            :headers="resultHeaders"
            class="mt-4"
            item-value="id"
            item-key="id"
          >
          </v-data-table>

          <!-- Thông báo khi không có kết quả -->
          <v-alert
            v-else
            type="info"
            color="blue-lighten-3"
            class="mt-4"
          >
            Không tìm thấy kết quả nào phù hợp.
          </v-alert>
        </v-card>
      </v-responsive>
    </template>
  </AdminComponent>
</template>



<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import AdminComponent from "@/components/UIAdminComponent.vue";
import InputField from "@/components/InputComponent.vue";
import ComboBox from "@/components/ComboBoxComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import axios from "axios";


// Khai báo router
const router = useRouter();

// Dữ liệu form
const formData = ref({
  Title: '',
  author: '',
  category: '',
});

// Dữ liệu cho các dropdown
const categoryOptions = ["NTR", "DRAMA", "FANTASY", "LIGHT NOVEL"];

// Các label cho input
const inputLabels = ["Tên sách", "Tác giả", "Thể loại"];
const repeatCount = inputLabels.length;

// Các items cho AdminComponent
const itemsA = [
  {
    title: "Tìm kiếm",
    icon: "mdi-magnify",
    value: "Search",
    method: () => router.push("/search"),
  },
  {
    title: "Thêm sách",
    icon: "mdi-plus",
    value: "add",
    method: () => router.push("/addbook"),
  },
  {
    title: "Chỉnh sửa",
    icon: "mdi-pencil",
    value: "edit",
    method: () => router.push("/editbook"),
  },
];

// Định nghĩa authorMap

// Định nghĩa genreMap (nếu cần)
const genreMap: { [key: string]: string } = {
  "1": "Thể loại 1",
  "2": "Thể loại 2",
  // Thêm các thể loại khác tại đây
};

// Khai báo kiểu dữ liệu cho sách
interface Book {
  title: string;
  published_year: string;
  author: string;
  genre: string;
}

// Lưu trữ kết quả tìm kiếm
// Hàm xử lý submit form
const handleSubmit = async () => {
  try {
    console.log("Form submitted:", formData.value);

    // Tạo params từ formData để gửi request
    const params = new URLSearchParams();

    if (formData.value.Title) {
      params.append("title", formData.value.Title);
    }

    if (formData.value.author) {
      params.append("author", formData.value.author); // Gửi ID tác giả
    }

    if (formData.value.category) {
      params.append("category", formData.value.category);
    }

    // Thêm các tham số cho request

    // Gửi request đến API với params
    const response = await axios.get("http://103.77.242.79:3005/api/book", {
      params, // params chứa các tham số như title, page, limit
    });
    console.log("FormData sau khi nhập:", formData.value);
    console.log("Kết quả tìm kiếm:", response.data);

    // Cập nhật kết quả tìm kiếm
    if (response.data?.data?.length > 0) {
      showResults(response.data.data); // Truyền toàn bộ mảng `data` khi có kết quả
    } else {
      searchResults.value = [];
      alert("Không tìm thấy kết quả nào.");
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    alert("Không thể thực hiện tìm kiếm. Vui lòng thử lại.");
  }
};



// Hàm cập nhật kết quả tìm kiếm
// Dữ liệu kết quả tìm kiếm
const searchResults = ref<Book[]>([]);

// Headers cho bảng hiển thị kết quả
const resultHeaders = [
  { text: "Tên sách", value: "title" },
  { text: "Năm xuất bản", value: "published_year" },
  { text: "Tác giả", value: "author" },
  { text: "Thể loại", value: "genre" },
];


// Hàm cập nhật kết quả tìm kiếm

const showResults = (data: any[]) => {
  if (Array.isArray(data) && data.length > 0) {
    // Chuyển đổi từng đối tượng trong mảng thành dữ liệu phù hợp
    searchResults.value = data.map((item) => ({
      title: item.title || "Chưa có tên",
      published_year: item.published_year
        ? new Date(item.published_year).toLocaleDateString()
          : "Chưa có",
        genre: item.genre_id
        ? item.genre_id
            .map((id: string) => genreMap[id] || "") // Thay thế ID bằng tên
            .join(", ") // Gộp các thể loại thành chuỗi
          : "Không rõ",
    }));
  } else {
    // Nếu không có dữ liệu
    searchResults.value = [];
    alert("Không tìm thấy kết quả nào hoặc dữ liệu không hợp lệ.");
  }
};
</script>
