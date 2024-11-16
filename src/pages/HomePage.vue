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
          <h1 class="mb-4 text-center">TRANG CHỦ</h1>
          <v-form @submit.prevent="handleSubmit" ref="form">
            <!-- Tên sách và Tác giả trên một hàng riêng -->
            <!-- <v-row>
              <v-col cols="6" class="pt-1 pb-1">
                <InputField
                  :label="inputLabels[0]"
                  v-model="formData.bookTitle"
                />
              </v-col>
              <v-col cols="6" class="pt-1 pb-1">
                <InputField :label="inputLabels[1]" v-model="formData.author" />
              </v-col>
            </v-row> -->

            <!-- Thể loại, Phân loại và Năm xuất bản trên cùng một hàng -->
            <v-row>
              <v-col cols="1" class="pt-1 pb-1">
                <ComboBox
                  :label="inputLabels[0]"
                  v-model="formData.category"
                  :items="categoryOptions"
                />
              </v-col>
            </v-row>  
            <v-row>
              <v-col cols="2" class="pt-1 pb-1 pr-3">
                <InfomatitonBook3/>
              </v-col>
              <v-col cols="2" class="pt-1 pb-1 pr-3">
                <InformationBook3/>
              </v-col>
              <v-col cols="2" class="pt-1 pb-1 pr-3">
                <InformationBook3/>
              </v-col>
              <v-col cols="2" class="pt-1 pb-1 pr-3">
                <InformationBook3/>
              </v-col>
            </v-row>   
            <v-row>   
              <v-col cols="1" class="pt-1 pb-1">
                <ComboBox
                  :label="inputLabels[1]"
                  v-model="formData.classify"
                  :items="classifyOptions"
              />
            </v-col>     
              </v-row>
            <!-- Nút Xem thêm -->
            <v-row>
              <v-col class="text-right">
                <Button text="Xem thêm" />
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
import InfomatitonBook1 from "@/components/InfomatitonBook1.vue";
import InfomatitonBook3 from "@/components/InfomatitonBook3.vue";
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
const categoryOptions = ["Tháng", "Quý", "Năm"];
const classifyOptions = ["Classify 1", "Classify 2", "Classify 3"];

// Label từng mục
const inputLabels = ["Hot", "Thể Loại", "-", "-"];
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
