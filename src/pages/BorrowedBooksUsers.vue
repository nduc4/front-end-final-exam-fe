<template>
  <AdminComponent
    :items="itemsA"
    :showUserCard="true"
    :showInputFields="true"
    :repeatCount="repeatCount"
    style="position: fixed;"

  >
    <template v-slot:input-fields  >
      <v-responsive class="mx-auto" width="100vw" style="max-height: 100vh; overflow-y: auto; padding: 10px ;">
        <h1>Sách đã mượn</h1>
          <InformationBook2 style="width: 100%; margin-top: 20px; display: flex; justify-content: center; align-items: center; "/>

      </v-responsive>
    </template>
  </AdminComponent>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import AdminComponent from "@/components/UIAdminComponent.vue";
import InformationBook2 from "@/components/InformationBook2.vue";


interface Book {
  _id: string; // Thay vì id, sử dụng _id theo dữ liệu trả về từ API
  title: string;
  author: string;
  published_year: string;
  genre: string;
}

// Khai báo router
const router = useRouter();
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
</script>
