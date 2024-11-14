<template>
  <v-list-item
    :prepend-icon="icon"
    :title="title"
    :value="value"
    @click="() => method()"
  ></v-list-item>
</template>

<script lang="ts">
export default {
  name: "ItemAdmin",
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    method: {
      type: Function,
      required: true,
    },
  },
};
</script>
