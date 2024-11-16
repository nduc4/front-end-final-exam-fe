<template>
  <v-btn :style="{ color, background }" dark @click="handleClick" type="submit">
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
    handleClick() {},
  },
};
</script>
