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
             <h2 class="mb-4" style="text-decoration: underline;">Hot</h2>
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
              <v-col v-for="(item, index) in searchResults" :key="index" :xs="12" :md="3" class="justify-center align-center pt-1 pb-1">
      <BookHome :Bookitems="[item]" />
              </v-col>            
            </v-row>
<!--============================================================header thể loại============================================================-->
            <v-row>
              <v-col :xs="12" :md="2" class="text-center">
                <h2 style="text-decoration: underline">Thể loại</h2>
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
                <h3>Novel</h3>
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
                <h3>Adventure</h3>
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
            
                <Button
                  background="green"
                  color="white"
                  text="Xem thêm"
                  @click="addRow"
                   />
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-responsive>
    </template>
  </AdminComponent>
</template>
<!--============================================================Script============================================================-->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AdminComponent from "@/components/UIAdminComponent.vue";
import Button from "@/components/ButtonComponent.vue";
import ComboBox from "@/components/ComboBoxComponent.vue";
import InforBook from "@/components/InformationBook1.vue";
import BookHome from "@/components/InformationBook_Home.vue";
import axios from "axios";

interface Book {
  _id: string; // Thay vì id, sử dụng _id theo dữ liệu trả về từ API
  title: string;
  author: string;
  published_year: string;
  genre: string;
}
// Dữ liệu tìm kiếm
const searchResults = ref<Book[]>([]);

// Headers cho bảng
const resultHeaders = [
  { text: "Tên sách", value: "title" },
  { text: "Tác giả", value: "author" },
  { text: "Năm xuất bản", value: "published_year" },
  { text: "Thể loại", value: "genre" },
];

// Khai báo router
const router = useRouter();

// Dữ liệu form
const formData = ref({
  bookTitle: "",
  author: "",
  category: "Tháng",
  classify: "",
  publicationYear: "",
  Title: "",
  genre: "",
});

// Dữ liệu cho các dropdown
    const categoryOptions = ["Tháng", "Quý", "Năm"];

// Các phương thức chuyển trang
const goToSearchBook = () => {
  router.push("/searchbook");
};
const goToBorrowedBooksUser = () => {
  router.push("/borrowedBooksUsers");
}
const showMore = () => {

}
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
    icon: "mdi-bookmark",
    value:"",
    method: goToBorrowedBooksUser,
  },
];
//Khai báo mảng books
interface book{
  id: any;
  title: string;
  author: string;
  imgUrl: string;
}
  const books: book[] = [];    
//lấy dữ liệu từ API
// async function fetchData() {
//     const response = await fetch("http://103.77.242.79:3005/api/book?page=1&limit=5");
//     const data_ = await response.json();
//     return data_
//   }
//   fetchData().then(data_ =>{
//     // console.log(data_);
    
//     for(let i = 0; i<data_.data.length;i++){
//       console.log(data_.data[i].title);
//       books[i] = {
//             id: i,
//             title: data_.data[i].title,
//             author: data_.data[i].author_id.join(', '), // Giả sử author_id là một mảng, bạn có thể nối các tác giả thành chuỗi
//             imgUrl:""       
//           };
//     }
//   })
  
// Hàm xử lý submit
const handleSubmit = async () => {
  try {
    console.log("Form submitted:", formData.value); // Kiểm tra form data
  
    // Tạo params từ formData để gửi request
    const params = new URLSearchParams();
  
    if (formData.value.Title) {
      params.append("title", formData.value.Title);
    }
  
    if (formData.value.author) {
      params.append("author", formData.value.author); // Gửi ID tác giả
    }
  
    if (formData.value.genre) {
      params.append("genre", formData.value.genre);
    }
  
    // Gửi request đến API với params
    const response = await axios.get("http://103.77.242.79:3005/api/book", {
      params,
    });
  
    console.log("API response:", response); // Kiểm tra kết quả từ API
  
    if (response.data?.data?.length > 0) {
      // Lấy danh sách dữ liệu
      const books = response.data.data;
      await enrichBooksWithAuthorsAndGenres(books); // Thêm thông tin từ API
      searchResults.value = books;
    } else {
      searchResults.value = [];
      alert("Không tìm thấy kết quả nào.");
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    alert("Không thể thực hiện tìm kiếm. Vui lòng thử lại.");
  }
};
  // Thực hiện xử lý dữ liệu hoặc gọi API ở đây

  //map
  const authorMap = ref<{ [key: string]: { name: string } }>({});
// Hàm làm giàu thông tin sách với tác giả và thể loại
const enrichBooksWithAuthorsAndGenres = async (books: any[]) => {
  // Lấy danh sách các ID cần xử lý
  const allAuthorIds = [...new Set(books.flatMap((item) => item.author_id || []))];
  console.log("Danh sách author_id:", allAuthorIds);
  // Gọi API để lấy thông tin
  await Promise.all([fetchAuthorsByIds(allAuthorIds)]);
  // Làm giàu dữ liệu sách với tên tác giả và thể loại
  books.forEach((book) => {
    book.author = book.author_id
      ?.map((id: string) => authorMap.value[id]?.name || "Không rõ")
      .join(", ");
  });

  console.log("Books after enrichment:", books);
};
// Hàm gọi API lấy thông tin tác giả
const fetchAuthorsByIds = async (authorIds: string[]): Promise<void> => {
  try {
    const uniqueIds = authorIds.filter((id) => !authorMap.value[id]); // Lọc các ID chưa có
    if (uniqueIds.length === 0) return;

    const params = new URLSearchParams();
    uniqueIds.forEach((id) => params.append("ids", id));

    const response = await axios.get("http://103.77.242.79:3005/api/author/list", {
      params,
    });

    response.data.forEach((author: any) => {
      authorMap.value[author._id] = { name: author.name };
    });
    console.log("Danh sách tác giả:", response.data);
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
  // Gọi handleSubmit tự động khi trang được tải
};
onMounted(() => {
      handleSubmit(); // Gọi handleSubmit khi trang được tải
    });
const addRow = () => {
  
}
</script>
