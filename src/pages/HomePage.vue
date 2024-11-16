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
        <!-- title trang chủ -->
          <h1 class="mb-4 text-center">TRANG CHỦ</h1>
          <v-form @submit.prevent="handleSubmit" ref="form">
            <!-- title hot -->
            <v-row>
              <v-col :xs="12" :md="2" class="text-center">
             <h2 class="mb-4">Hot</h2>
              </v-col>
            </v-row>
             <!-- comboBox Tháng quý năm -->
            <v-row>
              <v-col cols="12" class="pt-1 pb-1">
                <ComboBox                 
                  v-model="formData.category"
                  :items="categoryOptions"
                />
              </v-col>
            </v-row>
<!--============================================================row sách hot============================================================-->
            <v-row>
              <v-col v-for="(item, index) in 5" :key="index" :xs="12" :md="2" class="justify-center align-center pt-1 pb-1">
      <BookHome :item="item" />
              </v-col>            
            </v-row>
<!--============================================================header thể loại============================================================-->
            <v-row>
              <v-col :xs="12" :md="2" class="text-center">
                <h2>Thể loại</h2>
              </v-col>
            </v-row>            
<!--============================================================header Thể loại 1============================================================-->
            <v-row>
              <v-col :xs="12" :md="2" class="text-center">
                <h3>Fantasy</h3>
              </v-col>
            </v-row>            
<!--============================================================row sách thể loại 1============================================================-->
            <v-row>
              <v-col v-for="(item, index) in 5" :key="index" :xs="12" :md="2" class="pt-1 pb-1 pr-3" style="width: 100%; height: auto;" >
      <BookHome :item="item" />
              </v-col>            
            </v-row>
<!--============================================================header Thể loại 2============================================================-->
            <v-row>
              <v-col :xs="12" :md="2" class="text-center">
                <h3>Fantasy</h3>
              </v-col>
            </v-row>           
<!--============================================================row sách thể loại 2============================================================-->
            <v-row>
              <v-col v-for="(item, index) in 5":key="index" :xs="12" :md="2" class="pt-1 pb-1 pr-3">
      <BookHome :item="item" />
              </v-col>            
            </v-row>
<!--============================================================header thể loại 3============================================================-->
            <v-row>
              <v-col :xs="12" :md="2" class="text-center">
                <h3>Fantasy</h3>
              </v-col>
            </v-row>            
<!--============================================================row sách thể loại 3============================================================-->
            <v-row>
              <v-col v-for="(item, index) in 5":key="index" :xs="12" :md="2" class="pt-1 pb-1 pr-3">
      <BookHome :item="item" />
              </v-col>            
            </v-row>
<!--============================================================Nút xem thêm============================================================-->

            <v-row>
              <v-col class="text-center">
            
                <Button  background="green" color="white" text="Xem thêm" />
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
import Button from "@/components/ButtonComponent.vue";
import ComboBox from "@/components/ComboBoxComponent.vue";
import InforBook from "@/components/InformationBook1.vue";
import BookHome from "@/components/InformationBook_Home.vue";
// Khai báo router
const router = useRouter();

// Dữ liệu form
const formData = ref({
  bookTitle: "",
  author: "",
  category: "Tháng",
  classify: "",
  publicationYear: "",
});

// Dữ liệu cho các dropdown
    const categoryOptions = ["Tháng", "Quý", "Năm"];

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
