<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getStockByTicker } from '../services/api'

const route = useRoute()
const stock = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    stock.value = await getStockByTicker(route.params.ticker as string)
  } catch (err) {
    error.value = 'No se pudo cargar la información del stock.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading">Cargando...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else class="stock-detail">
    <h1>Detalles de {{ stock.ticker }}</h1>
    <table>
      <tr><th>Empresa:</th><td>{{ stock.company }}</td></tr>
      <tr><th>Broker:</th><td>{{ stock.brokerage }}</td></tr>
      <tr><th>Acción:</th><td>{{ stock.action }}</td></tr>
      <tr><th>Rating Anterior:</th><td>{{ stock.rating_from }}</td></tr>
      <tr><th>Nuevo Rating:</th><td>{{ stock.rating_to }}</td></tr>
      <tr><th>Target Anterior:</th><td>{{ stock.target_from }}</td></tr>
      <tr><th>Nuevo Target:</th><td>{{ stock.target_to }}</td></tr>
      <tr><th>Fecha:</th><td>{{ new Date(stock.time).toLocaleString() }}</td></tr>
    </table>
    <router-link to="/stocks">Volver</router-link>
  </div>
</template>

<style scoped>
.stock-detail {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
a {
  display: block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
}
</style>
