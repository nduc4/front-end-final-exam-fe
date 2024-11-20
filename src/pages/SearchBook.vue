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
          <!-- Form tìm kiếm -->
          <v-form @submit.prevent="handleSubmit" ref="form">
            <v-row>
              <v-col cols="12" md="6" class="pt-1 pb-1">
                <InputField :label="inputLabels[0]" v-model="formData.Title" />
              </v-col>
              <v-col cols="12" md="6" class="pt-1 pb-1">
                <InputField :label="inputLabels[1]" v-model="formData.author" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4" class="pt-1 pb-1">
                <ComboBox
                  :label="inputLabels[2]"
                  v-model="formData.genre"
                  :items="categoryOptions"
                />
              </v-col>
            </v-row>
            <ButtonComponent
              style="margin-top: 30px"
              background="green"
              color="white"
              text="Tìm Kiếm"
              @click="handleSubmit"
            ></ButtonComponent>
          </v-form>
          <!-- Bảng kết quả -->
          <v-table v-if="searchResults.length" class="mt-4">
            <thead>
              <tr>
                <th class="text-left">Tên sách</th>
                <th class="text-left">Tác giả</th>
                <th class="text-left">Ngày xuất bản</th>
                <th class="text-left">Thể loại</th>
                <th class="text-left">Mượn sách</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in searchResults" :key="index">
                <td>{{ item.title }}</td>
                <td>{{ item.author }}</td>
                <td>{{ item.published_year }}</td>
                <td>{{ item.genre }}</td>
                <td @click="borrowBook(item)">
                  <!-- nút mượn sách -->
                  <v-btn color="blue">Mượn</v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-alert v-else type="info" color="blue-lighten-3" class="mt-4">
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

interface Book {
  _id: string; // Thay vì id, sử dụng _id theo dữ liệu trả về từ API
  title: string;
  author: string;
  published_year: string;
  genre: string;
}
// Dữ liệu tìm kiếm
const searchResults = ref<Book[]>([]);

// Dữ liệu form
const formData = ref({
  Title: "",
  author: "",
  genre: "",
});
const accessToken = localStorage.getItem("access_token");
const router = useRouter();
const categoryOptions = ["FANTASY", "LIGHT NOVEL"];
const inputLabels = ["Tên sách", "Tác giả", "Thể loại"];
const repeatCount = inputLabels.length;
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


