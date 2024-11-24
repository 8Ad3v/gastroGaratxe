import { defineStore } from "pinia";

export const useMenuStore = defineStore("menuStore", {
  state: () => ({
    isFullMenuDisplayed: false,
    isInHomePage: true,
  }),
  actions: {
    toggleMenu() {
      this.isFullMenuDisplayed = true;
    },
  },
});
