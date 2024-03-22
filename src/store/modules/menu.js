import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  persist: true,
  state: () => ({
    // 当前激活菜单
    selectedKey: 'workbench'
  }),
  actions: {
    // 设置激活菜单
    setSelectedKey(key) {
      this.selectedKey = key;
    }
  }
});
