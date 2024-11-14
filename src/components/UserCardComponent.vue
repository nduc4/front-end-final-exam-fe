<template>
  <v-list-item
    class="ma-2"
    prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
    :subtitle="!isMobile ? 'loggay.admin@LGttBT.com' : ''"
    :title="!isMobile ? 'Longay' : ''"
  ></v-list-item>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isMobile = ref(false);

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
