import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import AddBook from "@/pages/AddBookPage.vue";
import EditBook from "@/pages/EditBookPage.vue";
import ManageBook from "@/pages/ManageBookPage.vue";
import Alert from "@/components/UIAdminComponent.vue";
import BorrowedBooksUsers from "@/pages/BorrowedBooksUsers.vue";
import BorrowedBooksAdmin from "@/pages/BorrowedBooksAdmin.vue";
import InformationBook1 from "@/components/InformationBook1.vue";


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
      path: "/alert",
      name: "Alert",
      component: Alert,
    },
    // {
    //   path: "/infor",
    //   name: "InformationBook",
    //   component: InformationBook,
    // },
    {
      path: "/borrowedBooksUsers",
      name: "BorrowedBooksUsers",
      component: BorrowedBooksUsers,
    },
    {
      path: "/BorrowedBooksAdmin",
      name: "BorrowedBooksAdmin",
      component: BorrowedBooksAdmin,
    },
    {
      path: "/InformationBook1",
      name: "InformationBook1",
      component: InformationBook1,
    },
    
  ],
});

export default router;
