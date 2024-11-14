<template>
  <v-responsive class="mx-auto" max-width="75%">
    <v-card class="pa-8" elevation="2" max-width="100%" color="grey-lighten-4">
      <!-- Đặt label trong một thẻ div với lớp CSS để căn chỉnh -->
      <div class="input-label-container">
        <label class="input-label">{{ label }}</label>
      </div>
      <v-text-field :rules="[rules.required]"></v-text-field>
    </v-card>
  </v-responsive>
</template>

<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      rules: {
        required: (value: string) => !!value || "Field is required",
      },
    };
  },
};
</script>

<style>
.input-label-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 8px;
}
.input-label {
  font-size: 20px;
  font-weight: bold;
}
</style>
