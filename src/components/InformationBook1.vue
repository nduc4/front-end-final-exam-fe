<template>
  <v-row class="book-width1">
    <!-- Cột bìa sách -->
    <v-col md="3" sm="12" class="book-cover1">
      <img :src="book.coverUrl" alt="Book Cover" />
    </v-col>
    <!-- Cột thông tin sách -->
    <v-col md="3" sm="12" class="book-info1">
      <div class="book-title1">{{ book.title }}</div>
      <div class="book-author1">{{ book.author }}</div>
      <div class="book-details-row1">
        <h4>{{ book.addedDate }}</h4>
      </div>
      <div class="book-details-row1" style="display: flex; flex-direction: row">
        <h4>Thể loại:</h4>
        {{ book.genre }}
      </div>
      <div class="book-details-row1" style="display: flex; flex-direction: row">
        <h4>Tình trạng:</h4>
        {{ book.status }}
      </div>
      <div class="borrow-btn1" v-if="showButton">
        <Button
          :background="isBorrowed ? 'gray' : 'green'"
          :color="isBorrowed ? 'white' : 'white'"
          :text="isBorrowed ? 'Đã mượn' : 'Mượn sách'"
          :disabled="isBorrowed"
          @click="borrowBook"
        />
      </div>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/ButtonComponent.vue";

export default defineComponent({
  name: "InformationBook",
  components: {
    Button,
  },
  props: {
    showButton: {
      type: Boolean,
      default: true, // Giá trị mặc định là `true`, nếu không truyền từ component cha thì nút sẽ hiển thị
    },
  },
  data() {
    return {
      book: {
        title: "Đắc nhân tâm",
        author: "Tác Giả Mẫu",
        coverUrl: "https://nxbhcm.com.vn/Image/Biasach/dacnhantam86.jpg",
        addedDate: "01/11/2024",
        genre: "Học thuật",
        status: "Cũ",
      },
      isBorrowed: false, // Trạng thái ban đầu của sách là chưa mượn
    };
  },
  methods: {
    borrowBook() {
      if (!this.isBorrowed) {
        this.isBorrowed = true; // Nếu chưa mượn thì mượn sách
      }
    },
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
