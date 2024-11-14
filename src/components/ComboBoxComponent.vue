<template>
  <div class="input-label-container">
    <label class="input-label">{{ label }}</label>
  </div>
  <v-combobox
    :model-value="modelValue"
    @update:modelValue="updateValue"
    :items="items"
    :rules="computedRules"
    density="compact"
    outlined
    variant="solo-inverted"
  ></v-combobox>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  label: String,
  modelValue: String,
  items: Array as () => string[],
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (value: string) => {
  emit("update:modelValue", value);
};

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

<style scoped>
.v-text-field {
  max-width: 100%;
}
</style>
