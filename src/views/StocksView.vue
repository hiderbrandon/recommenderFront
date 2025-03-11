<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getStocks } from "../services/api";

// Estado para guardar los stocks y controlar la paginación
const stocks = ref<{ ticker: string; company: string }[]>([]);
const limit = 5; // Número de resultados por página
const offset = ref(0); // Posición de inicio para la consulta

async function fetchStocks() {
  try {
    stocks.value = await getStocks(limit, offset.value);
  } catch (error) {
    console.error("Error cargando stocks:", error);
  }
}

function nextPage() {
  offset.value += limit;
  fetchStocks();
}

function prevPage() {
  if (offset.value > 0) {
    offset.value -= limit;
    fetchStocks();
  }
}

onMounted(fetchStocks);
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

    <!-- Controles de paginación -->
    <div class="pagination">
      <button @click="prevPage" :disabled="offset === 0">Anterior</button>
      <button @click="nextPage">Siguiente</button>
    </div>
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
.pagination {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
button {
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
