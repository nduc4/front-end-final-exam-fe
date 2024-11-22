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
          <h1 class="mb-4 text-center">THÔNG TIN</h1>
          <v-form @submit.prevent="handleSubmit" ref="form">
            <!-- Đổi hình ảnh -->
            <InformationBook1 class="mt-6 flex justify-center" style="width: 100%; height: auto;">
            </InformationBook1>
            <!-- Nút submit -->
            <!-- Nút submit -->
            <v-row>
              <v-col
                :class="{
                  'text-center': display.xs,
                  'text-right': !display.xs,
                }"
                class="mt-8 mt-sm-0"
              >

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
import { useDisplay } from "vuetify";
import InformationBook1 from "@/components/InformationBook1.vue";

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



// Các phương thức chuyển trang
const goToSearchBook = () => {
  router.push("/search");
};
const goToBorrowedBooksUser = () => {
  router.push("/borrowedBooksUsers");
}
const goToAddBook = () => {
  router.push("/addbook");
};
const goToEditBook = () => {
  router.push("/managebook");
};
const goToHome = () => {
  router.push("/home");
};
// Các items cho AdminComponent
let itemsA: Array<{ title: string; icon: string; value: string; method: Function }> = [];
if (
  localStorage.getItem("role") == "READER" ||
  localStorage.getItem("access_token") == null
) {
// Các items cho AdminComponent
 itemsA = [
  {
    title: "Trang chủ",
    icon: "mdi-radiobox-blank",
    value: "home",
    method: goToHome,
  },
  {
    title: "Tìm kiếm",
    icon: "mdi-magnify",
    value: "search",
    method: goToSearchBook,
  },
];
}else itemsA = [
  {
    title: "Trang chủ",
    icon: "mdi-radiobox-blank",
    value: "home",
    method: goToHome,
  },
  {
    title: "Tìm kiếm",
    icon: "mdi-magnify",
    value: "search",
    method: goToSearchBook,
  },
  {
    title: "Danh sách mượn",
    icon: "mdi-bookmark",
    value:"",
    method: goToBorrowedBooksUser,
  },
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
];

// Hàm xử lý submit
const handleSubmit = () => {
  console.log("Form submitted:", formData.value);
  // Thực hiện xử lý dữ liệu hoặc gọi API ở đây
};
</script>
