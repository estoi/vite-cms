import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  persist: true,
  state: () => ({
    dark: false
  }),
  actions: {
    toggleDark() {
      this.dark = !this.dark;
    },
    setTheme(isDark) {
      this.dark = isDark;
    }
  }
});
