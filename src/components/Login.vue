<template>
  <AuthForm
    title="ĐĂNG NHẬP"
    subtitle="Nhập thông tin đăng nhập"
    :isRegister="false"
    buttonText="Đăng nhập"
    actionText="Chưa có tài khoản?"
    actionLinkText="Đăng ký"
    :onSubmit="login"
    :switchAction="goToRegister"
  />
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "Login",

  setup() {
    const router = useRouter();

    // Định nghĩa kiểu dữ liệu
    interface LoginForm {
      email: string;
      password: string;
    }

    // Hàm login
    const login = ({ email, password }: LoginForm) => {
      console.log("Logging in with", email, password);
      const ipAddress = import.meta.env.VITE_IP_ADDRESS;
      const port = import.meta.env.VITE_PORT;
      const url = `http://${ipAddress}:${port}/api/user/signin`;
      axios
        .post(url, { email, password })
        .then((response) => {
          console.log("Login success:", response.data);
          router.push("/home");
          localStorage.setItem("access_token", response.data.access_token);
        })
        .catch((error) => {
          console.error("Login error:", error);
          alert("Sai thông tin đăng nhập");
        });
    };

    // Chuyển đến trang đăng ký
    const goToRegister = () => {
      router.push("/register");
    };

    return {
      login,
      goToRegister,
    };
  },
};
</script>
