<template>
  <AdminComponent
    :items="itemsA"
    :showUserCard="true"
    :showInputFields="true"
    :repeatCount="repeatCount"
    style="position: fixed;"
    
  >
    <template v-slot:input-fields  >
      <v-responsive class="mx-auto" width="100vw" style="max-height: 80vh; overflow-y: auto; padding: 10px">
        <h1>Danh sách được mượn</h1>
          <InformationBook3 style="width: 100%; margin-top: 20px;"/>
          
      </v-responsive>
    </template>
  </AdminComponent>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import AdminComponent from "@/components/UIAdminComponent.vue";
import { useDisplay } from "vuetify";
import InformationBook3 from "@/components/InformationBook3.vue";

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
const goToBorrowedBooksAdmin = () => {
  router.push("/BorrowedBooksAdmin");
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
  {
    title: "Danh sách mượn",
    icon: "mdi-format-list-bulleted-square",
    value: "list",
    method: goToBorrowedBooksAdmin,
  },
];

// Hàm xử lý submit
const handleSubmit = () => {
  console.log("Form submitted:", formData.value);
  // Thực hiện xử lý dữ liệu hoặc gọi API ở đây
};
</script>
