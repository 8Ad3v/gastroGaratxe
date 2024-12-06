import { defineStore } from "pinia";

export const useBgStore = defineStore("BgStore", {
  state: () => ({
    section: 1,
    actVid: new URL("/src/assets/vid/general.mp4", import.meta.url).href,
    vidHome: new URL("/src/assets/vid/general.mp4", import.meta.url).href,
    vidAboutUs: new URL("/src/assets/vid/sobrenos.mp4", import.meta.url).href,
  }),
  actions: {
    changeSection(newSection) {
      console.log("section: " + newSection);
      if (newSection === "GastroGaratxe") {
        this.section = 1;
        this.actVid = new URL(
          "/src/assets/vid/general.mp4",
          import.meta.url
        ).href;
      } else if (newSection === "Sobre nosotros") {
        this.section = 2;
        this.actVid = new URL(
          "/src/assets/vid/sobrenos.mp4",
          import.meta.url
        ).href;
      } else if (newSection === "Historia") {
        this.section = 3;
        this.actVid = new URL("/src/assets/vid/hist.mp4", import.meta.url).href;
      } else if (newSection === "Menu") {
        this.section = 4;
      } else if (newSection === "Reservar") {
        this.section = 5;
      }
      console.log(this.section);
      console.log(this.actVid);
    },
  },
});
