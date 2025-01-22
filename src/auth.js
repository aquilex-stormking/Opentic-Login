import { ref } from 'vue';
import router from './router'; // Asegúrate de importar el router

export const isAuthenticated = ref(false);

export function login() {
  isAuthenticated.value = true;
}

export function logout() {
  console.log('logout');
  isAuthenticated.value = false;
  router.push('/login'); // Redirigir a la ruta protegida
}