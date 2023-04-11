import { createRouter, createWebHistory } from 'vue-router'
import Board from '../views/Board.vue';
import Task from '../views/Task.vue';

const routes = [
	{
		path: '/',
		name: 'board',
		component: Board,
		children: [
			{
				path: 'task/:id',
				name: 'task',
				component: Task,
			}
		]
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router
