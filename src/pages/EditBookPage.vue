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
              <v-col cols="12" md="4" class="pt-1 pb-1">
                <ComboBox
                  :label="inputLabels[3]"
                  v-model="formData.classify"
                  :items="classifyOptions"
                />
              </v-col>
              <v-col cols="12" md="4" class="pt-1 pb-1">
                <PublicationYear />
              </v-col>
            </v-row>

            <!-- Đổi hình ảnh -->
            <ImageChanger :showImageChanger="true" class="nt-4 pt-0 pb-0" />

            <!-- Nút submit -->
            <v-row>
              <v-col
                :class="{
                  'text-center': display.xs,
                  'text-right': !display.xs,
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
import PublicationYear from "@/components/PublicationYearComponent.vue";
import ImageChanger from "@/components/AddImageComponent.vue";
import Button from "@/components/ButtonComponent.vue";
import ComboBox from "@/components/ComboBoxComponent.vue";
import { useDisplay } from "vuetify";

// Sử dụng hook useDisplay để lấy thông tin về các breakpoint
const display = useDisplay();
// Khai báo router
const router = useRouter();

// Dữ liệu form
const formData = ref({
  bookTitle: "",
  author: "",
  category: "",
  classify: "",
  publicationYear: "",
});

// Dữ liệu cho các dropdown
const categoryOptions = ["Fantasty", "Tiểu thuyết", "Tài liệu"];
const classifyOptions = ["Sách mới", "Đã mượn", "Hư hỏng"];

// Các label cho input
const inputLabels = ["Tên sách", "Tác giả", "Thể loại", "Phân loại"];
const repeatCount = inputLabels.length;

// Các phương thức chuyển trang
const goToAddBook = () => {
  router.push("/addbook");
};
const goToEditBook = () => {
  router.push("/editbook");
};
const goToSearchBook = () => {
  router.push("/searchbook");
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
    method: goToEditBook,
  },
  {
    title: "Tìm kiếm",
    icon: "mdi-magnify",
    value: "search",
    method: goToSearchBook,
  },
];

// Hàm xử lý submit
const handleSubmit = () => {
  console.log("Form submitted:", formData.value);
  // Thực hiện xử lý dữ liệu hoặc gọi API ở đây
};
</script>
