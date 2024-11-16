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

<script lang="ts">
import { useRoute } from "vue-router";

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // Rule mặc định
      rules: {
        required: (value: string) => !!value || "ĐIỀN VÀO KHÔNG BỐ MÀY ĐẤM CHẾT GIỜ",
      },
    };
  },
  computed: {
    // Tạo computed property để kiểm tra điều kiện đường dẫn và trả về rules phù hợp
    computedRules() {
      // Sử dụng useRoute để truy xuất thông tin về route hiện tại
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
