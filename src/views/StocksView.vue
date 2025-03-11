<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getStocks } from '../services/api'

// Estado para guardar los stocks
const stocks = ref<{ ticker: string, company: string }[]>([])

// Cargar los stocks al montar el componente
onMounted(async () => {
  stocks.value = await getStocks()
})
</script>

<template>
  <div>
    <h1>Lista de Acciones</h1>
    <table>
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Empresa</th>
          <th>Detalles</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in stocks" :key="stock.ticker">
          <td>{{ stock.ticker }}</td>
          <td>{{ stock.company }}</td>
          <td>
            <router-link :to="'/stocks/' + stock.ticker">Ver Detalles</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
</style>
