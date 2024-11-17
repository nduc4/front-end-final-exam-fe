<template>
  <v-container fill-height class="d-flex justify-center align-center">
    <v-row class="d-flex align-center" no-gutters>
      <!-- Hình ảnh -->
      <v-col cols="12" sm="6" md="3">
        <v-card tile>
          <v-img :src="imageSrc" aspect-ratio="1" class="mb-4" contain></v-img>
        </v-card>
      </v-col>

      <!-- Nút và mô tả -->
      <v-col
        class="text-center d-flex flex-column align-center"
        cols="12"
        sm="3"
        md="4"
      >
        <v-btn
          color="teal"
          class="d-flex align-center justify-center mb-4"
          style="border-radius: 4px"
          @click="triggerFileInput"
        >
          <v-icon left>mdi-image</v-icon>
          Đổi ảnh
        </v-btn>
        <!-- Ẩn file input và kích hoạt thông qua nút bấm -->
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          style="display: none"
          @change="onFileChange"
        />
        <p class="grey--text text--darken-2">Chọn ảnh bìa cho sách!</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Đường dẫn ảnh mặc định
const imageSrc = ref("https://via.placeholder.com/150");

// Tham chiếu đến input file
const fileInput = ref<HTMLInputElement | null>(null);

// Hàm để mở input file khi nhấn nút "Đổi ảnh"
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Hàm xử lý khi người dùng chọn file mới
const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    // Đọc file được chọn và cập nhật src của v-img
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      imageSrc.value = reader.result as string; // Cập nhật src của v-img với dữ liệu hình ảnh
    };

    reader.readAsDataURL(file); // Đọc file dưới dạng URL
  }
};
</script>
<style scoped>
@media (max-width: 600px) {
  .v-btn {
    margin-top: 16px;
  }
}
</style>
