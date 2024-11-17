<template>
  <v-card>
    <v-app-bar app>
      <v-toolbar-title>Thư viện Lạc Hồng</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Truyền dữ liệu vào UserCard -->
      <UserCard
        v-if="showUserCard"
        :userName="userName"
        :email="email"
        :avatarUrl="avatarUrl"
      />
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
      <v-main class="fill-height" style="min-height: 100vh">
        <v-row>
          <v-col cols="12" md="12">
            <!-- Slot cho input fields, sử dụng v-if để ẩn hiện -->
            <slot name="input-fields" v-if="showInputFields"></slot>
          </v-col>
        </v-row>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import UserCard from "./UserCardComponent.vue";
import ItemAdmin from "./ItemAdminComponent.vue";

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
  setup() {
    const userName = ref("");
    const email = ref("");
    const avatarUrl = ref("https://randomuser.me/api/portraits/women/85.jpg"); // avatar

    const ipAddress = import.meta.env.VITE_IP_ADDRESS;
    const port = import.meta.env.VITE_PORT;
    const accessToken = localStorage.getItem("access_token");

    onMounted(() => {
      // Lấy thông tin người dùng khi trang được mount
      axios
        .get(`http://${ipAddress}:${port}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // Cập nhật thông tin người dùng
          userName.value = response.data.fullName;
          email.value = response.data.email;
          avatarUrl.value = response.data.avatarUrl;
          localStorage.setItem("role", response.data.role);
        })
        .catch((error) => {
          console.log("Lỗi khi gọi API:", error);
          userName.value = "Sakura";
          email.value = "sakura@example.com";
        });
    });

    return {
      userName,
      email,
      avatarUrl,
    };
  },
};
</script>

<style>
.v-main {
  background-color: #edf7ff;
}
</style>
