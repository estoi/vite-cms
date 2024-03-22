import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('sidebar', {
  persist: true,
  state: () => ({
    // 菜单折叠状态
    collapsed: false
  }),
  actions: {
    // 切换菜单折叠状态
    toggleSidebar() {
      this.collapsed = !this.collapsed;
    }
  }
});
