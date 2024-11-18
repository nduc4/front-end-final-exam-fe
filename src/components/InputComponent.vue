<template>
  <div class="input-label-container">
    <label class="input-label">{{ label }}</label>
  </div>
  <v-text-field
    :rules="computedRules"
    density="compact"
    outlined
    variant="solo-inverted"
  ></v-text-field>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { useRoute } from "vue-router";

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

const rules = {
  required: (value: string) => !!value || "Field is required",
};

      const route = useRoute();

      // Kiểm tra xem đường dẫn có phải là './editbook' không
      if (route.path === "/editbook") {
        // Nếu là 'editbook', không cần dùng rule 'required'
        return [];
      }
      // Nếu không phải 'editbook', sử dụng rule mặc định
      return [this.rules.required];
    },
  },
};
</script>

<style scoped>
.v-text-field {
  max-width: 100%;
}
</style>
