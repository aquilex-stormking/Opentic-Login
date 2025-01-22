<template>
  <div class="app-container">
    <Menubar :model="items">
      <!-- Logo en el lado izquierdo -->
      <template #start>
        <img src="https://primefaces.org/cdn/primevue/images/primevue-logo.png" alt="PrimeVue Logo" height="40" class="mr-2" />
      </template>

      <!-- Contenido en el lado derecho -->
      <template #end>
        <Button label="Logout" icon="pi pi-sign-out" @click="handleLogout" />
      </template>
    </Menubar>

    <!-- Contenedor principal -->
    <div class="content">
      <Button 
        label="Menu" 
        icon="pi pi-bars" 
        @click="showMenu = !showMenu"
        class="p-button-outlined"
      />
      
      <!-- Listbox centrado -->
      <div v-if="showMenu" class="listbox-container">
        <Listbox v-model="selectedCity" :options="cities" filter optionLabel="name" class="w-full md:w-56" />
      </div>

      <h1>Contenido Protegido</h1>
      <p>Bienvenido, {{ username }}</p>
      <p>Este contenido solo es visible para usuarios autenticados.</p>
    </div>
  </div>
</template>

<script>
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';

import Listbox from 'primevue/listbox';
import { logout } from '../auth.js';
  /* eslint-disable vue/multi-word-component-names */
export default {
  name: 'Dashboard',
  components: {
    Menubar,
    Button,
    
    Listbox
  },
  data() {
    return {
      showMenu: false,  // Para controlar la visibilidad del Listbox en móviles
      dialogPosition: "center", // Posición del Dialog
      modulosRol: [],
      items: [
        // {
        //   label: 'Home',
        //   icon: 'pi pi-fw pi-home',
        //   command: () => { this.$router.push('/'); }
        // },
        // {
        //   label: 'Profile',
        //   icon: 'pi pi-fw pi-user',
        //   command: () => { this.$router.push('/profile'); }
        // },
        // {
        //   label: 'Settings',
        //   icon: 'pi pi-fw pi-cog',
        //   command: () => { this.$router.push('/settings'); }
        // }
      ],
      menuItems: [
        {
          label: 'Perfil',
          icon: 'pi pi-user',
          command: () => { this.$router.push('/profile'); }
        },
        {
          label: 'Configuración',
          icon: 'pi pi-cog',
          command: () => { this.$router.push('/settings'); }
        },
        {
          label: 'Ayuda',
          icon: 'pi pi-info-circle',
          command: () => { this.$router.push('/help'); }
        }
      ],
      username: localStorage.getItem('username') || 'Usuario',
      userData: JSON.parse(localStorage.getItem('userData')) || {},
      selectedCity: null,
      cities: [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
      ],
    };
  },
  computed: {
    filteredCities() {
      // Limita los registros visibles en el Listbox
      return this.cities.slice(0, this.maxVisibleCities);
    },
  },
  mounted() {
    // Agrega los items del menú al Menubar
    // this.modulosRol = this.userData.operaciones.map(op => op.moduloRolOperacion);
    this.modulosRol = this.userData.operaciones
  .map(op => ({
    name: op.moduloRolOperacion,
    code: op.nombreRolOperacion,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));
    console.log('userData:',this.modulosRol);
    this.cities = this.modulosRol;
  },
  methods: {
    handleLogout() {
      logout();
      localStorage.removeItem('userData');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color:#6ee7b7
}

.listbox-container {
  margin-top: 1rem;
  color: #6ee7b7;
}

.mr-2 {
  margin-right: 0.5rem;
}
</style>