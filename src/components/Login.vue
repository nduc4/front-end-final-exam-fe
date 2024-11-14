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
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Login",

  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const login = () => {
      console.log("Logging in with", email.value, password.value);
    };

    const goToRegister = () => {
      router.push("/register");
    };

    return {
      email,
      password,
      login,
      goToRegister,
    };
  },
};
</script>
