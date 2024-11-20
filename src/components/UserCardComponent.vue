<template>
  <v-list-item
    class="ma-2"
    :prepend-avatar="avatarUrl"
    :subtitle="!isMobile ? email : ''"
    :title="!isMobile ? userName : ''"
  ></v-list-item>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// Dữ liệu người dùng được truyền từ UIAdmin.vue
const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
});

const isMobile = ref(false);

// Kiểm tra kích thước màn hình
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>

<script lang="ts">
export default {};
</script>

<style scoped></style>
