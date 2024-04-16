<script setup>
import {
  zhCN,
  dateZhCN,
  enUS,
  dateEnUS,
  darkTheme,
  createDiscreteApi
} from 'naive-ui';
import { useThemeStore } from '~/store/modules/theme';
import { useLocaleStore } from '~/store/modules/locale';
import router from '~/router';

const theme = useThemeStore();
const locale = useLocaleStore();
// const loadingBar = useLoadingBar();

// i18n
const locales = {
  zh: [zhCN, dateZhCN],
  en: [enUS, dateEnUS]
};

const { loadingBar } = createDiscreteApi(['loadingBar'], {
  loadingBarProviderProps: {
    themeOverrides: {
      colorLoading: '#6181FF',
      height: '3px'
    }
  }
});

router.beforeEach((to, from) => {
  loadingBar.start();
});

router.afterEach(() => {
  loadingBar.finish();
});
</script>
<template>
  <n-config-provider
    :locale="locales[locale.locale][0]"
    :date-locale="locales[locale.locale][1]"
    :theme="theme.dark ? darkTheme : null"
    :theme-overrides="theme.themeOverrides"
  >
    <router-view></router-view>
  </n-config-provider>
</template>

<style scoped></style>
