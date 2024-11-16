<template>
  <div class="input-label-container">
    <label class="input-label">{{ label }}</label>
  </div>
  <v-date-input
    :value="modelValue"
    @update:modelValue="updateModelValue"
    :rules="computedRules"
    density="compact"
    outlined
    variant="solo-inverted"
  />
</template>

<script lang="ts">
import { useRoute } from "vue-router";

// Định nghĩa các props
export default {
  props: {
    label: {
      type: String,
      required: true, // Đảm bảo rằng 'label' là bắt buộc
    },
    modelValue: {
      type: String, // Hoặc kiểu dữ liệu khác nếu cần
      required: true,
    },
  },
  data() {
    return {
      // Rule mặc định
      rules: {
        required: (value: string) => !!value || "Field is required",
      },
    };
  },
  emits: ["update:modelValue"], // Định nghĩa sự kiện update:modelValue
  computed: {
    computedRules() {
      const route = useRoute();
      if (route.path === "/editbook") {
        return [];
      }
      return [this.rules.required];
    },
  },
  methods: {
    updateModelValue(newValue: string) {
      // Phát sự kiện để đồng bộ giá trị giữa component cha và con
      this.$emit("update:modelValue", newValue);
    },
  },
};
</script>

<style scoped>
.v-date-input {
  max-width: 100%;
}
</style>
