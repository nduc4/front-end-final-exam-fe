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
          <h1 class="mb-4 text-center">CHỈNH SỬA</h1>
          <v-form @submit.prevent="handleSubmit" ref="form">
            <!-- Tên sách và Tác giả -->
            <v-row>
              <v-col cols="12" md="6" class="pt-1 pb-1">
                <InputField
                  :label="inputLabels[0]"
                  v-model="formData.bookTitle"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-1 pb-1">
                <InputField :label="inputLabels[1]" v-model="formData.author" />
              </v-col>
            </v-row>

            <!-- Thể loại, Phân loại và Năm xuất bản -->
            <v-row>
              <v-col cols="12" md="4" class="pt-1 pb-1">
                <ComboBox
                  :label="inputLabels[2]"
                  v-model="formData.category"
                  :items="categoryOptions"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-1 pb-1">
                <PublicationYear
                  label="Năm xuất bản"
                  v-model="formData.publicationYear"
                />
              </v-col>
            </v-row>

            <!-- Đổi hình ảnh -->
            <ImageChanger :showImageChanger="true" class="nt-4 pt-0 pb-0" />

            <!-- Nút submit -->
            <v-row>
              <v-col
                :class="{
                  'text-right':
                    display.md || display.lg || display.xl || display.xxl,
                  'text-center':
                    !display.md && !display.lg && !display.xl && !display.xxl,
                }"
                class="mt-8 mt-sm-0"
              >
                <Button background="green" color="white" text="Xác nhận" />
                <AlertComponent
                  v-show="alertVisible"
                  text="This is a success message!"
                />
              </v-col>
            </v-row>
          </v-form>
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
import PublicationYear from "@/components/PublicationYearComponent.vue";
import ImageChanger from "@/components/AddImageComponent.vue";
import Button from "@/components/ButtonComponent.vue";
import ComboBox from "@/components/ComboBoxComponent.vue";
import { useDisplay } from "vuetify";
import axios from "axios";

// Sử dụng hook useDisplay để lấy thông tin về các breakpoint
const display = useDisplay();
// Khai báo router
const router = useRouter();

// Dữ liệu form
const formData = ref({
  bookTitle: "",
  author: "",
  category: "",
  publicationYear: "",
});

// Dữ liệu cho các dropdown
const categoryOptions = ["Fantasty", "Tiểu thuyết", "Tài liệu"];

// Các label cho input
const inputLabels = ["Tên sách", "Tác giả", "Thể loại"];
const repeatCount = inputLabels.length;

// Các phương thức chuyển trang
const goToAddBook = () => {
  router.push("/addbook");
};
const goToManageBook = () => {
  router.push("/managebook");
};
const goToSearchBook = () => {
  router.push("/search");
};

// Các items cho AdminComponent
const itemsA = [
  {
    title: "Thêm sách",
    icon: "mdi-plus",
    value: "add",
    method: goToAddBook,
  },
  {
    title: "Chỉnh sửa",
    icon: "mdi-pencil",
    value: "edit",
    method: goToManageBook,
  },
  {
    title: "Tìm kiếm",
    icon: "mdi-magnify",
    value: "search",
    method: goToSearchBook,
  },
];

const ipAddress = import.meta.env.VITE_IP_ADDRESS;
const port = import.meta.env.VITE_PORT;

const bookId = localStorage.getItem("book_id");
const accessToken = localStorage.getItem("access_token");
const alertVisible = ref(false);

if (
  localStorage.getItem("role") == "READER" ||
  localStorage.getItem("access_token") == null
) {
  router.push("/login");
}
// Hàm xử lý submit form
const handleSubmit = () => {
  // URL API
  const url = `http://${ipAddress}:${port}/api/book/${bookId}`;

  // Lấy ngày hiện tại
  const currentDate = new Date();
  const formattedCurrentDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  // Kiểm tra và gán lại giá trị cho publicationYear nếu ngày không hợp lệ
  if (
    formData.value.publicationYear &&
    new Date(formData.value.publicationYear) > currentDate
  ) {
    formData.value.publicationYear = formattedCurrentDate;
  }

  // Tạo payload động
  const payload: Record<string, any> = {};

  // Thêm các trường động vào payload
  if (formData.value.bookTitle) {
    payload.title = formData.value.bookTitle;
  }
  if (formData.value.publicationYear) {
    payload.published_year = formData.value.publicationYear;
  }
  if (formData.value.author) {
    payload.authors = [formData.value.author];
  }
  if (formData.value.category) {
    payload.genres = [formData.value.category];
  }

  // Gửi request đến API với payload
  axios
    .put(url, payload, {
      headers: {
        // Thêm token vào header Authorization
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      alertVisible.value = true;
      console.log(`StatusCode: ${response.status}`); // Hiển thị mã trạng thái
      console.log("Cập nhật thành công:", response.data);

      // Tự động tắt thông báo sau 1,5 giây
      setTimeout(() => {
        alertVisible.value = false;
      }, 1500);
    })
    .catch((error) => {
      console.error("Lỗi khi cập nhật:", error);

      // Xử lý lỗi và hiển thị thông báo
      alert(
        `Cập nhật không thành công. Kiểm tra lại thông tin. ${
          error.response ? `StatusCode: ${error.response.status}` : ""
        }`
      );
    });
};
</script>
