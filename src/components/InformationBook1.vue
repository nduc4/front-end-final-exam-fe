<template>
  <v-row class="book-width1">
    <!-- Cột bìa sách -->
    <v-col prepend-icon="mdi-bookmark" md="3" sm="12" class="book-cover1">
      <img
        :src="'https://nxbhcm.com.vn/Image/Biasach/dacnhantam86.jpg'"
        alt="Book Cover"
      />
    </v-col>
    <!-- Cột thông tin sách -->
    <v-col md="3" sm="12" class="book-info1">
      <div class="book-title1">{{ book.title }}</div>
      <div class="book-author1">Tác giả: {{ book.author }}</div>
      <div class="book-details-row1">
        <h4>Ngày phát hành: {{ book.publishedYear }}</h4>
      </div>
      <div class="book-details-row1">
        <h4>Thể loại:</h4>
        {{ book.genre }}
      </div>
      <div class="book-details-row1">
        <h4>Tình trạng: Cũ</h4>
      </div>
      <div class="borrow-btn1" v-if="showButton">
        <Button
          :background="book.status === 'LOANED' ? 'gray' : 'green'"
          :color="book.status === 'LOANED' ? 'white' : 'white'"
          :text="book.status === 'LOANED' ? 'Đã mượn' : 'Mượn sách'"
          :disabled="book.status === 'LOANED'"
          @click="borrowBook"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import axios from "axios";
import Button from "@/components/ButtonComponent.vue";

export default defineComponent({
  name: "InformationBook",
  components: {
    Button,
  },
  props: {
    showButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      book: {
        title: "",
        author: "",

        publishedYear: "",
        genre: "",
        status: "",
        id: "",
      },
      isBorrowed: false,
    };
  },
  methods: {
    async fetchBookDetails() {
      const bookInstanceId = localStorage.getItem("_id");
      console.log(bookInstanceId);

      if (!bookInstanceId) {
        console.error("Không tìm thấy _id trong localStorage!");
        return;
      }

      try {
        // Gọi API để lấy thông tin sách
        const bookResponse = await axios.get(
          `http://103.77.242.79:3005/api/book-instance/${bookInstanceId}`
        );

        const bookData = bookResponse.data;
        console.log(bookData);

        // Lấy title, published_year, status
        this.book.title = bookData[0].book_id?.title || "Không rõ tiêu đề";

        this.book.publishedYear = bookData[0]?.book_id?.published_year
          ? new Date(bookData[0].book_id.published_year).toLocaleDateString(
              "vi-VN"
            )
          : "N/A";

        this.book.status = bookData[0].status || "N/A";
        this.book.id = bookData[0]._id || "N/A"; // Lưu _id vào đối tượng book

        // Gọi API lấy thông tin authors

        if (bookData[0]?.book_id?.author_id?.length) {
          // Ghép các `ids` đúng định dạng
          const idsQuery = bookData[0].book_id.author_id
            .map((id: string) => `ids=${id}`)
            .join("&");

          try {
            const authorResponse = await axios.get(
              `http://103.77.242.79:3005/api/author/list?${idsQuery}`
            );

            const authorNames = authorResponse.data.map(
              (author: any) => author.name
            );

            this.book.author = authorNames.join(", ");
          } catch (error) {
            console.error("Lỗi khi lấy thông tin tác giả:", error);
            this.book.author = "Không rõ tác giả";
          }
        } else {
          this.book.author = "Không rõ tác giả";
        }

        // Gọi API lấy thông tin genres
        if (bookData[0]?.book_id?.genre_id?.length) {
          // Ghép các `ids` đúng định dạng
          const idsQuery = bookData[0].book_id.genre_id
            .map((id: string) => `ids=${id}`)
            .join("&");

          try {
            const genreResponse = await axios.get(
              `http://103.77.242.79:3005/api/genre/list?${idsQuery}`
            );

            const genreNames = genreResponse.data.map(
              (genre: any) => genre.name
            );

            this.book.genre = genreNames.join(", ");
          } catch (error) {
            console.error("Lỗi khi lấy thông tin thể loại:", error);
            this.book.genre = "Không rõ thể loại";
          }
        } else {
          this.book.genre = "Không rõ thể loại";
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    },
    async borrowBook() {
      if (this.book.status === "AVAILABLE") {
        try {
          // Lấy token từ localStorage
          const token = localStorage.getItem("access_token");
          if (!token) {
            console.error("Không có token xác thực.");
            return;
          }

          // Gửi yêu cầu mượn sách bằng cách sử dụng POST request
          const response = await axios.post(
            `http://103.77.242.79:3005/api/loan/${this.book.id}`, // Sử dụng dấu backticks để chèn biến
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`, // Thêm token vào header
              },
            }
          );

          // Kiểm tra nếu mượn sách thành công
          if (response.status === 200 || response.status === 201) {
            // Thay đổi trạng thái của sách trong giao diện
            this.book.status = "LOANED";
          } else {
            console.error("Có lỗi khi mượn sách");
          }
        } catch (error) {
          console.error("Có lỗi xảy ra khi gửi yêu cầu mượn sách:", error);
        }
      }
    },
  },
  mounted() {
    this.fetchBookDetails();
  },
});
</script>

<style scoped>
.book-width1 {
  width: 100%;
}

.book-cover1 img {
  width: 100%;
}

.save-btn {
  /* position: absolute; */
  width: 0.4em;
  text-align: left;
  top: 0px;
  left: 0px;
}

.book-info1 {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.book-title1 {
  font-size: 1.5rem;
  font-weight: bold;
}

.book-author1 {
  font-size: 0.8rem;
  color: gray;
}

.book-details-row1 {
  margin-bottom: 10px;
}

.borrow-btn1 {
  display: flex;
  /* margin-top: 2em; */
}

/* Thêm khoảng cách giữa các cột */
.v-col {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
