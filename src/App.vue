<template>
  <div id="app">
    <Toast />
    <router-view />
  </div>
</template>

<script>
import Toast from 'primevue/toast';

export default {
  name: 'App',
  components: {
    Toast
  }
};
</script>

<style>
/* Agrega estilos globales si es necesario */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>