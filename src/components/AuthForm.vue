<template>
  <v-container
    fluid
    class="d-flex justify-center align-center"
    style="height: 100vh"
  >
    <v-row align="center" justify="center">
      <v-col cols="12" sm="4" md="8">
        <v-card class="pa-5 elevation-12">
          <v-card-title class="justify-center">
            <h3 class="text-center">{{ title }}</h3>
          </v-card-title>
          <v-card-subtitle class="text-center mb-4">
            {{ subtitle }}
          </v-card-subtitle>

          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              v-model="username"
              v-if="isRegister"
              prepend-icon="mdi-account"
              label="Họ và Tên"
              color="primary"
              required
              outlined
              hide-details
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="address"
              v-if="isRegister"
              prepend-icon="mdi-map-marker"
              label="Địa chỉ"
              color="primary"
              required
              outlined
              hide-details
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="email"
              prepend-icon="mdi-email"
              label="Email"
              color="primary"
              required
              outlined
              hide-details
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="password"
              prepend-icon="mdi-lock"
              label="Mật Khẩu"
              :type="showPassword ? 'text' : 'password'"
              color="primary"
              required
              outlined
              hide-details
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="togglePasswordVisibility"
              class="mb-4"
            ></v-text-field>

            <div style="margin-bottom: 24px"></div>
            <v-btn type="submit" color="orange" class="mt-4" block>
              {{ buttonText }}
            </v-btn>

            <div class="text-center mt-4">
              <span class="mr-5">{{ actionText }}</span>
              <v-btn color="primary" @click="switchAction">
                {{ actionLinkText }}
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  name: "AuthForm",
  props: {
    title: String,
    subtitle: String,
    isRegister: Boolean,
    buttonText: String,
    actionText: String,
    actionLinkText: String,
    onSubmit: Function,
    switchAction: Function,
  },
  data() {
    return {
      email: "",
      username: this.isRegister ? "" : undefined,
      password: "",
      address: this.isRegister ? "" : undefined,
      showPassword: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    handleSubmit() {
      if (this.onSubmit) {
        this.onSubmit({
          email: this.email,
          password: this.password,
          username: this.isRegister ? this.username : undefined,
          address: this.isRegister ? this.address : undefined,
        });
      }
    },
  },
};
</script>

<style scoped>
h3 {
  font-weight: bold;
}

.d-flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.align-center {
  align-items: center;
}

.text-center {
  text-align: center;
}
</style>
