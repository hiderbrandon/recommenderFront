<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getStocks } from "../services/api";

// Estado para guardar los stocks y controlar la paginación
const stocks = ref<{ ticker: string; company: string }[]>([]);

let offset = ref(0); // Posición de inicio para la consulta
let limit = 5; // Número de resultados por página
let test = ref(0)

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

function changeLimit(){
   if (test.value > 0) {
    limit = test.value ;
    fetchStocks();
  }
}


function changeOffset(){
    offset.value = 20;
    fetchStocks();

}

onMounted(fetchStocks);
</script>

<template>
  <div class="container mx-auto p-6 bg-[#C3E0E5] min-h-screen">
    <h1 class="text-4xl font-bold text-[#274472] mb-6 text-center">
      Lista de Acciones
    </h1>

    <div class="mb-4">
      <label for="fname" class="text-[#274472]">results per page:</label><br>
      <input v-model="test" type="text" id="fname" name="fname" class="border border-[#5885AF] rounded px-2 py-1"><br>
      <button
        @click="changeLimit"
        class="mt-2 bg-[#41729F] hover:bg-[#274472] text-white font-semibold py-2 px-4 rounded"
      >
        submit
      </button>
    </div>

    <div class="mb-4">
      <label for="fname" class="text-[#274472]">change page:</label><br>
      <input v-model="test" type="text" id="fname" name="fname" class="border border-[#5885AF] rounded px-2 py-1"><br>
      <button
        @click="changeOffset"
        class="mt-2 bg-[#41729F] hover:bg-[#274472] text-white font-semibold py-2 px-4 rounded"
      >
        submit
      </button>
    </div>
    

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead class="bg-[#5885AF]">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-white uppercase">Ticker</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-white uppercase">Empresa</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-white uppercase">Detalles</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-300">
          <tr
            v-for="stock in stocks"
            :key="stock.ticker"
            class="hover:bg-[#C3E0E5]"
          >
            <td class="px-6 py-4 text-sm font-medium text-[#274472]">
              {{ stock.ticker }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ stock.company }}
            </td>
            <td class="px-6 py-4">
              <router-link
                :to="'/stocks/' + stock.ticker"
                class="text-[#41729F] hover:underline hover:text-[#274472]"
              >
                Ver Detalles
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-between mt-4">
      <button
        @click="prevPage"
        :disabled="offset === 0"
        class="bg-[#5885AF] hover:bg-[#41729F] text-white font-semibold py-2 px-4 rounded disabled:bg-gray-200 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      <button
        @click="nextPage"
        class="bg-[#41729F] hover:bg-[#274472] text-white font-semibold py-2 px-4 rounded"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>