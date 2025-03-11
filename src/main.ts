import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 📌 Importamos el enrutador

const app = createApp(App)

app.use(router) // 📌 Usamos Vue Router
app.mount('#app')
