<template>
  <v-responsive class="mx-auto" max-width="75%">
    <v-card class="pa-8" elevation="2" max-width="100%" color="grey-lighten-4">
      <!-- Chỉ hiển thị "Năm xuất bản" khi prop showPublicationYear là true -->
      <v-card-text v-if="showPublicationYear">
        <div class="input-label-container">
          <label class="input-label">Năm xuất bản</label>
        </div>
        <v-row class="mb-4" dense>
          <!-- Ngày -->
          <v-col cols="4">
            <v-text-field
              v-model="day"
              placeholder="DD"
              :rules="[rules.required, rules.day]"
              outlined
              density="compact"
            />
          </v-col>
          <!-- Tháng -->
          <v-col cols="4">
            <v-text-field
              v-model="month"
              placeholder="MM"
              :rules="[rules.required, rules.month]"
              outlined
              density="compact"
            />
          </v-col>
          <!-- Năm -->
          <v-col cols="4">
            <v-text-field
              v-model="year"
              placeholder="YYYY"
              :rules="[rules.required, rules.year]"
              outlined
              density="compact"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-responsive>
</template>

<script lang="ts">
export default {
  props: {
    showPublicationYear: {
      type: Boolean,
      default: false, // Điều khiển hiển thị của "Năm xuất bản"
    },
  },
  data() {
    return {
      day: "",
      month: "",
      year: "",
      rules: {
        required: (value: string) => !!value || "Field is required",
        day: (value: string) =>
          (Number(value) > 0 && Number(value) <= 31) || "Invalid day",
        month: (value: string) =>
          (Number(value) > 0 && Number(value) <= 12) || "Invalid month",
        year: (value: string) =>
          (Number(value) > 1900 && Number(value) <= new Date().getFullYear()) ||
          "Invalid year",
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
