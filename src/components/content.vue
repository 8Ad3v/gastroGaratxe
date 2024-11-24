<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useMenuStore } from "@/stores/menuStore"; // Asegúrate de que la ruta del store sea correcta
import { useBgStore } from "@/stores/BgStore"; // Asegúrate de que la ruta del store sea correcta
import Carousel from "@/components/Carousel.vue";

const homeRef = ref(null);
const aboutUsRef = ref(null);
const historyRef = ref(null);
const foodMenuRef = ref(null);
const reservationRef = ref(null);

const titleGastroRef = ref(null);
const titleAboutUsRef = ref(null);
const titleHistoryRef = ref(null);
const titleMenuRef = ref(null);
const titleReservationRef = ref(null);

const reserveButtonRef = ref(null);

const menuStore = useMenuStore();
const BgStore = useBgStore();

const images = ref([
  { id: 1, url: "/src/assets/food/food1.jpeg" },
  { id: 2, url: "/src/assets/food/food2.jpeg" },
  { id: 3, url: "/src/assets/food/food3.jpeg" },
  { id: 4, url: "/src/assets/food/food4.jpeg" },
  { id: 5, url: "/src/assets/food/food5.jpeg" },
]);

const scrollToAboutUs = () => {
  if (aboutUsRef.value) {
    aboutUsRef.value.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollToHistory = () => {
  if (historyRef.value) {
    historyRef.value.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollToMenu = () => {
  if (foodMenuRef.value) {
    foodMenuRef.value.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollToReservation = () => {
  if (reservationRef.value) {
    reservationRef.value.scrollIntoView({ behavior: "smooth" });
  }
};

let titleObserver = null;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.target.id === "reserve-button-home") {
        const isVisible = entry.isIntersecting;
        menuStore.isInHomePage = isVisible;
        console.log("isInHomePage:", isVisible);
      }
    });
  },
  { threshold: 0.5 } // El porcentaje de visibilidad necesario para que se dispare el callback
);

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Imprimir en consola el texto del <p> que está en pantalla
      console.log(`Visible: ${entry.target.textContent}`);
      BgStore.changeSection(entry.target.textContent);
    }
  });
};

const createObserver = () => {
  if (
    titleGastroRef.value &&
    titleAboutUsRef.value &&
    titleHistoryRef.value &&
    titleMenuRef.value &&
    titleReservationRef.value
  ) {
    titleObserver = new IntersectionObserver(handleIntersection, {
      root: null, // Usar el viewport como raíz
      threshold: 0.5, // Definir el porcentaje del elemento que debe ser visible
    });

    // Observar cada uno de los elementos <p>
    console.log("Observing elements:");
    [
      titleGastroRef,
      titleAboutUsRef,
      titleHistoryRef,
      titleMenuRef,
      titleReservationRef,
    ].forEach((ref) => {
      if (ref.value) {
        console.log("Observing:", ref.value.textContent);
        titleObserver.observe(ref.value);
      } else {
        console.log("Ref is null");
      }
    });
  } else {
    console.error("One or more refs are null");
  }
};

onMounted(() => {
  nextTick(() => {
    createObserver();
  });

  if (reserveButtonRef.value) {
    observer.observe(reserveButtonRef.value);
  }
});

onUnmounted(() => {
  if (reserveButtonRef.value) {
    observer.unobserve(reserveButtonRef.value);
  }
  if (titleObserver) {
    titleObserver.disconnect();
  }
});
</script>

<template>
  <div class="content">
    <section class="home" ref="homeRef">
      <p class="title-test" ref="titleGastroRef">GastroGaratxe</p>
      <section class="home-menu-container">
        <a @click="scrollToAboutUs">Sobre nosotros</a>
        <a @click="scrollToHistory">Historia</a>
        <a @click="scrollToMenu">Menu</a>
        <button
          @click="scrollToReservation"
          class="reserve-button"
          id="reserve-button-home"
          ref="reserveButtonRef"
        >
          RESERVAR
        </button>
      </section>
    </section>

    <section class="about-us full-page" ref="aboutUsRef">
      <p class="title-test" ref="titleAboutUsRef">Sobre nosotros</p>
      <p class="bottom-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam
      </p>
    </section>

    <section class="history full-page" ref="historyRef">
      <p class="title-test" ref="titleHistoryRef">Historia</p>
      <p class="bottom-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam
      </p>
    </section>

    <section
      class="food-menu menu-container full-page"
      style="background-color: black"
      ref="foodMenuRef"
    >
      <p class="title-test" ref="titleMenuRef">Menu</p>
      <!--     <div
        class="menu-images"
        style="position: relative; /* right: 0; */ margin: -5%; right: 0"
      >
        <div
          style="
            position: absolute;
            width: 90vw;
            height: 50%;
            right: 0;
            border-top: 2px solid white;
            height: 100%;
            border-left: 3px solid white;
            border-bottom: 2px solid white;
            padding-top: 5%;
            padding-bottom: 5%;
            padding-left: 5%;
          "
        >
          <Carousel />
        </div>
      </div>
      <p class="bottom-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam
      </p> -->
    </section>

    <section class="make-reservation full-page" ref="reservationRef">
      <p class="title-test" ref="titleReservationRef">Reservar</p>
    </section>
  </div>
</template>

<style scoped lang="scss">
.content {
  position: relative;
  height: 100dvh;
  overflow-y: auto;
  overflow-x: hidden;

  /* Scroll snap configuration */
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth; /* Para que el scroll sea suave */

  .menu-container {
    height: 100dvh;
    width: 100vw;
    position: relative;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .title-test {
    z-index: 20;
    color: white;
    font-family: "Orbitron", sans-serif;
    font-size: 28pt;
    overflow: hidden;
  }
  .full-page {
    height: 100dvh;
    width: 100vw;
    padding-top: 70px;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 5%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    scroll-snap-align: start;

    .bottom-text {
      font-size: 1.2rem;
      bottom: 0;
      width: 100%; /* Ajusta el ancho al del contenedor padre */
      text-align: left;
      color: white; /* Cambia el color del texto a blanco */
      font-family: "Orbitron", sans-serif; /* Aplicar el estilo de fuente */
    }
  }

  .home {
    display: flex;
    flex-direction: column;
    height: 100dvh;
    width: 100vw;
    justify-content: space-between;
    padding: 20px;
    scroll-snap-align: start;

    .home-menu-container {
      display: grid;
      width: 100%;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr auto auto;
      gap: 20px;
      align-self: flex-end;
      a {
        font-family: "Orbitron", sans-serif;
        color: white;
        font-size: 15pt;
        text-decoration: none;
        grid-column: span 2;
        cursor: pointer;
      }
      .reserve-button {
        grid-column: span 2;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-color: #ffffff00;
        color: white;
        border: 1px solid white;
        font-size: 20pt;
        cursor: pointer;
      }
    }
  }

  .food-menu {
    .menu-images {
      width: 100%;
      height: 60%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* Escala la imagen para cubrir todo el contenedor, recortando si es necesario */
        object-position: center; /* Centra la imagen dentro del contenedor */
      }
    }
  }

  .make-reservation {
    background-color: black;
  }
}
</style>
