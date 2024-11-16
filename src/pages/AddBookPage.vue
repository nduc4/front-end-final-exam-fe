<template>
  <AdminComponent
    :items="itemsA"
    :showUserCard="true"
    :showInputFields="true"
    :repeatCount="repeatCount"
  >
    <!-- Đặt v-responsive và v-card bao bọc v-form -->
    <template v-slot:input-fields>
      <v-responsive class="mx-auto" max-width="75%">
        <v-card
          class="pt-4 pb-8 pr-8 pl-8"
          elevation="2"
          max-width="100%"
          color="grey-lighten-4"
        >
          <h1 class="mb-4 text-center">THÊM SÁCH</h1>
          <!-- Bọc tất cả các trường nhập liệu trong v-form -->
          <v-form @submit.prevent="handleSubmit" ref="form">
            <!-- Tên sách và Tác giả trên một hàng riêng -->
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

            <!-- Tác giả và Nhà xuất bản trên cùng một hàng -->
            <v-row>
              <v-col cols="12" md="6" class="pt-1 pb-1">
                <ComboBox
                  :label="inputLabels[2]"
                  v-model="formData.genres"
                  :items="categoryOptions"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-1 pb-1">
                <PublicationYearComponent
                  label="Năm xuất bản"
                  v-model="formData.publicationYear"
                />
              </v-col>
            </v-row>
            <!-- Đổi hình ảnh -->
            <ImageChanger :showImageChanger="true" class="mt-4 pt-0 pb-0" />

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
import ImageChanger from "@/components/AddImageComponent.vue";
import Button from "@/components/ButtonComponent.vue";
import PublicationYearComponent from "@/components/PublicationYearComponent.vue";
import { useDisplay } from "vuetify";
import ComboBox from "@/components/ComboBoxComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";
import axios from "axios";

// Sử dụng hook useDisplay để lấy thông tin về các breakpoint
const display = useDisplay();
const router = useRouter();

const goToAddBook = () => {
  router.push("/addbook");
};
const goToEditBook = () => {
  router.push("/editbook");
};
const goToSearchBook = () => {
  router.push("/searchbook");
};

const itemsA = [
  { title: "Thêm sách", icon: "mdi-plus", value: "add", method: goToAddBook },
  {
    title: "Chỉnh sửa",
    icon: "mdi-pencil",
    value: "edit",
    method: goToEditBook,
  },
  {
    title: "Tìm kiếm",
    icon: "mdi-magnify",
    value: "search",
    method: goToSearchBook,
  },
];
const categoryOptions = ["Fantasty", "Tiểu thuyết", "Tài liệu"];
const inputLabels = ["Tên sách", "Tác giả", "Thể loại"];
const repeatCount = inputLabels.length;

let userName = "";
let email = "";

// Biến chứa dữ liệu form
const formData = ref({
  bookTitle: "",
  author: "",
  genres: "",
  publicationYear: "",
});

const ipAddress = import.meta.env.VITE_IP_ADDRESS;
const port = import.meta.env.VITE_PORT;

const accessToken = localStorage.getItem("access_token");

// Hàm xử lý submit form
const handleSubmit = () => {
  const url = `http://${ipAddress}:${port}/api/book`;

  // Kiểm tra dữ liệu trước khi gửi
  console.log(
    "Data: ",
    formData.value.bookTitle,
    formData.value.publicationYear,
    formData.value.author,
    formData.value.genres
  );

  axios
    .post(
      url,
      {
        title: formData.value.bookTitle,
        published_year: formData.value.publicationYear,
        authors: formData.value.author,
        genres: formData.value.genres,
      },
      {
        headers: {
          // Thêm token vào header Authorization
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      console.log("Success:", response.data);
      router.push("/home");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Kiểm tra lại thông tin");
    });
};
</script>
