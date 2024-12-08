<script setup>
import { ref, computed } from "vue";
import { useMenuStore } from "@/stores/menuStore";

// Obtenemos acceso al store
const menuStore = useMenuStore();

// Hacemos reactiva la variable `isInHomePage`
const isInHomePage = computed(() => menuStore.isInHomePage);

// Variables reactivas locales
const menuDisplayedLocal = ref(false);
const burgerChecked = ref(false);

// Función para alternar el menú
const toggleMenu2 = () => {
  menuDisplayedLocal.value = burgerChecked.value;
  console.log("Checkbox is now:", burgerChecked.value);
};
</script>

<template>
  <!-- Condicionalmente renderizamos headerOptionsContainer -->
  <div v-if="!isInHomePage" class="headerOptionsContainer">
    <div @click.stop="decideoption"><button>RESERVA</button></div>
    <div><img src="/src/assets/logo.png" /></div>
    <!-- <div class="h-menu">
      <label class="burger" for="burger">
        <input
          type="checkbox"
          id="burger"
          v-model="burgerChecked"
          @change="toggleMenu2"
        />
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div> -->
  </div>

  <div
    :class="[
      'full-menu',
      { 'slide-in': menuDisplayedLocal, 'slide-out': !menuDisplayedLocal },
    ]"
  >
    <div>
      <p>SOBRE NOSOTROS</p>
      <p>HISTORIA</p>
      <p>MENU</p>
    </div>
  </div>
</template>

<style lang="scss">
.headerOptionsContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: white;
  z-index: 200;
  margin-top: 1.2vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  mix-blend-mode: difference;
  overflow-y: hidden;

  div {
    width: 33%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    button {
      background-color: transparent;
    }
    img {
      width: 50%;
      max-width: 100px;
    }
  }
  .h-menu {
    background-color: transparent;
  }

  .burger {
    position: relative;
    width: 40px;
    height: 30px;
    background: transparent;
    cursor: pointer;
    display: block;
    overflow-y: hidden;

    input {
      display: none;
    }

    span {
      display: block;
      position: absolute;
      height: 4px;
      width: 100%;
      background: rgb(255, 255, 255);
      border-radius: 9px;
      opacity: 1;
      left: 0;
      transform: rotate(0deg);
      transition: 0.25s ease-in-out;
    }
    span:nth-of-type(1) {
      top: 0px;
      transform-origin: left center;
    }
    span:nth-of-type(2) {
      top: 50%;
      transform: translateY(-50%);
      transform-origin: left center;
    }
    span:nth-of-type(3) {
      top: 100%;
      transform-origin: left center;
      transform: translateY(-100%);
    }
    input:checked ~ span:nth-of-type(1) {
      transform: rotate(45deg);
      top: 0px;
      left: 5px;
    }
    input:checked ~ span:nth-of-type(2) {
      width: 0%;
      opacity: 0;
    }
    input:checked ~ span:nth-of-type(3) {
      transform: rotate(-45deg);
      top: 28px;
      left: 5px;
    }
  }
}

.full-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  font-family: "Orbitron", sans-serif;
  font-size: 20pt;
  transition: transform 0.5s ease;

  &.slide-in {
    transform: translateX(0);
  }

  &.slide-out {
    transform: translateX(-100%);
  }

  div {
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
