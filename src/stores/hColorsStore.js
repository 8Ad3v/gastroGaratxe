import { defineStore } from "pinia";

export const useColorStore = defineStore("ColorStore", {
  state: () => ({
    textColor: "#000000", // Valor predeterminado para el texto
    backgroundColor: "#f0f0f0", // Valor predeterminado para el fondo
  }),
  actions: {
    // Método para cambiar los colores
    changeColors(newTextColor, newBackgroundColor) {
      console.log("changingColors");
      this.textColor = newTextColor;
      this.backgroundColor = newBackgroundColor;

      // Actualiza las variables CSS globalmente
      document.documentElement.style.setProperty(
        "--text-color",
        this.textColor
      );
      document.documentElement.style.setProperty(
        "--background-color",
        this.backgroundColor
      );
    },
  },
});
