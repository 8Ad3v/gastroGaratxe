<script setup>
import { ref, onMounted } from "vue";
import { useColorStore } from "@/stores/hColorsStore.js";
import { useBgStore } from "@/stores/BgStore"; // Asegúrate de que la ruta del store sea correcta

const colorStore = useColorStore();
const BgStore = useBgStore();
</script>

<template>
  <div class="h-info">
    <p class="h-info-title">Origenes</p>
    <div class="h-info-p">
      <p>
        Nuestros orígenes se remontan a un humilde garaje, el único local
        disponible, donde Carlos y Eric comenzaron su sueño de crear algo único
        en la cocina.
      </p>
    </div>
  </div>
</template>

<style lang="scss"></style>
