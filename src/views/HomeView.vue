<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getRecommendations } from "../services/api";

// Estado para guardar las recomendaciones
const recommendations = ref<
  { ticker: string; company: string; brokerage: string; action: string; rating_from: string; rating_to: string; target_from: string; target_to: string; time: string }[]
>([]);

// Cargar las recomendaciones al montar el componente
onMounted(async () => {
  recommendations.value = await getRecommendations();
});
</script>

<template>
  <div>
    <h1>Recomendaciones de Acciones</h1>
    <table>
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Empresa</th>
          <th>Broker</th>
          <th>Acción</th>
          <th>Rating (de → a)</th>
          <th>Target (de → a)</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rec in recommendations" :key="rec.ticker">
          <td>{{ rec.ticker }}</td>
          <td>{{ rec.company }}</td>
          <td>{{ rec.brokerage }}</td>
          <td>{{ rec.action }}</td>
          <td>{{ rec.rating_from }} → {{ rec.rating_to }}</td>
          <td>{{ rec.target_from }} → {{ rec.target_to }}</td>
          <td>{{ new Date(rec.time).toLocaleDateString() }}</td>
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
