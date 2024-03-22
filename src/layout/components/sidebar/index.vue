<script setup>
import { NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';
import VueI18n from 'vue-i18n';
import router from '~/router';
import { useSidebarStore } from '~/store/modules/sidebar';
import { useMenuStore } from '~/store/modules/menu';
import { useTagsStore } from '~/store/modules/tags';

const options = router.options.routes
  .filter((r) => !r.hidden)
  .sort((a, b) => (a?.meta?.sort || 0) - (b?.meta?.sort || 0));
const sidebar = useSidebarStore();
const menu = useMenuStore();
const tags = useTagsStore();

const menuOptions = ref();
const { t } = VueI18n.useI18n();

const traverseTree = (tree) => {
  for (let i in tree) {
    if (tree[i].children) {
      tree[i].title = () =>
        h('p', {}, { default: () => t(`route.${tree[i].meta.title}`) });
    } else {
      tree[i].title = () =>
        h(
          RouterLink,
          {
            to: {
              name: tree[i].name
            }
          },
          { default: () => t(`route.${tree[i].meta.title}`) }
        );
    }
    tree[i].meta.icon &&
      (tree[i].icon = () =>
        h(NIcon, null, { default: () => h(tree[i].meta.icon) }));
    if (tree[i].children) {
      traverseTree(tree[i].children);
    }
  }
  menuOptions.value = [...tree];
};
traverseTree(options);
</script>
<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="50"
    :width="240"
    :collapsed="sidebar.collapsed"
  >
    <n-menu
      :options="menuOptions"
      key-field="name"
      label-field="title"
      v-model:value="menu.selectedKey"
      @update:value="(key) => menu.setSelectedKey(key)"
    >
    </n-menu>
  </n-layout-sider>
</template>
