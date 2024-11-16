<template>
    <div v-show="visible" class="alert-container" @animationend="onAnimationEnd">
      <v-alert dense dismissible shaped type="success" style="width: 300px">
        {{ text }}
      </v-alert>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, ref } from "vue";
  
  // Định nghĩa props để nhận giá trị từ component cha
  defineProps({
    text: {
      type: String,
      required: true,
    },
  });
  
  const visible = ref(false);
  
  const showAlert = () => {
    visible.value = true;
  };
  
  const onAnimationEnd = () => {
    visible.value = false;
  };

  defineExpose({ showAlert });
  </script>
  
  <style scoped>
  .alert-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    animation: slide-up 1s forwards;
  }
  
  @keyframes slide-up {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>