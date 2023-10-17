import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: "history",
	base: import.meta.env.BASE_URL,
	routes: [
		// {
		//   path: '/',
		//   name: 'home',
		//   component: HomeView
		// },
		// {
		//   path: '/about',
		//   name: 'about',
		//   component: () => import('../views/AboutView.vue')
		// }
		{
			path: "/",
			// name: "express",
			redirect: { name: "express" },
		},
		{
			path: "/express",
			name: "express",
			component: () => import("../views/express/index.vue"),
		},
		{
			path: "/skillTest",
			name: "skillTest",
			component: () => import("../views/skillTest/index.vue"),
		},
	],
});

export default router
