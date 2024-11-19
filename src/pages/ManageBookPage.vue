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
          <h1 class="mb-4 text-center">QUẢN LÝ SÁCH</h1>
          <!-- Bọc tất cả các trường nhập liệu trong v-form -->
          <v-form @submit.prevent="handleSubmit" ref="form">
            <v-row>
              <v-col cols="12" class="pt-1 pb-1">
                <InputField
                  :label="inputLabels[0]"
                  v-model="formData.bookTitle"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6" class="pt-1 pb-1">
                <InputField :label="inputLabels[1]" v-model="formData.author" />
              </v-col>
              <v-col cols="12" md="6" class="pt-1 pb-1">
                <InputField :label="inputLabels[1]" v-model="formData.genre" />
              </v-col>
            </v-row>

            <InforBook :showButton="false" class="mt-4" />
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
                <Button
                  @click="handleClickButton"
                  class="mr-2"
                  background="red"
                  color="white"
                  text="Xóa"
                />
                <Button
                  class="ml-2"
                  background="green"
                  color="white"
                  text="Sửa"
                  @click="() => router.push('/editbook')"
                />
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
import InforBook from "@/components/InformationBook1.vue";
import Button from "@/components/ButtonComponent.vue";
import PublicationYearComponent from "@/components/PublicationYearComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";
import { useDisplay } from "vuetify";
import axios from "axios";

// Sử dụng hook useDisplay để lấy thông tin về các breakpoint
const display = useDisplay();
const router = useRouter();
const ipAddress = import.meta.env.VITE_IP_ADDRESS;
const port = import.meta.env.VITE_PORT;

const goToAddBook = () => {
  router.push("/addbook");
};
const goToManageBook = () => {
  router.push("/managebook");
};
const goToSearchBook = () => {
  router.push("/searchbook");
};

// xử lý tìm kiếm lấy ra bookId từ response.data, chuyển thành kiểu string
// set localStorage - lưu bookId trong localStorage key - value (book_id - bookId)

localStorage.setItem("book_id", "12345678932234578");
const handleClickButton = () => {
  const url = `http://${ipAddress}:${port}/api/book/${bookId}`;
  axios
    .delete(url)
    .then((response) => {
      if (response.status == 201) {
        showAlert();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Kiểm tra lại thông tin");
    });
};

const itemsA = [
  { title: "Thêm sách", icon: "mdi-plus", value: "add", method: goToAddBook },
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
const inputLabels = ["Tên sách", "Thể loại"];
const repeatCount = inputLabels.length;

// Biến chứa dữ liệu form
const formData = ref({
  bookTitle: "",
  author: "",
  genre: "",
});

// Hàm xử lý submit form
const handleSubmit = () => {
  console.log("Form submitted:", formData.value);
  // Thực hiện xử lý dữ liệu hoặc gọi API ở đây
};

const alertVisible = ref(false);

const showAlert = () => {
  alertVisible.value = true;
  // Tự động tắt sau 3 giây (nếu cần)
  setTimeout(() => {
    alertVisible.value = false;
  }, 1500);
};
</script>
