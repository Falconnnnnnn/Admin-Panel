import { createRouter, createWebHistory } from "vue-router";
import AdminView from "@/views/AdminView.vue";
import AddUserView from "@/views/AddUserView.vue";
import EditUserView from "@/views/EditUserView.vue";

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
    {
      path: "/edituser/:userId",
      name: "edituser",
      component: EditUserView,
    },
  ],
});

export default router;
