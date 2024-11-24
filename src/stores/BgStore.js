import { defineStore } from "pinia";

export const useBgStore = defineStore("BgStore", {
  state: () => ({
    section: 1,
    actVid: "/src/assets/vid/general.mp4",
    vidHome: "/src/assets/vid/general.mp4",
    vidAboutUs: "/src/assets/vid/sobrenos.mp4",
  }),
  actions: {
    changeSection(newSection) {
      console.log("section: " + newSection);
      if (newSection == "GastroGaratxe") {
        this.section = 1;
        this.actVid = "/src/assets/vid/general.mp4";
      } else if (newSection == "Sobre nosotros") {
        this.section = 2;
        this.actVid = "/src/assets/vid/sobrenos.mp4";
      } else if (newSection == "Historia") {
        this.section = 3;
        this.actVid = "/src/assets/vid/hist.mp4";
      } else if (newSection == "Menu") {
        this.section = 4;
      } else if (newSection == "Reservar") {
        this.section = 5;
      }
      console.log(this.section);
      console.log(this.actVid);
    },
  },
});
