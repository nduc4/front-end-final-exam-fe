<template>
  <v-card>
    <v-app-bar app>
      <v-toolbar-title>Thư viện Lạc Hồng</v-toolbar-title>
      <v-spacer></v-spacer>
      <UserCard v-if="showUserCard" />
    </v-app-bar>

    <v-layout>
      <!-- Navigation drawer bên trái -->
      <v-navigation-drawer
        app
        expand-on-hover
        rail
        class="navigation-drawer"
        :width="200"
      >
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="..\assets\logo.png"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
        <!-- <v-divider></v-divider> -->
        <!-- Duyệt qua danh sách items từ props -->
        <v-list density="compact" nav>
          <ItemAdmin
            v-for="(item, index) in items"
            :key="index"
            :title="item.title"
            :icon="item.icon"
            :value="item.value"
            :method="item.method"
          />
        </v-list>
      </v-navigation-drawer>

      <!-- Main content bên phải -->
      <v-main
        sytle="background-color: red"
        class="fill-height"
        style="min-height: 100vh"
      >
        <v-row>
          <v-col cols="12" md="12">
            <!-- Slot cho input fields, sử dụng v-if để ẩn hiện -->
            <slot name="input-fields" v-if="showInputFields"></slot>
          </v-col>
        </v-row>
        <!-- <div class="mb-12"></div> -->
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { ref } from "vue";
import UserCard from "./UserCardComponent.vue";
import ItemAdmin from "./ItemAdminComponent.vue";
import InputField from "./InputComponent.vue";

interface NavItem {
  title: string;
  icon: string;
  value: string;
  method: Function;
}
export default {
  name: "AdminComponent",

  components: {
    UserCard,
    ItemAdmin,
    InputField,
  },

  props: {
    showUserCard: {
      type: Boolean,
      required: true,
    },
    items: {
      type: Array as () => NavItem[],
      required: true,
    },
    repeatCount: {
      type: Number,
      default: 4,
    },
    showInputFields: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      author: ref(""),
    };
  },
};
</script>

<style>
.v-main {
  background-color: #edf7ff;
}
</style>
