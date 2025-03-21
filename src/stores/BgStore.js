import { defineStore } from "pinia";

// Usamos import.meta.url para resolver las rutas correctamente
const generalVideo = new URL("@/assets/vid/vidbg.mp4", import.meta.url).href;
const sobreNosVideo = new URL("@/assets/vid/sobrenos.mp4", import.meta.url)
  .href;
const historiaVideo = new URL("@/assets/vid/hist.mp4", import.meta.url).href;

export const useBgStore = defineStore("BgStore", {
  state: () => ({
    section: 1,
    actVid: generalVideo, // Ruta generada para el video general
    vidHome: generalVideo, // Ruta generada para el video de inicio
    vidAboutUs: sobreNosVideo, // Ruta generada para el video "Sobre nosotros"
  }),
  actions: {
    changeSection(newSection) {
      if (newSection === "GastroGaratxe") {
        this.section = 1;
        this.actVid = generalVideo;
      } else if (newSection === "Conocenos") {
        this.section = 2;
        this.actVid = sobreNosVideo;
      } else if (newSection === "Origenes") {
        this.section = 3;
        this.actVid = historiaVideo;
      } else if (newSection === "Menu") {
        this.section = 4;
        // Agregar la ruta del video si aplica
      } else if (newSection === "Reservar") {
        this.section = 5;
        // Agregar la ruta del video si aplica
      }
    },
  },
});
