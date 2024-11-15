<template>
  <v-btn :style="{ color, background }" dark @click="handleClick">
    {{ text }}
  </v-btn>
</template>

<script lang="ts">
export default {
  name: "Button",
  props: {
    text: {
      type: String,
    },
    background: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  methods: {
    handleClick() {
      console.log("Button clicked");
    },
  },
};
</script>
<style scoped>
button {
  border-radius: 4px;
  color: green;
  background: rgb(36, 199, 36);
}
</style>
