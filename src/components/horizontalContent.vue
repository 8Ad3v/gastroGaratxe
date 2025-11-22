<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import carou from "../components/carou/Carou.vue";
import vinelist from "/src/assets/document/winelist.pdf";
import gglogo from "/src/assets/logo.png";
import openEXT from "/src/assets/icons/openEXT.svg";

const videoSourceNEW = ref(
  new URL("@/assets/vid/vidbg.mp4", import.meta.url).href
);

const contentBackgroundColor = ref("var(--background-color)");
const textColor = ref("#213547");
import image1 from "../assets/food/food7h.jpg";
import image2 from "../assets/food/food8h.jpg";
import image3 from "../assets/food/food9h.jpg";
import image4 from "../assets/food/food10h.jpg";
import image5 from "../assets/food/food11h.jpg";
import image6 from "../assets/food/food12h.jpg";
const slides = ref([image1, image2, image3, image4, image5, image6]);

const showCarou = ref(false);
const carouContainerVisible = ref(false); // Variable para controlar la visibilidad del carou-container
const openWineList = () => {
  window.open(vinelist, "_blank");
};

const reservationRefh = ref(null);

const contentRef = ref(null);
const hheaderRef = ref(null);

const updateHheaderWidth = () => {
  if (contentRef.value && hheaderRef.value) {
    hheaderRef.value.style.width = `${contentRef.value.offsetWidth}px`;
  }
};
const scrollToReservationh = () => {
  if (reservationRefh.value) {
    reservationRefh.value.scrollIntoView({ behavior: "smooth" });
  }
};
onMounted(() => {
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("visible");
            if (section.id === "menuSection" || section.id === "bookSection") {
              contentBackgroundColor.value = "black";
              textColor.value = "white";
              showCarou.value = true;
              carouContainerVisible.value = true; // Mostrar el carou-container
            } else {
              contentBackgroundColor.value = "var(--background-color)";
              textColor.value = "#213547";
              showCarou.value = false;
              carouContainerVisible.value = false; // Ocultar el carou-container
            }
          } else {
            section.classList.remove("visible");
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(section);
  });

  // if (contentRef.value && hheaderRef.value) {
  //   hheaderRef.value.style.width = `${contentRef.value.offsetWidth}px`;
  // }
  // window.addEventListener("resize", updateHheaderWidth);
  window.addEventListener("headerreservationh", scrollToReservationh);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateHheaderWidth);
});
</script>

