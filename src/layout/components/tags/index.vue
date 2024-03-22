<script setup>
import { watch, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTagsStore } from '~/store/modules/tags';
import { useMenuStore } from '~/store/modules/menu';

const tags = useTagsStore();
const menu = useMenuStore();
const route = useRoute();
const router = useRouter();
const show = ref(false);
const x = ref(0);
const y = ref(0);
const currentTag = ref({});
const canDelete = ref(true);
watch(route, () => {
  setTags(route);
});

watchEffect(() => {
  canDelete.value = tags.list.length > 1;
});

const options = [
  {
    label: '关闭其他标签',
    key: 0
  },
  {
    label: '关闭所有标签',
    key: 1
  }
];

const handleContextMenu = (e, item) => {
  e.preventDefault();
  nextTick(() => {
    x.value = e.clientX;
    y.value = e.clientY;
    show.value = true;
    currentTag.value = { ...item };
  });
};

const handleSelect = async (e) => {
  if (e === 1) {
    // 关闭全部标签
    tags.closeAllTags();
    await router.push('/');
    setTags(route);
    menu.setSelectedKey('workbench');
  } else {
    // 关闭其他标签
    const current = tags.list.filter(
      (item) => item.path === currentTag.value.path
    );
    tags.closeOtherTags(current);
    await router.push(currentTag.value.path);
    menu.setSelectedKey(currentTag.value.name);
  }
  show.value = false;
};

const handleClose = (path) => {
  const index = tags.list.findIndex((i) => i.path === path);
  let url = '';
  let name = '';
  // 如果前一个标签存在，切换到前一个标签
  if (tags.list[index - 1]) {
    url = tags.list[index - 1].path;
    name = tags.list[index - 1].name;
  } else if (tags.list[index + 1]) {
    // 如果后一个标签存在，切换到后一个标签
    url = tags.list[index + 1].path;
    name = tags.list[index + 1].name;
  }
  router.replace(url);
  menu.setSelectedKey(name);
  tags.deleteTag(path);
  // const item = tags.list[index] ? tags.list[index] : tags.list[index - 1];
  // if (item) {
  //   router.push(item.path);
  // } else {
  //   router.replace('/');
  // }
};

const onClickoutside = () => {
  show.value = false;
};

const changeTab = (route) => {
  const { name, path } = route;
  router.push(path);
  menu.setSelectedKey(name);
};

const setTags = (route) => {
  const isExist = tags.list.some((item) => item.path === route.fullPath);
  if (!isExist) {
    tags.addTag({
      name: route.name,
      title: route.meta.title,
      path: route.fullPath
    });
  }
};
setTags(route);
</script>
<template>
  <div class="backdrop-blur-sm mb-20px">
    <n-scrollbar x-scrollable>
      <n-space class="flex-nowrap!">
        <n-tag
          :closable="canDelete"
          v-for="item in tags.list"
          :key="item.path"
          :type="item.path === route.fullPath ? 'primary' : 'default'"
          @contextmenu="(e) => handleContextMenu(e, item)"
          @click="changeTab(item)"
          @close="() => handleClose(item.path)"
        >
          {{ $t(`route.${item.title}`) }}
        </n-tag>
      </n-space>
    </n-scrollbar>
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :options="options"
      :show="show"
      :x="x"
      :y="y"
      :on-clickoutside="onClickoutside"
      @select="handleSelect"
    />
  </div>
</template>
