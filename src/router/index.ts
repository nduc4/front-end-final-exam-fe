import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import AddBook from "@/pages/AddBookPage.vue";
import EditBook from "@/pages/EditBookPage.vue";
import ManageBook from "@/pages/ManageBookPage.vue";
import Button from "@/components/ButtonComponent.vue";
import InformationBook from "@/components/InformationBook1.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterPage,
    },
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/addbook",
      name: "AddBook",
      component: AddBook,
    },
    {
      path: "/editbook",
      name: "EditBook",
      component: EditBook,
    },
    {
      path: "/date",
      name: "Date",
      component: Date,
    },
    {
      path: "/managebook",
      name: "ManageBook",
      component: ManageBook,
    },
    {
      path: "/infor",
      name: "InformationBook",
      component: InformationBook,
    },
  ],
});

export default router;
