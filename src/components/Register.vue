<template>
  <AuthForm
    title="ĐĂNG KÝ"
    subtitle="Nhập thông tin để đăng ký"
    :isRegister="true"
    buttonText="Đăng ký"
    actionText="Đã có tài khoản?"
    actionLinkText="Đăng nhập"
    :onSubmit="register"
    :switchAction="goToLogin"
  />
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "RegisterComponent",

  setup() {
    const router = useRouter();

    // Định nghĩa kiểu dữ liệu
    interface RegisterForm {
      email: string;
      address: string;
      username: string;
      password: string;
    }

    // Hàm đăng ký
    const register = ({ email, password, username, address }: RegisterForm) => {
      console.log("Registering with", email, username, password, address);

      const ipAddress = import.meta.env.VITE_IP_ADDRESS;
      const port = import.meta.env.VITE_PORT;
      const url = `http://${ipAddress}:${port}/api/user/signup`;

      axios
        .post(url, { email, password, fullName: username, address })
        .then((response) => {
          console.log("Register success:", response.data);
          router.push("/home");
        })
        .catch((error) => {
          console.error("Register error:", error);
          alert("Có lỗi xảy ra khi đăng ký tài khoản");
        });
    };

    // Chuyển đến trang đăng nhập
    const goToLogin = () => {
      console.log("Go to login");
      router.push("/login");
    };

    return {
      register,
      goToLogin,
    };
  },
};
</script>
