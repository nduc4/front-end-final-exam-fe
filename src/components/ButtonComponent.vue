<template>
  <v-btn style="border-radius: 4px" color="green" dark @click="handleClick">
    {{ text }}
  </v-btn>
</template>

<script lang="ts">
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick() {
      console.log("Button clicked");
    },
  },
};
</script>
