<template>
  <div class="book-width">
    <!-- <AlertComponent ref="alert" text="Đã trả thành công!" /> -->
    <div v-for="(item, index) in Bookitems" :key="index" class="book-details">
      <v-col prepend-icon="mdi-bookmark" md="4" sm="12" class="book-cover">
        <img src="https://nxbhcm.com.vn/Image/Biasach/dacnhantam86.jpg" alt="Book Cover"/>
      </v-col>
      <v-col md="12" sm="12"  class="book-info">
        <div class="book-title">{{ item.title }}</div>
        <div class="book-author">{{ item.author }}</div>
      </v-col>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";
import Button from "@/components/ButtonComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";


interface Book {
  _id: string;
  title: string;
  author: string;
  published_year: string;
  genre: string;
}

export default defineComponent({
  name:"BookHome",
  components: {
    Button,
    AlertComponent,
  }, 
  data() {
    return {
      author: ref(""),
    };
    },
   props: {
      Bookitems: {
        type: Array as () => Book[],
        }
    },
});
</script>

<style>
.book-width {
  /* width: 15em;
  height: 22em; */

  width: 100%;
  height: auto;
  /* min-height: 100vh; */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.book-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%;
  height: 100%; */
  width: 15em;
  height: 23em;
  /* border: 1px solid black; */
  /* margin-top: 20px auto; */
  /* margin-left: 10px;
  margin-right: 10px; */
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
  background-color: #ffffff00;
  color: #666666;
  width: 100%;
  text-align: center;
}

.book-author {
  font-size: 1rem;
  margin-top: 5px;
  text-align: center;
  background-color: #ffffff00;
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
    /* justify-content: center; Căn giữa cho màn hình nhỏ */
    
  }
}
</style>
