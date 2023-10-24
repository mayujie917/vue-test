import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      // name: "express",
      redirect: { name: "expressTest" },
    },
    {
      path: "/expressTest",
      name: "expressTest",
      component: () => import("../views/expressTest/index.vue"),
    },
  ],
});

export default router;
