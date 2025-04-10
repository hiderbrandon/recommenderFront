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
  <div class="container mx-auto p-6 bg-[#C3E0E5] min-h-screen">
    <div v-if="loading" class="text-center text-xl text-[#274472]">
      Cargando...
    </div>
    <div v-else-if="error" class="text-center text-red-600 font-semibold">
      {{ error }}
    </div>
    <div v-else class="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-3xl font-bold text-[#274472] mb-4">
        Detalles de {{ stock.ticker }}
      </h1>
      <table class="w-full border-collapse">
        <tbody>
          <tr class="border-b border-gray-200">
            <th class="py-2 px-2 text-left font-semibold text-[#274472]">
              Empresa:
            </th>
            <td class="py-2 px-2 text-gray-600">
              {{ stock.company }}
            </td>
          </tr>
          <!-- ... other table rows keep the same structure ... -->
        </tbody>
      </table>

      <router-link
        to="/stocks"
        class="inline-block mt-4 bg-[#41729F] text-white font-semibold py-2 px-4 rounded hover:bg-[#274472]"
      >
        Volver
      </router-link>
    </div>
  </div>
</template>
