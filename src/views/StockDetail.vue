<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute();
</script>

<template>
  <div>
    <h1>Detalles de la Acción: {{ route.params.ticker }}</h1>
  </div>
</template>
