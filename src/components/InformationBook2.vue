<template>
  <div class="book-width2"  @click="navigateToTargetPage">
    <div class="book-details2">
      <div class="book-cover2">
        <img :src="book.coverUrl" alt="Book Cover" />
      </div>
      <div class="book-info2">
        <div class="book-title2">{{ book.title }}</div>
        <div class="book-author2">{{ book.author }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({


// Định nghĩa props
defineProps({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publicationYear: {
    type: String,
    required: true,
  },
});
  data() {
    return {
      book: {
        title: "defineProps.title",
        author: "defineProps.author",
        coverUrl: "https://nxbhcm.com.vn/Image/Biasach/dacnhantam86.jpg",
        addedDate: "publicationYear",
        genre: "Học thuật",
        status: "Cũ",
      },
      isBorrowed: false,
      isBookmarked: false,
    };
  },
  computed: {
    bookmarkColor() {
      return this.isBookmarked ? '#0EFF5E' : '#ccc';
    }
  },
  methods: {
    borrowBook() {
      this.isBorrowed = !this.isBorrowed;
      // Xử lý sự kiện mượn sách
    },
    navigateToTargetPage() {
      this.$router.push('/infor');
    },
    saveChanges() {
      // Xử lý sự kiện lưu
    },
    editDetails() {
      // Xử lý sự kiện chỉnh sửa
    },
    toggleBookmark() {
      this.isBookmarked = !this.isBookmarked;
    }
  },
});


</script>

<style>
.book-width2 {
  width: 15em;
  height: 16em;
}

.book-details2 {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.book-cover2 {
  position: relative;
  width: 10em;
  height: 10em;
}
.save-btn2 {
  position: absolute;
  bottom: 5px;
  right: 10px;
  width: 0.4em;
  text-align: left;
  left: 0;
  cursor: pointer;
}
.edit-btn2 {
  position: absolute;
  top: 10px;
  right: 5px;
  cursor: pointer;
  padding: 0.1em;
  background-color: #fff;
  border-radius: 50%;

}
.edit-btn2 v-icon {
  font-size: 0.2em; /* Thu nhỏ kích thước của icon chỉnh sửa */
}
.book-cover2 img {
  width: 100%;
}

.book-info2 {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  font-size: 0.7em;
}

.book-title2 {
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #fff;
  color: #666666;
  width: 100%;
  text-align: center;
}

.book-author2 {
  font-size: 1rem;
  margin-top: 10px;
  text-align: center;
  background-color: #fff;
  width: 100%;
  color: #666666;
}

.book-details-row2 {
  margin-bottom: 10px;
}

.borrow-btn2 {
  display: flex;
}

.borrow-btn2 .v-btn--active2 {
  background-color: gray;
  color: white;
}

.borrowed2 {
  background-color: gray !important;
  color: white !important;
}
</style>
