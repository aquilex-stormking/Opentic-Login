<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-field">
          <label for="username">Usuario:</label>
          <InputText id="username" v-model="username" required />
        </div>
        <div class="form-field">
          <label for="password">Contraseña:</label>
          <InputText id="password" type="password" v-model="password" required />
        </div>
        <Button label="Iniciar Sesión" type="submit" class="custom-button"   />
      </form>
    </div>
  </div>
</template>

<script>
import { login } from '../auth.js';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';


  /* eslint-disable vue/multi-word-component-names */
export default {
  name: 'Login',
  components: {
    InputText,
    Password,
    Button,
    
  },
  setup() {
    const toast = useToast();

    const showSuccess = () => {
      toast.add({
        severity: 'success', // Tipo de notificación (success, info, warn, error)
        summary: 'Éxito',
        detail: 'Inicio de Sesion exitoso.',
        life: 3000, // Tiempo de duración en milisegundos
      });
    };

    const showError = () => {
      toast.add({ severity: 'error', summary: 'Error Message', detail: 'Datos invalidos', life: 3000 });
    };

    return {
      showSuccess,
      showError
    };
  },
  data() {
    return {
      username: '',
      password: '',
      apiUrl: import.meta.env.VITE_API_URL,
    };
  },
  methods: {
    handleLogin() {
      const data = `{"username":"${this.username}","password":"${this.password}","recaptcha":null}`;

      axios.post(
        `${this.apiUrl}`,
        `jsonSend=${encodeURIComponent(data)}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      ).then(response => {
        const json = JSON.parse(response.data.encrypted);
        if (json.status !== 200) {
          this.showError();
          return;
        } else {
          this.showSuccess();
          login();
          localStorage.setItem('userData', JSON.stringify(json.data));
          localStorage.setItem('username', json.data.nombre);
          this.$router.push({ name: 'Dashboard', query: { username: json.data.nombre } });
        }
      }).catch(error => {
        this.showError();
        alert('Credenciales incorrectas');
        console.error("Error:", error);
      });
    }
  }
};
</script>
<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #b0b4b9;
}

.login-card {
  background: rgb(161, 174, 231);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.custom-button {
  padding: 0.5rem 1rem;
  border: 2px solid #007bff;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.form-field {
  margin-bottom: 1rem;
}

.form-field label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-field input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>