<template>
  <AdminComponent
    :items="itemsA"
    :showUserCard="true"
    :showInputFields="true"
    :repeatCount="repeatCount"
    style="position: fixed; background-color: #fff;"

  >
    <template v-slot:input-fields   >
      <v-responsive class="mx-auto" width="100vw" style="max-height: 100vh; overflow-y: auto; padding: 10px;">
        <h1>Danh sách được mượn</h1>
          <InformationBook3 @click="clickSach" style="width: 100%; margin-top: 20px;"/>
      </v-responsive>
    </template>
  </AdminComponent>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import AdminComponent from "@/components/UIAdminComponent.vue";
import InformationBook3 from "@/components/InformationBook3.vue";

interface Book {
  _id: string; // Thay vì id, sử dụng _id theo dữ liệu trả về từ API
  title: string;
  author: string;
  published_year: string;
  genre: string;
}

// Khai báo router
const router = useRouter();

// Các phương thức chuyển trang
const goToAddBook = () => {
  router.push("/addbook");
};
const goToEditBook = () => {
  router.push("/managebook");
};
const goToSearchBook = () => {
  router.push("/search");
};
const goToBorrowedBooksAdmin = () => {
  router.push("/borrowedBooksUsers");
};
const goToHome = () => {
  router.push("/home");
};
// Các items cho AdminComponent
const itemsA = [
  {
    title: "Trang chủ",
    icon: "mdi-radiobox-blank",
    value: "home",
    method: goToHome,
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
  {
    title: "Tìm kiếm",
    icon: "mdi-magnify",
    value: "search",
    method: goToSearchBook,
  },
  {
    title: "Danh sách mượn",
    icon: "mdi-format-list-bulleted-square",
    value: "list",
    method: goToBorrowedBooksAdmin,
  },
];
// Hàm click sách
const clickSach=(item:Book)=>{
  if (item && item._id) {
    console.log("Item: ", item); // In ra item để kiểm tra dữ liệu
    localStorage.setItem("_id", item._id);  // Lưu _id vào localStorage
    localStorage.setItem("author", item.author || "");  // Kiểm tra nếu author không có giá trị
    localStorage.setItem("title", item.title || "");  // Kiểm tra nếu title không có giá trị
    localStorage.setItem("genre", item.genre || "");  // Kiểm tra nếu genre không có giá trị
  } else {
    console.error("Item không hợp lệ hoặc không có _id!");
  }
  router.push("/infor")
};
</script>
