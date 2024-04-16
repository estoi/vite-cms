<script setup>
import { useTagsStore } from '~/store/modules/tags';
import vHeader from './components/header/index.vue';
import vSidebar from './components/sidebar/index.vue';

const tags = useTagsStore();
</script>
<template>
  <n-layout position="absolute">
    <v-header></v-header>
    <n-layout has-sider position="absolute" class="top-64px!">
      <v-sidebar></v-sidebar>
      <n-layout-content class="main-content p20px" :native-scrollbar="false">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tags.nameList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
