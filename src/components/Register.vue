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
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "RegisterComponent",

  setup() {
    const email = ref("");
    const username = ref("");
    const password = ref("");
    const router = useRouter();

    const register = () => {
      console.log(
        "Registering with",
        email.value,
        username.value,
        password.value
      );
    };

    const goToLogin = () => {
      console.log("Go to login");
      router.push("/login");
    };

    return {
      email,
      username,
      password,
      register,
      goToLogin,
    };
  },
};
</script>
