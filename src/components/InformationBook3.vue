<template>
    <div class="book-width">
      <div class="book-details">
        <div class="book-cover">
          <img :src="book.coverUrl" alt="Book Cover" />
          <div class="save-btn" @click="toggleBookmark">

        <v-icon :color="bookmarkColor">mdi-bookmark</v-icon> <!-- Icon Bookmark --> <!-- Icon Bookmark -->
      </div>
      <div class="edit-btn" @click="editDetails">
        <v-icon>mdi-pencil</v-icon> <!-- Icon Chỉnh sửa -->
      </div>
        </div>
        <div class="book-info">
          <div class="book-title">{{ book.title }}</div>
          <div class="book-author">{{ book.author }}</div>

            <div class="book-day">
                <h5>Hạn trả: {{  book.day }}</h5>
            </div>
        </div>
      </div>
    </div>
  </template>

  <script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    data() {
      return {
        book: {
          title: "Đắc nhân tâm",
          author: "Tác Giả Mẫu",
          coverUrl: "https://nxbhcm.com.vn/Image/Biasach/dacnhantam86.jpg",
          addedDate: "01/11/2024",
          genre: "Học thuật",
          status: "Cũ",
          day:"12/12/2024"
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
  .book-width {
    width: 15em;
    height: 18em;
  }

  .book-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .book-cover {
    position: relative;
    width: 10em;
    height: 10em;
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
    font-size: 1.5rem;
    font-weight: bold;
    background-color: #fff;
    color: #666666;
    width: 100%;
    text-align: center;
  }

  .book-author {
    font-size: 1rem;
    margin-top: 10px;
    text-align: right;
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
  .book-day{
    margin-top:16px;
    font-size: 1.8em;
  }
  </style>
