import { defineStore } from 'pinia';
import i18n from '~/locales';

export const useLocaleStore = defineStore(
  'locale',
  () => {
    // 当前语言
    let locale = ref(i18n.global.locale.value);
    let currentLocale = computed(() => locale);

    // 设置语言
    const setLocale = (lang) => {
      locale.value = lang;
      i18n.global.locale.value = lang;
    };

    return { locale, currentLocale, setLocale };
  },
  {
    persist: true
  }
);
