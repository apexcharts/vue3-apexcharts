/* eslint-disable */
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import TreeShaking from "../views/TreeShaking.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/tree-shaking",
    name: "TreeShaking",
    component: TreeShaking,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
