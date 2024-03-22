import { defineStore } from 'pinia';

export const useTagsStore = defineStore(
  'tags',
  () => {
    // 标签列表
    let list = ref([]);
    let show = computed(() => list.value.length > 0);
    let nameList = computed(() => list.value.map((item) => item.name));

    const deleteTag = (flag) => {
      list.value = list.value.filter((i) => i.path !== flag);
    };

    const addTag = (tag) => {
      list.value.push(tag);
    };

    const closeAllTags = () => {
      list.value = [];
    };

    const closeOtherTags = (tag) => {
      list.value = tag;
    };

    return {
      list,
      show,
      nameList,
      deleteTag,
      addTag,
      closeAllTags,
      closeOtherTags
    };
  },
  {
    persist: {
      storage: sessionStorage
    }
  }
);
