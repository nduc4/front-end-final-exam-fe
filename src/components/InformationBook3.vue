<template>
  <div class="book-width">
    <AlertComponent ref="alert" text="Đã trả thành công!" />
    <div v-for="(book, index) in books" :key="book.id" class="book-details">
      <v-col prepend-icon="mdi-bookmark" md="3" sm="12" class="book-cover">
        <img
          :src="'https://nxbhcm.com.vn/Image/Biasach/dacnhantam86.jpg'"
          alt="Book Cover"
        />
      </v-col>
      <v-col md="12" sm="12" class="book-info">
        <div class="book-title">{{ book.title }}</div>
        <!-- Hiển thị tiêu đề sách -->
        <div class="book-author">{{ book.author }}</div>
        <div class="book-content">
          <div class="book-user">
            <h5>Người mượn: {{ book.user || "Chưa có thông tin" }}</h5>
          </div>
          <div class="book-day">
            <h5>Hạn trả: {{ book.loanDate }}</h5>
            <!-- Sử dụng loanDate -->
          </div>
        </div>

        <div class="borrow-btn1" v-if="showButton">
          <Button
            :background="book.isBorrowed ? 'gray' : '#4BC1D2'"
            :color="book.isBorrowed ? 'white' : 'white'"
            :text="book.isBorrowed ? 'Đã trả' : 'Trả sách'"
            :disabled="book.isBorrowed"
            @click="borrowBook(book, index)"
          />
        </div>
      </v-col>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Button from "@/components/ButtonComponent.vue";
import AlertComponent from "@/components/Alert.vue";
import axios from "axios";

interface Author {
  name: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  authors: Author[];
  genre: string;
  genres: Author[];
  coverUrl: string;
  user: string;
  day: string;
  isBorrowed: boolean;
  isBookmarked?: boolean;
  book_instance_id?: string;
  loan_date: string;
  loanDate: string;

  user_id: {
    fullName: string;
  }; // Nếu user là một đối tượng
}

export default defineComponent({
  components: {
    Button,
    AlertComponent,
  },
  data() {
    return {
      books: [] as Book[],
      showButton: true,
      alertVisible: false,
    };
  },
  computed: {},
  mounted() {
    this.fetchBooks(); // Gọi hàm fetchBooks khi component được khởi tạo
  },
  methods: {
    async fetchBooks() {
      const token = localStorage.getItem("access_token");
      console.log("Token:", token);

      try {
        const response = await axios.get(
          "http://103.77.242.79:3005/api/loan?page=1&limit=10",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Tạo một mảng tạm thời để lưu trữ sách đã cập nhật
        const updatedBooks: Book[] = response.data.data.map((book: any) => {
          return {
            ...book,
            user: book.user_id?.fullName || "Unknown User", // Lấy fullName hoặc "Unknown User" nếu không có
            loanDate: book.loan_date || "Unknown Date", // Lấy loan_date hoặc "Unknown Date" nếu không có
          };
        });

        const bookInstanceIds = updatedBooks
          .map((book) => book.book_instance_id)
          .filter((id): id is string => id !== undefined);
        console.log("Danh sách bookInstanceId:", bookInstanceIds);

        for (const id of bookInstanceIds) {
          try {
            const bookResponse = await axios.get(
              `http://103.77.242.79:3005/api/book-instance/detail/${id}`
            );
            const bookData = bookResponse.data;

            // Lấy thông tin title từ book_id
            const bookTitle = bookData.book_id?.title || "Unknown Title";

            const authors = await Promise.all(
              bookData.book_id.author_id.map(async (authorId: any) => {
                const authorResponse = await axios.get(
                  `http://103.77.242.79:3005/api/author/list?ids=${authorId}`
                );
                return authorResponse.data?.[0]?.name || "Unknown Author";
              })
            );

            const genres = await Promise.all(
              bookData.book_id.genre_id.map(async (genreId: any) => {
                const genreResponse = await axios.get(
                  `http://103.77.242.79:3005/api/genre/list?ids=${genreId}`
                );
                return genreResponse.data?.[0]?.name || "Unknown Genre";
              })
            );

            const genreNames = genres.join(", ");
            const authorNames = authors.join(", ");

            // Tìm cuốn sách cần cập nhật
            const targetBook = updatedBooks.find(
              (book) => book.book_instance_id === id
            );
            if (targetBook) {
              // Cập nhật thông tin của sách
              targetBook.authors = authors;
              targetBook.genres = genres;
              targetBook.author = authorNames;
              targetBook.genre = genreNames;

              // Thêm title từ book_id
              targetBook.title = bookTitle;
            }
          } catch (error) {
            console.error(`Error fetching data for ID ${id}:`, error);
          }
        }

        // Gán mảng đã cập nhật vào this.books
        this.books = updatedBooks;

        console.log("Dữ liệu sách sau khi cập nhật:", this.books);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
      }
    },

    borrowBook(book: Book, index: number) {
      book.isBorrowed = !book.isBorrowed; // Thay đổi trạng thái isBorrowed

      if (book.isBorrowed) {
        console.log("Đã trả sách: ", book.title);

        // Hiển thị alert
        this.alertVisible = true;

        // Tự động ẩn alert sau 3 giây
        const alert = this.$refs.alert;

        alert.showAlert();

        // Xóa cuốn sách khỏi danh sách
        this.books.splice(index, 1); // Xóa cuốn sách tại vị trí index
      }
    },
  },
});
</script>

<style>
.book-width {
  /* width: 15em;
  height: 22em; */

  width: 100vw;
  height: auto;
  /* min-height: 100vh; */
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}

.book-details {
  display: flex;
  flex-direction: column;
  align-items: center;

  /* width: 100%;
  height: 100%; */
  width: 15em;
  height: 27em;
  /* border: 1px solid black; */
  margin-top: 20px;
}

.book-cover {
  position: relative;

  max-height: 10em;
  max-width: 10em;
}
.save-btn {
  position: absolute;
  bottom: 5px;
  right: 10px;
  width: 0.4em;
  text-align: left;
  left: 0;
  cursor: pointer;
}
.edit-btn {
  position: absolute;
  top: 10px;
  right: 5px;
  cursor: pointer;
  padding: 0.1em;
  background-color: #fff;
  border-radius: 50%;
  border: 0.1px solid #000;
}
.edit-btn v-icon {
  font-size: 0.2em; /* Thu nhỏ kích thước của icon chỉnh sửa */
}
.book-cover img {
  width: 100%;
  object-fit: cover;
}

.book-info {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  font-size: 0.7em;
}

.book-title {
  font-size: 1.2rem;
  height: 3em;
  font-weight: bold;
  background-color: #fff;
  color: #666666;
  width: 100%;
  text-align: center;
}

.book-author {
  font-size: 1rem;
  margin-top: 5px;
  text-align: center;
  background-color: #fff;
  width: 100%;
  color: #666666;
}

.book-details-row {
  margin-bottom: 10px;
}

.borrow-btn {
  display: flex;
}

.borrow-btn .v-btn--active {
  background-color: gray;
  color: white;
}

.borrowed {
  background-color: gray !important;
  color: white !important;
}
.book-day {
  margin-top: 5px;
  font-size: 1.4em;
}
.book-user {
  margin-top: 5px;
  font-size: 1.4em;
}
.book-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.borrow-btn1 {
  margin-top: 10px;
}
@media (max-width: 600px) {
  .book-width {
    justify-content: center; /* Căn giữa cho màn hình nhỏ */
  }
}
</style>
