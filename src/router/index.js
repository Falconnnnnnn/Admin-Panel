import { createRouter, createWebHistory } from "vue-router";
import AdminView from "@/views/AdminView.vue";
import AddUserView from "@/views/AddUserView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "adminpanel",
      component: AdminView,
    },
    {
      path: "/adduser",
      name: "adduser",
      component: AddUserView,
    },
  ],
});

export default router;
