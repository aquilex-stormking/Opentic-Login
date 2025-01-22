<template>
    <div class="home">
      <h1>Bienvenido a la prueba de Christian Porras</h1>
      <!-- <p>Esta es la sección de contenido para el inicio.</p> -->
      <router-link to="/login">Iniciar Sesión</router-link>
    </div>
  </template>
  
  <script>
  /* eslint-disable vue/multi-word-component-names */
  export default {
    name: 'Home'
  };
  </script>
  
  <style>
  /* Agrega estilos según sea necesario */
  .home {
    text-align: center;
  }
  </style>