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
import { ref } from "vue";
import { useRouter } from "vue-router";
import AdminComponent from "@/components/UIAdminComponent.vue";
import { useDisplay } from "vuetify";
import InformationBook2 from "@/components/InformationBook2.vue";

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
const categoryOptions = ["Category 1", "Category 2", "Category 3"];
const classifyOptions = ["Classify 1", "Classify 2", "Classify 3"];

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
const goToBorrowedBooksUser = () => {
  router.push("/BorrowedBooksUsers");
};

// Các items cho AdminComponent
const itemsA = [
 
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
    method: goToBorrowedBooksUser,
  },
];

// Hàm xử lý submit
const handleSubmit = () => {
  console.log("Form submitted:", formData.value);
  // Thực hiện xử lý dữ liệu hoặc gọi API ở đây
};
</script>
