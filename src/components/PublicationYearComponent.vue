<template>
  <div class="input-label-container">
    <label class="input-label">Năm xuất bản</label>
  </div>
  <v-date-input
    label="Date input"
    density="compact"
    outlined
    variant="solo-inverted"
    :rules="computedRules"
  ></v-date-input>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
const rules = {
  required: (value: string) => !!value || "Field is required",
};
const route = useRoute();

const computedRules = computed(() => {
  if (route.path === "/editbook") {
    return [];
  }
  return [rules.required];
});
</script>
<script lang="ts">
export default {};
</script>
