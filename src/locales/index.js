import { createI18n } from 'vue-i18n';
import { useNavigatorLanguage } from '@vueuse/core';
import zh from './zh.json';
import en from './en.json';
let currentLanguage = useNavigatorLanguage().language.value.replace(
  /-(\S*)/,
  ''
);
let localLocale = localStorage.getItem('locale') || '';
if (localLocale) {
  currentLanguage = JSON.parse(localLocale)?.locale;
}

export default createI18n({
  locale: currentLanguage,
  legacy: false,
  globalInjection: true,
  messages: {
    zh,
    en
  }
});

export const langs = [
  {
    value: 'zh',
    title: '中文'
  },
  {
    value: 'en',
    title: 'English'
  }
];
