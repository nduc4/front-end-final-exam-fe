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

          <v-form>
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
              v-model="password"
              prepend-icon="mdi-lock"
              label="Mật Khẩu"
              type="password"
              color="primary"
              required
              outlined
              hide-details
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="togglePasswordVisibility"
              class="mb-4"
            ></v-text-field>

            <v-row>
              <v-col class="text-right">
                <a href="#">Quên mật khẩu?</a>
              </v-col>
            </v-row>

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
      showPassword: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
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
