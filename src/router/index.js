import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import MainLayout from '@/layout/MainLayout.vue';
import DisplayView from '@/views/DisplayView.vue';

const router = createRouter({
	history: createWebHistory('/'),
	routes: [
		{
			path: '/',
			name: 'MainLayout',
			component: MainLayout,
			children: [
				{ path: '', name: 'dashborad', component: DashboardView },
				{ path: 'display', name: 'display', component: DisplayView },
			],
		},
	],
});

router.beforeEach((to) => {
	document.title = to.meta?.title ?? 'Sistem Antrian';
});

export default router;
