<template>
  <div v-cloak="true" class="loader"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const title = ref("GastroGaratxe");

onMounted(() => {
  const chars = document.querySelectorAll(".title-test span");
  chars.forEach((char, index) => {
    setTimeout(() => {
      char.style.color = "white";
      if (index === chars.length - 1) {
        setTimeout(() => {
          document.querySelector(".loader").style.backgroundColor =
            "transparent";
          const spans = document.querySelectorAll(".title-test span");
          spans.forEach((char) => {
            char.classList.add("fade-out");
          });

          // Detectar cuando termina la animación de fade out en el último span
          spans[spans.length - 1].addEventListener("transitionend", () => {
            document.querySelector(".loader").style.display = "none";
          });
        }, 500);
      }
    }, index * 100);
  });
});
</script>

<style lang="scss">
.loader {
  width: 100vw;
  height: 100dvh;
  background-color: black;
  z-index: 201;
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  font-family: "Orbitron", sans-serif;
  text-align: center;
  transition: background-color 1s ease; /* Add transition for background color */

  p {
    color: black;
    font-family: Orbitron;
    font-size: 32pt;
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    white-space: nowrap; /* Keeps the content on a single line */
    margin: 0 auto; /* Gives that scrolling effect as the typing happens */

    span {
      display: inline-block; /* Needed for individual span manipulation */
      color: black; /* Ensure initial color is black */
      transition: opacity 1s ease; /* Transition for opacity */

      &.fade-out {
        opacity: 0; /* Fade out effect */
      }
    }
  }
}
</style>
