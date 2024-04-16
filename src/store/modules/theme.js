import { defineStore } from 'pinia';

export const useThemeStore = defineStore(
  'theme',
  () => {
    const dark = ref(false);
    const themeOverrides = ref({
      common: {
        primaryColor: '#6181FF',
        primaryColorHover: '#6181FF'
      }
    });

    const toggleDark = () => {
      dark.value = !dark.value;
    };

    const setDark = (isDark) => {
      dark.value = isDark;
    };

    const setTheme = (theme) => {
      themeOverrides.value = { ...theme };
    };

    watch(themeOverrides.value, (newVal) => {
      themeOverrides.value.common.primaryColorHover =
        newVal.common.primaryColor;
    });

    return {
      dark,
      themeOverrides,
      toggleDark,
      setDark,
      setTheme
    };
  },
  {
    persist: true
    // state: () => ({
    //   dark: false,
    //   themeOverrides: {
    //     common: {
    //       primaryColor: '#6181FF',
    //       primaryColorHover: '#6181FF'
    //     }
    //   }
    // }),
    // actions: {
    //   toggleDark() {
    //     this.dark = !this.dark;
    //   },
    //   setDark(isDark) {
    //     this.dark = isDark;
    //   },
    //   setTheme(theme) {
    //     this.themeOverrides = { ...theme };
    //   }
    // }
  }
);