// Hàm xử lý submit từ formData
const handleSubmit = async () => {
  try {
    console.log("Form submitted:", formData.value); // Kiểm tra form data

    // Tạo params từ formData để gửi request
    const params = new URLSearchParams();

    if (formData.value.Title) {
      params.append("title", formData.value.Title);
    }

    if (formData.value.author) {
      params.append("author", formData.value.author); // Gửi ID tác giả
    }

    if (formData.value.genre) {
      params.append("genre", formData.value.genre);
    }

    // Gửi request đến API với params
    const response = await axios.get("http://103.77.242.79:3005/api/book", {
      params,
    });

    console.log("API response:", response); // Kiểm tra kết quả từ API

    if (response.data?.data?.length > 0) {
      // Lấy danh sách dữ liệu
      const books = response.data.data;
      await enrichBooksWithAuthorsAndGenres(books); // Thêm thông tin từ API
      searchResults.value = books;
    } else {
      searchResults.value = [];
      alert("Không tìm thấy kết quả nào.");
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    alert("Không thể thực hiện tìm kiếm. Vui lòng thử lại.");
  }
};

// Maps để lưu dữ liệu
const authorMap = ref<{ [key: string]: { name: string } }>({});
const genreMap = ref<{ [key: string]: { name: string } }>({});

// Hàm làm giàu thông tin sách với tác giả và thể loại
const enrichBooksWithAuthorsAndGenres = async (books: any[]) => {
  // Lấy danh sách các ID cần xử lý
  const allAuthorIds = [...new Set(books.flatMap((item) => item.author_id || []))];
  const allGenreIds = [...new Set(books.flatMap((item) => item.genre_id || []))];

  console.log("Danh sách author_id:", allAuthorIds);
  console.log("Danh sách genre_id:", allGenreIds);

  // Gọi API để lấy thông tin
  await Promise.all([fetchAuthorsByIds(allAuthorIds), fetchGenresByIds(allGenreIds)]);


  // Làm giàu dữ liệu sách với tên tác giả và thể loại
  books.forEach((book) => {
    book.author = book.author_id
      ?.map((id: string) => authorMap.value[id]?.name || "Không rõ")
      .join(", ");
    book.genre = book.genre_id
      ?.map((id: string) => genreMap.value[id]?.name || "Không rõ")
      .join(", ");
      if (book.published_year) {
      const date = new Date(book.published_year);
      book.published_year = date.toISOString().split("T")[0];
    }
  });
};

// Hàm gọi API lấy thông tin tác giả
const fetchAuthorsByIds = async (authorIds: string[]): Promise<void> => {
  try {
    const uniqueIds = authorIds.filter((id) => !authorMap.value[id]); // Lọc các ID chưa có
    if (uniqueIds.length === 0) return;

    const params = new URLSearchParams();
    uniqueIds.forEach((id) => params.append("ids", id));

    const response = await axios.get("http://103.77.242.79:3005/api/author/list", {
      params,
    });

    response.data.forEach((author: any) => {
      authorMap.value[author._id] = { name: author.name };
    });
    console.log("Danh sách tác giả:", response.data);
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

// Hàm gọi API lấy thông tin thể loại
const fetchGenresByIds = async (genreIds: string[]): Promise<void> => {
  try {
    const uniqueIds = genreIds.filter((id) => !genreMap.value[id]); // Lọc các ID chưa có
    if (uniqueIds.length === 0) return;

    const params = new URLSearchParams();
    uniqueIds.forEach((id) => params.append("ids", id));

    const response = await axios.get("http://103.77.242.79:3005/api/genre/list", {
      params,
    });

    response.data.forEach((genre: any) => {
      genreMap.value[genre._id] = { name: genre.name };
    });
    console.log("Danh sách thể loại:", response.data);
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

//LOGIS MƯỢN SÁCH
const borrowBook = async (item: Book) => {
  try {
    // Lưu _id của cuốn sách vào localStorage
    const bookId = item._id;
    localStorage.setItem("book_id", bookId);

    // Kiểm tra bookId
    if (!bookId) {
      console.error("Không tìm thấy book_id.");
      return;
    }

    // Bước 1: Gửi yêu cầu GET để lấy danh sách bản sao của cuốn sách
    const getResponse = await axios.get(
      `http://103.77.242.79:3005/api/book-instance/${bookId}`
    );
    const bookInstances = getResponse.data;
    console.log(bookInstances);
    // Kiểm tra dữ liệu trả về
    if (!Array.isArray(bookInstances) || bookInstances.length === 0) {
      console.error("Không tìm thấy bản sao sách nào hoặc dữ liệu trả về không hợp lệ.");
      return;
    }

    // Lọc bản sao có trạng thái "AVAILABLE"
    const availableCopy = bookInstances.find(
      (instance: any) => instance.status === "AVAILABLE"
    );

    if (!availableCopy) {
      alert("Đã có người mượn");
      console.error("Không tìm thấy bản sao sách nào có trạng thái 'AVAILABLE'.");
      return;
    }
    console.log(accessToken);
    const bookCopyId = availableCopy._id;
    console.log(bookCopyId);
    // Bước 2: Gửi yêu cầu POST để mượn sách với id bản sao
    const postResponse = await axios.post(
  `http://103.77.242.79:3005/api/loan/${bookCopyId}`,
  {}, // Body trống, nếu API không yêu cầu dữ liệu trong body
  {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Thêm token vào header
    },
  }
);

    console.log("Mượn sách thành công:", postResponse.data);
  } catch (error: any) {
    // Xử lý lỗi nếu có
    if (error.response) {
      console.error(`Lỗi API (${error.response.status}):`, error.response.data);
    } else {
      console.error("Lỗi khác:", error.message);
    }
  }
};
</script>
<style scoped>
.actions-cell {
  display: flex;
  align-items: center; /* Căn giữa các biểu tượng theo chiều dọc */
}

.actions-cell .v-icon {
  cursor: pointer;
}
</style>
