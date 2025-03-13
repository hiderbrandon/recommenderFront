<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getRecommendations } from "../services/api";

interface Recommendation {
  ticker: string;
  company: string;
  brokerage: string;
  action: string;
  rating_from: string;
  rating_to: string;
  target_from: string;
  target_to: string;
  time: string;
}

const recommendations = ref<Recommendation[]>([]);

onMounted(async () => {
  recommendations.value = await getRecommendations();
});
</script>

<template>
  <div class="container mx-auto p-6 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-green-600 mb-6 text-center">
      Recomendaciones de Acciones
    </h1>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Ticker</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Empresa</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Broker</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Acción</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Rating (de → a)</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Target (de → a)</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Fecha</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-300">
          <tr
            v-for="rec in recommendations"
            :key="rec.ticker"
            class="hover:bg-gray-100"
          >
            <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ rec.ticker }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ rec.company }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ rec.brokerage }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ rec.action }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ rec.rating_from }} → {{ rec.rating_to }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ rec.target_from }} → {{ rec.target_to }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ new Date(rec.time).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
