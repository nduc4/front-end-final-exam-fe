<template>
  <div class="input-label-container">
    <label class="input-label">{{ label }}</label>
    <!-- Sử dụng v-combobox với model-value và update:modelValue -->
    <v-combobox
      :model-value="modelValue"
      @update:modelValue="updateValue"
      :items="items"
      :rules="computedRules"
      density="compact"
      outlined
      variant="solo-inverted"
    ></v-combobox>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { useRoute } from "vue-router";

// Định nghĩa props cho component, bao gồm label, modelValue, và items
const props = defineProps({
  label: String,
  modelValue: String, // Truyền giá trị từ ngoài vào (v-model)
  items: Array as () => string[], // Dữ liệu cho combobox
});

// Định nghĩa emits để gửi sự kiện khi giá trị thay đổi
const emit = defineEmits(["update:modelValue"]);

// Hàm cập nhật giá trị khi người dùng thay đổi trong combobox
const updateValue = (value: string) => {
  emit("update:modelValue", value); // Gửi giá trị mới ra ngoài
};

// Quy tắc xác thực mặc định
const rules = {
  required: (value: string) => !!value || "Field is required",
};

// Sử dụng useRoute để truy cập vào route hiện tại
const route = useRoute();

// Tạo computed property cho rules
const computedRules = computed(() => {
  if (route.path === "/editbook") {
    return []; // Không cần quy tắc khi ở trang sửa
  }
  return [rules.required]; // Quy tắc bắt buộc cho các trang khác
});
</script>

<style scoped>
.v-combobox {
  max-width: 100%;
}
</style>
