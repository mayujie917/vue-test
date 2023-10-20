import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: "history",
	base: import.meta.env.BASE_URL,
	routes: [
		{
			path: "/",
			// name: "express",
			redirect: { name: "skillTest" },
		},
		{
			path: "/skillTest",
			name: "skillTest",
			component: () => import("../views/skillTest/index.vue"),
		},
	],
});

export default router
