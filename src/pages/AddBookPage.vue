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
                <InputField
                  :label="inputLabels[2]"
                  v-model="formData.publisher"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-1 pb-1">
                <PublicationYearComponent />
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
const inputLabels = ["Tên sách", "Tác giả", "Nhà xuất bản"];
const repeatCount = inputLabels.length;

// Biến chứa dữ liệu form
const formData = ref({
  bookTitle: "",
  author: "",
  publisher: "",
  publicationYear: "",
});

// Hàm xử lý submit form
const handleSubmit = () => {
  console.log("Form submitted:", formData.value);
  // Thực hiện xử lý dữ liệu hoặc gọi API ở đây
};
</script>
<!-- <style>
@media (min-width: none) {
}
</style> -->
