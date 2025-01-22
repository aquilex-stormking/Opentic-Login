import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import { isAuthenticated } from './auth';



const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('./views/Dashboard.vue'), // Reemplaza esto con el componente que quieras proteger
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Verifica la autenticación en cada navegación
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated.value) {
    // Si la ruta requiere autenticación y no está autenticado, redirige al login
    next({ path: '/login' });
  } else {
    next(); // Continúa a la ruta solicitada
  }
});

export default router;