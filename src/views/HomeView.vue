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
  <div class="container mx-auto p-6 bg-[#C3E0E5] min-h-screen">
    <h1 class="text-4xl font-bold text-[#274472] mb-6 text-center">
      Recomendaciones de Acciones
    </h1>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead class="bg-[#5885AF]">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-white uppercase">Ticker</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-white uppercase">Empresa</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-white uppercase">Broker</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-white uppercase">Acción</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-white uppercase">Rating (de → a)</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-white uppercase">Target (de → a)</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-white uppercase">Fecha</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-300">
          <tr
            v-for="rec in recommendations"
            :key="rec.ticker"
            class="hover:bg-[#C3E0E5]"
          >
            <td class="px-6 py-4 text-sm font-medium text-[#274472]">{{ rec.ticker }}</td>
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
