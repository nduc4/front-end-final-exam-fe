import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import AddBook from "@/pages/AddBookPage.vue";
import EditBook from "@/pages/EditBookPage.vue";
import ManageBook from "@/pages/ManageBookT.vue";
import InfoBook from "@/pages/InfoBook.vue";
import SearchBook from "@/pages/SearchBook.vue";
import ManageBookPage from "@/pages/ManageBookPage.vue";
import Button from "@/components/ButtonComponent.vue";
import InformationBook from "@/components/InformationBook1.vue";
import BorrowedBooksUsers from "@/pages/BorrowedBooksUsers.vue";
import BorrowedBooksAdmin from "@/pages/BorrowedBooksAdmin.vue";
import HomePage from "@/pages/HomePage.vue"
import book1 from "@/components/InformationBook1.vue"
import book3 from "@/components/InformationBook3.vue"
import InformationBook1 from "@/components/InformationBook1.vue";
import InformationBook3 from "@/components/InformationBook3.vue";
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
      redirect: "/home",
    },
    {
      path: "",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "Home",
      component: HomePage,
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
      path: "/managebookpage",
      name: "ManageBook",
      component: ManageBookPage,
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
      path: "/borrowedBooksUsers",
      name: "BorrowedBooksUsers",
      component: BorrowedBooksUsers,
    },
    {
      path: "/BorrowedBooksAdmin",
      name: "BorrowedBooksAdmin",
      component: BorrowedBooksAdmin,
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