<template>
  <div class="horizontalContainer">
    <div v-if="!showCarou" class="video-container">
      <video class="video" :src="videoSourceNEW" autoplay muted loop></video>
    </div>
    <div
      v-if="showCarou"
      class="carou-container"
      :class="{ visible: carouContainerVisible }"
    >
      <carou :slides="slides" :interval="4000"></carou>
    </div>

    <div
      class="content"
      :class="{ active: showCarou }"
      :style="{ backgroundColor: contentBackgroundColor }"
      ref="contentRef"
    >
      <div class="hheader" ref="hheaderRef">
        <button @click="scrollToReservationh">RESERVAR</button>
        <img style="width: 5%" :src="gglogo" />
        <p><span></span>GastroGaratxe</p>
      </div>

      <div class="h-menu section">
        <h1>GastroGaratxe</h1>
        <div><a href="#meetUsSection">Conócenos</a></div>
        <div><a href="#originsSection">Orígenes</a></div>
        <div><a href="#menuSection">Menús</a></div>
        <div
          @click="openWineList()"
          class="home-menu-container-lightButton"
          style="cursor: pointer"
        >
          <a style="display: flex; align-items: center"
            >Bodega<span
              ><img style="width: 0.8em; height: 0.8em" :src="openEXT" /></span
          ></a>
        </div>
        <div><a href="#bookSection">Reservar</a></div>
      </div>
      <div id="meetUsSection" class="meetUs section">
        <h2>Conócenos</h2>
        <p :style="{ color: textColor }">
          Carlos y Eric, con experiencia en restaurantes de renombre, se
          conocieron en LLuerna. Tras un tiempo, decidieron emprender proyectos
          individuales, pero una tarde, tomando café, idearon
          <strong>Gastrogartxe</strong>, un concepto único.
        </p>
      </div>
      <div id="originsSection" class="origins section">
        <h2>Orígenes</h2>
        <p :style="{ color: textColor }">
          Gastrogaratxe comenzó en un garaje en L'Hospitalet de Llobregat, con
          una barra de 8 comensales, <u>11 pases y dos chefs.</u> Ahora, nos
          hemos trasladado a un local en el Prat de Llobregat, manteniendo
          nuestro concepto y esencia original.
        </p>
      </div>
      <div id="menuSection" class="section menu-section">
        <div class="hmenu-column">
          <h2 :style="{ color: textColor }">Menú degustación gastro</h2>
          <p :style="{ color: textColor }">
            - 11 pasos de cocina de autor<br />
            - miércoles - viernes | <strong>21:00</strong><br />
            - sábado | <strong>13:30 - 21:00</strong><br />
            - 75€ <span style="font-size: 0.5em">(IVA incluido)</span><br /> </p
        ></div>
        <div class="menu-divider" aria-hidden="true"></div>

        <div class="hmenu-column">
          <h2 :style="{ color: textColor }">Menú degustación corto</h2>
          <p :style="{ color: textColor }">
            - 6 pasos de cocina de autor<br />
            - miércoles - viernes | <strong>13:30 - 15:15</strong><br />
            - 40€ <span style="font-size: 0.5em">(IVA incluido)</span><br /> </p
        ></div>
      </div>

      <div id="bookSection" ref="reservationRefh" class="section">
        <h2 :style="{ color: textColor }">Reservar</h2>
        <div style="width: 100%; height: 80%">
          <iframe
            style="width: 100%; height: 100%"
            src="https://widget.thefork.com/ea84edc5-731d-4fa2-bfa1-0861d546538b"
            allow="payment *"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.horizontalContainer {
  display: flex;
  flex-direction: row-reverse;
  height: 100vh;
  overflow: hidden;

  .video-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-width: 45%;
    background-color: black;

    .video {
      height: 100%;
      width: auto;
      object-fit: cover;
    }
  }
  .carou-container {
    position: absolute;
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    transition: width 0.5s ease-in-out;
    width: 100%;
    &.visible {
      opacity: 1; // Visible cuando tiene la clase 'visible'
    }
    .video {
      height: 100%;
      width: auto;
      object-fit: cover;
    }
  }

  .content {
    flex: 1; /* Ocupa el resto del espacio */
    background-color: var(--background-color);
    overflow-y: auto; /* Activa scroll vertical */
    transition: background-color 1s ease-in-out;
    padding: 20px;
    box-sizing: border-box;

    /* Scroll snap configuration */
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth; /* Para que el scroll sea suave */

    display: flex;
    flex-direction: column; /* Asegura que los elementos se apilen verticalmente */

    /* Estilo opcional para el scroll */
    &::-webkit-scrollbar {
      width: 0px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: darkgray;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: gray;
    }

    .hheader {
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
      button {
        background-color: #ffffff00;
        font-size: 1.5em;
      }
      p {
        font-family: "Orbitron", sans-serif;
        padding: 0.6em 1.2em;
        background-color: #ffffff00;
        font-size: 1.5em;
      }
    }
    &.active {
      z-index: 100;
      background-color: #00000087 !important;
    }

    .section {
      min-height: 100vh;
      scroll-snap-align: start;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
      align-items: flex-start;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
      flex-wrap: nowrap;

      h2 {
        font-family: "Orbitron", sans-serif;
        font-size: 4vw;
        font-weight: 500;
        color: #213547;
      }
      p {
        font-family: "Orbitron", sans-serif;
        font-size: 2vw;
        color: #213547;
        margin-top: 10px; /* Espacio entre el título y el párrafo */
        text-align: left;
      }
      &.visible {
        opacity: 1;
      }
    }

    .h-menu {
      font-family: "Orbitron", sans-serif;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      h1 {
        overflow-y: hidden;
        font-size: 6vw;
        font-weight: 500;
      }
      a {
        font-weight: 100;
        font-size: 4.5vw;
        color: #213547;
      }
    }
  }
  .menu-section {
    display: flex;
    flex-direction: row !important;
    justify-content: space-around !important;
    align-items: center !important;
    flex-wrap: wrap;
  }
}
</style>
