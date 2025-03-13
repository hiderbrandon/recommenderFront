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
  <!-- Contenedor principal -->
  <div class="container mx-auto p-6 bg-gray-50 min-h-screen">
    <!-- Título -->
    <h1 class="text-4xl font-bold text-green-600 mb-6 text-center">
      Lista de Acciones
    </h1>

    <!-- Tabla con overflow-x-auto para scroll horizontal si se necesita -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Ticker</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Empresa</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Detalles</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-300">
          <tr
            v-for="stock in stocks"
            :key="stock.ticker"
            class="hover:bg-gray-100"
          >
            <td class="px-6 py-4 text-sm font-medium text-gray-900">
              {{ stock.ticker }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ stock.company }}
            </td>
            <td class="px-6 py-4">
              <!-- Enlace con estilo Tailwind -->
              <router-link
                :to="'/stocks/' + stock.ticker"
                class="text-blue-500 hover:underline"
              >
                Ver Detalles
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Botones de paginación -->
    <div class="flex justify-between mt-4">
      <button
        @click="prevPage"
        :disabled="offset === 0"
        class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded disabled:bg-gray-200 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      <button
        @click="nextPage"
        class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>
