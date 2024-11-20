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
              <v-col cols="12" md="6" class="pt-1 pb-1">
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

if (localStorage.getItem("role") == "READER") {
  router.push("/login");
}
// Hàm xử lý submit form
const handleSubmit = () => {
  const url = `http://${ipAddress}:${port}/api/book/${bookId}`;
  // Lấy ngày hiện tại
  const currentDate = new Date();
  const formattedCurrentDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  // Kiểm tra và gán lại giá trị cho publicationDate
  if (new Date(formData.value.publicationYear) > currentDate) {
    formData.value.publicationYear = formattedCurrentDate;
  }

  axios
    .put(
      url,
      {
        title: formData.value.bookTitle,
        published_year: formData.value.publicationYear,
        authors: [formData.value.author],
        genres: [formData.value.category],
      },
      {
        headers: {
          // Thêm token vào header Authorization
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      alertVisible.value = true;
      // Tự động tắt sau 1,5 giây (nếu cần)
      setTimeout(() => {
        alertVisible.value = false;
      }, 1500);
      console.log("Success:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Kiểm tra lại thông tin");
    });
};
</script>
