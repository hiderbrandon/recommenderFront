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
  <!-- Contenedor principal -->
  <div class="container mx-auto p-6 bg-gray-50 min-h-screen">
    <!-- Cargando -->
    <div v-if="loading" class="text-center text-xl text-gray-700">
      Cargando...
    </div>
    <!-- Error -->
    <div v-else-if="error" class="text-center text-red-600 font-semibold">
      {{ error }}
    </div>
    <!-- Contenido principal -->
    <div v-else class="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-3xl font-bold text-green-600 mb-4">
        Detalles de {{ stock.ticker }}
      </h1>
      <table class="w-full border-collapse">
        <tbody>
          <tr class="border-b border-gray-200">
            <th class="py-2 px-2 text-left font-semibold text-gray-700">
              Empresa:
            </th>
            <td class="py-2 px-2 text-gray-600">
              {{ stock.company }}
            </td>
          </tr>
          <tr class="border-b border-gray-200">
            <th class="py-2 px-2 text-left font-semibold text-gray-700">
              Broker:
            </th>
            <td class="py-2 px-2 text-gray-600">
              {{ stock.brokerage }}
            </td>
          </tr>
          <tr class="border-b border-gray-200">
            <th class="py-2 px-2 text-left font-semibold text-gray-700">
              Acción:
            </th>
            <td class="py-2 px-2 text-gray-600">
              {{ stock.action }}
            </td>
          </tr>
          <tr class="border-b border-gray-200">
            <th class="py-2 px-2 text-left font-semibold text-gray-700">
              Rating Anterior:
            </th>
            <td class="py-2 px-2 text-gray-600">
              {{ stock.rating_from }}
            </td>
          </tr>
          <tr class="border-b border-gray-200">
            <th class="py-2 px-2 text-left font-semibold text-gray-700">
              Nuevo Rating:
            </th>
            <td class="py-2 px-2 text-gray-600">
              {{ stock.rating_to }}
            </td>
          </tr>
          <tr class="border-b border-gray-200">
            <th class="py-2 px-2 text-left font-semibold text-gray-700">
              Target Anterior:
            </th>
            <td class="py-2 px-2 text-gray-600">
              {{ stock.target_from }}
            </td>
          </tr>
          <tr class="border-b border-gray-200">
            <th class="py-2 px-2 text-left font-semibold text-gray-700">
              Nuevo Target:
            </th>
            <td class="py-2 px-2 text-gray-600">
              {{ stock.target_to }}
            </td>
          </tr>
          <tr class="border-b border-gray-200">
            <th class="py-2 px-2 text-left font-semibold text-gray-700">
              Fecha:
            </th>
            <td class="py-2 px-2 text-gray-600">
              {{ new Date(stock.time).toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Botón para volver -->
      <router-link
        to="/stocks"
        class="inline-block mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
      >
        Volver
      </router-link>
    </div>
  </div>
</template>
