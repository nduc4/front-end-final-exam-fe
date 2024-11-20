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
              <v-col v-for="(item, index) in sortedBooks" :key="index" :xs="12" :md="3" class="justify-center align-center pt-1 pb-1">
      <BookHome @click="clickSach(item)" :Bookitems="[item]" />
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
              <v-col v-for="(item, index) in searchResults.filter(item => item.genre.includes('Fantasy')).slice(0,4)" :key="index" :xs="12" :md="3" class="justify-center align-center pt-1 pb-1">               
                <BookHome :Bookitems="[item]" />
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
              <v-col v-for="(item, index) in searchResults.filter(item => item.genre.includes('Light Novel')).slice(0,4)" :key="index" :xs="12" :md="3" class="justify-center align-center pt-1 pb-1">               
                <BookHome :Bookitems="[item]" />
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
              <v-col v-for="(item, index) in searchResults.filter(item => item.genre.includes('Adventure')).slice(0,4)" :key="index" :xs="12" :md="3" class="justify-center align-center pt-1 pb-1">               
                <BookHome :Bookitems="[item]" />
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
import { ref, onMounted, computed } from "vue";
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

interface MQYresult {
  book_id: string;
  title: string;
  count: Number;
}
// Dữ liệu tìm kiếm
const searchResults = ref<Book[]>([]);
// Mảng chứa sách theo tháng, quý, năm
const monthSearchResults = ref<MQYresult[]>([]);
const quarterSearchResults = ref<MQYresult[]>([]);
const yearSearchResults = ref<MQYresult[]>([]);

// Computed property để lọc và sắp xếp sách theo count
//mảng chứa thông tin sách theo tháng
const sortedBooks = computed(() => {
  // Lọc các sách từ searchResults theo book_id trong monthSearchResults.slice(0, 4)
  const filteredBooks = searchResults.value.filter(item => 
    monthSearchResults.value.slice(0, 4).some(month => month.book_id === item._id)
  );

  // Sắp xếp theo count của item trong monthSearchResults (giảm dần)
  return filteredBooks.sort((a, b) => {
    const countA = Number(monthSearchResults.value.find(month => month.book_id === a._id)?.count || 0);
    const countB = Number(monthSearchResults.value.find(month => month.book_id === b._id)?.count || 0);
    return countB - countA; // Giảm dần
  });
});

//mảng chứa thông tin sách theo quý
const sortedBooksQuarter = computed(() => {
  // Lọc các sách từ searchResults theo book_id trong monthSearchResults.slice(0, 4)
  const filteredBooks = searchResults.value.filter(item => 
    quarterSearchResults.value.slice(0, 4).some(quarter => quarter.book_id === item._id)
  );

  // Sắp xếp theo count của item trong monthSearchResults (giảm dần)
  return filteredBooks.sort((a, b) => {
    const countA = Number(quarterSearchResults.value.find(quarter => quarter.book_id === a._id)?.count || 0);
    const countB = Number(quarterSearchResults.value.find(quarter => quarter.book_id === b._id)?.count || 0);
    return countB - countA; // Giảm dần
  });
});

const sortedBooksYear = computed(() => {
  // Lọc các sách từ searchResults theo book_id trong monthSearchResults.slice(0, 4)
  const filteredBooks = searchResults.value.filter(item => 
    yearSearchResults.value.slice(0, 4).some(year => year.book_id === item._id)
  );

  // Sắp xếp theo count của item trong monthSearchResults (giảm dần)
  return filteredBooks.sort((a, b) => {
    const countA = Number(yearSearchResults.value.find(year => year.book_id === a._id)?.count || 0);
    const countB = Number(yearSearchResults.value.find(year => year.book_id === b._id)?.count || 0);
    return countB - countA; // Giảm dần
  });
});

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
// interface book{
//   id: any;
//   title: string;
//   author: string;
//   imgUrl: string;
// }
//   const books: book[] = []; 

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
// Hàm xử lý submit form

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
    console.error("Lỗi khi gọi API submit:", error);
    alert("Không thể thực hiện tìm kiếm. Vui lòng thử lại.");
  }
};

// Maps để lưu dữ liệu
const authorMap = ref<{ [key: string]: { name: string } }>({});
const genreMap = ref<{ [key: string]: { name: string } }>({});

