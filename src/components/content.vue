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

function animateNumber(finalValue, currentNumber, duration = 2000) {
  const startTime = performance.now();

  function updateAnimation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    currentNumber.value = Math.floor(finalValue * progress);

    if (progress < 1) {
      requestAnimationFrame(updateAnimation);
    }
  }

  requestAnimationFrame(updateAnimation);
}
const targetNumber1 = 11; // Número final del primer <p>
const targetNumber2 = 60; // Número final del segundo <p>

// Números animados
const animatedNumber1 = ref(0);
const animatedNumber2 = ref(0);

// Referencias para los elementos
const number1 = ref(null);
const number2 = ref(null);

onMounted(() => {
  nextTick(() => {
    createObserver();
    const observer2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === number1.value) {
              animateNumber(targetNumber1, animatedNumber1);
            } else if (entry.target === number2.value) {
              animateNumber(targetNumber2, animatedNumber2);
            }
          }
        });
      },
      { threshold: 0.5 } // Se activa cuando el 50% del elemento es visible
    );

    if (number1.value) observer2.observe(number1.value);
    if (number2.value) observer2.observe(number2.value);
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
        <button
          @click="scrollToAboutUs"
          class="home-menu-container-lightButton"
        >
          Conocenos
        </button>
        <button
          @click="scrollToHistory"
          class="home-menu-container-lightButton"
        >
          Origenes
        </button>
        <button @click="scrollToMenu" class="home-menu-container-lightButton">
          Menu
        </button>
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
      <p class="title-test" ref="titleAboutUsRef">Conocenos</p>
      <p class="bottom-text typingEffect">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam
      </p>
    </section>

    <section class="history full-page" ref="historyRef">
      <p class="title-test" ref="titleHistoryRef">Origenes</p>
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
      <div class="menu-images" style="position: relative; /* right: 0; */">
        <Carousel />
      </div>
      <div class="food-menu-info">
        <div class="food-menu-info-steps">
          <p ref="number1">{{ animatedNumber1 }}</p>
          <p>pasos</p>
        </div>
        <div class="food-menu-info-steps">
          <p ref="number2">{{ animatedNumber2 }}</p>
          <p>ingredientes</p>
        </div>
      </div>
    </section>

    <section class="make-reservation full-page" ref="reservationRef">
      <p class="title-test" ref="titleReservationRef">Reservar</p>
      <div class="iframe-wrapper">
        <iframe
          src="https://widget.thefork.com/ea84edc5-731d-4fa2-bfa1-0861d546538b"
          allow="payment *"
        ></iframe>
      </div>
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

  .title-test {
    z-index: 20;
    color: white;
    font-family: "Orbitron", sans-serif;
    font-size: 9vw;
    overflow: hidden;
  }
  .full-page {
    height: 100dvh;
    width: 100vw;
    padding-top: 7vh;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 5%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    scroll-snap-align: start;

    .bottom-text {
      font-size: 5vw;
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
      &-lightButton {
        font-family: "Orbitron", sans-serif;
        color: white;
        font-size: 5vw;
        text-decoration: none;
        grid-column: span 2;
        cursor: pointer;
        background-color: transparent;
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
        font-size: 6.5vw;
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
    }

    &-info {
      width: 100%;
      height: fit-content;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      p {
        color: white;
        font-family: "Orbitron", sans-serif;
      }
      &-steps {
        p:nth-of-type(1) {
          font-size: 18vw;
        }

        p:nth-of-type(2) {
          font-size: 8vw;
        }
      }
    }
  }

  .make-reservation {
    background-color: black;
  }
}
.iframe-wrapper {
  position: relative;
  width: 100%;
  height: 80%;
  padding-top: 56.25%; /* Proporción 16:9 */
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(1); /* Ajusta el tamaño global */
    transform-origin: 0 0; /* Ajusta el punto de origen del escalado */
  }
}
</style>
