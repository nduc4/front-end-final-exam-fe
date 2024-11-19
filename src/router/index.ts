import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import AddBook from "@/pages/AddBookPage.vue";
import EditBook from "@/pages/EditBookPage.vue";
import ManageBook from "@/pages/ManageBookPage.vue";
import Alert from "@/components/UIAdminComponent.vue";
import InfoBook from "@/pages/InfoBook.vue";
import SearchBook from "@/pages/SearchBook.vue";
import book2 from "@/components/InformationBook2.vue";
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
      path: "/managebook",
      name: "ManageBook",
      component: ManageBook,
    },
    {
      path: "/infor",
      name: "InformationBook",
      component: InfoBook,
    },
    {
      path: "/search",
      name: "SearchBook",
      component: SearchBook,
    },
    {
      path: "/infor",
      name: "InformationBook",
      component: InfoBook,
    },
    {
      path: "/search",
      name: "SearchBook",
      component: SearchBook,
    },
    {
      path: "/book2",
      name: "book2",
      component: book2,
    },
  ],
});

export default router;
