<template>
  <v-container fill-height class="d-flex justify-center align-center">
    <v-row class="d-flex align-center" no-gutters>
      <!-- Hình ảnh -->
      <v-col class="pa-4" cols="12" sm="6" md="3">
        <v-card class="pa-4" tile>
          <v-img
            src="https://via.placeholder.com/150"
            aspect-ratio="1"
            class="mb-4"
            contain
          ></v-img>
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
          @click="changeImage"
        >
          <v-icon left>mdi-image</v-icon>
          Đổi ảnh
        </v-btn>
        <p class="grey--text text--darken-2">Chọn ảnh bìa cho sách!</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import ButtonComponent from "@/components/ButtonComponent.vue";
export default {
  name: "ImageChanger",
  components: {
    ButtonComponent,
  },
  methods: {
    changeImage() {
      // Thêm logic thay đổi hình ảnh ở đây
      console.log("Đổi ảnh");
    },
  },
};
</script>

<style scoped>
/* Các kiểu tùy chỉnh nếu cần */
</style>