// Hàm làm giàu thông tin sách với tác giả và thể loại
const enrichBooksWithAuthorsAndGenres = async (books: any[]) => {
  // Lấy danh sách các ID cần xử lý
  const allAuthorIds = [...new Set(books.flatMap((item) => item.author_id || []))];
  const allGenreIds = [...new Set(books.flatMap((item) => item.genre_id || []))];

  console.log("Danh sách author_id:", allAuthorIds);
  console.log("Danh sách genre_id:", allGenreIds);
  
  // Gọi API để lấy thông tin
  await Promise.all([fetchAuthorsByIds(allAuthorIds), fetchGenresByIds(allGenreIds), fetchMonthData(),fetchQuarterData(),fetchYearData()]);

  // Làm giàu dữ liệu sách với tên tác giả và thể loại
  books.forEach((book) => {
    book.author = book.author_id
      ?.map((id: string) => authorMap.value[id]?.name || "Không rõ")
      .join(", ");
    book.genre = book.genre_id
      ?.map((id: string) => genreMap.value[id]?.name || "Không rõ")
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
    console.error("Lỗi khi gọi API tác giả:", error);
  }
};

// Hàm gọi API lấy thông tin thể loại
const fetchGenresByIds = async (genreIds: string[]): Promise<void> => {
  try {
    const uniqueIds = genreIds.filter((id) => !genreMap.value[id]); // Lọc các ID chưa có
    if (uniqueIds.length === 0) return;

    const params = new URLSearchParams();
    uniqueIds.forEach((id) => params.append("ids", id));

    const response = await axios.get("http://103.77.242.79:3005/api/genre/list", {
      params,
    });

    response.data.forEach((genre: any) => {
      genreMap.value[genre._id] = { name: genre.name };
    });
    console.log("Danh sách thể loại:", response.data);
  } catch (error) {
    console.error("Lỗi khi gọi API thể loại:", error);
  }
};

// Hàm  gọi API lấy thông tin tháng
const fetchMonthData = async () => {
  try {
    const response = await axios.get("http://103.77.242.79:3005/api/statistic/top-borrowed-books?period=month&limit=4");

    // Kiểm tra nếu API trả về dữ liệu hợp lệ
    if (response.data && Array.isArray(response.data)) {
      // Giả sử API trả về mảng các đối tượng giống ví dụ bạn đưa ra
      monthSearchResults.value = response.data;
    } else {
      console.log("Dữ liệu không hợp lệ:", response.data);
      monthSearchResults.value = [];
    }
  } catch (error) {
    console.error("Lỗi khi gọi API tháng:", error);
    monthSearchResults.value = []; // Nếu có lỗi, gán mảng kết quả về rỗng
  }
};

//Hàm gọi API lấy thông tin quý
const fetchQuarterData = async () => {
  try {
    const response = await axios.get("http://103.77.242.79:3005/api/statistic/top-borrowed-books?period=quarter&limit=4");

    // Kiểm tra nếu API trả về dữ liệu hợp lệ
    if (response.data && Array.isArray(response.data)) {
      // Giả sử API trả về mảng các đối tượng giống ví dụ bạn đưa ra
      quarterSearchResults.value = response.data;
    } else {
      console.log("Dữ liệu không hợp lệ:", response.data);
      quarterSearchResults.value = [];
    }
  } catch (error) {
    console.error("Lỗi khi gọi API quý:", error);
    quarterSearchResults.value = []; // Nếu có lỗi, gán mảng kết quả về rỗng
  }
};

//Hàm gọi API lấy thông tin năm
const fetchYearData = async () => {
  try {
    const response = await axios.get("http://103.77.242.79:3005/api/statistic/top-borrowed-books?period=year&limit=4");

    // Kiểm tra nếu API trả về dữ liệu hợp lệ
    if (response.data && Array.isArray(response.data)) {
      // Giả sử API trả về mảng các đối tượng giống ví dụ bạn đưa ra
      yearSearchResults.value = response.data;
    } else {
      console.log("Dữ liệu không hợp lệ:", response.data);
      yearSearchResults.value = [];
    }
  } catch (error) {
    console.error("Lỗi khi gọi API năm:", error);
    yearSearchResults.value = []; // Nếu có lỗi, gán mảng kết quả về rỗng
  }
};

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

onMounted(() => {
      handleSubmit(); // Gọi handleSubmit khi trang được tải
    });

// search result

const addRow = () => {
  
}
</script>
