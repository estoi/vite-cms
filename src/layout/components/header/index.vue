<script setup>
import { useRouter } from 'vue-router';
import { Icon } from '@vicons/utils';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined
} from '@vicons/antd';
import { Wind } from '@vicons/fa';
import {
  DarkModeOutlined,
  LightModeOutlined,
  TranslateOutlined,
  ColorLensOutlined
} from '@vicons/material';
import { useI18n } from 'vue-i18n';
import { useSidebarStore } from '~/store/modules/sidebar';
import { useThemeStore } from '~/store/modules/theme';
import { useLocaleStore } from '~/store/modules/locale';
import { useTagsStore } from '~/store/modules/tags';
import { useMenuStore } from '~/store/modules/menu';
import { langs } from '~/locales';
import vTags from '../tags/index.vue';

const router = useRouter();
const { t } = useI18n();
const sidebar = useSidebarStore();
const theme = useThemeStore();
const locale = useLocaleStore();
const tags = useTagsStore();
const menu = useMenuStore();
const settings = [
  {
    label: () => h('p', null, { default: () => t('common.profile') }),
    key: 0,
    icon: () =>
      h(Icon, null, {
        default: () => h(UserOutlined)
      })
  },
  {
    label: () => h('p', null, { default: () => t('common.logout') }),
    key: 1,
    icon: () =>
      h(Icon, null, {
        default: () => h(LogoutOutlined)
      })
  }
];

const items = Array.from({ length: 100 }, (_, i) => ({
  key: i,
  value: i,
  title: '这是一条消息'
}));

const toggleDark = () => {
  theme.toggleDark();
};

const handleSelect = (e) => {
  if (e === 0) {
  } else {
    tags.closeAllTags();
    menu.setSelectedKey('workbench');
    theme.setDark(false);
    router.replace('/login');
  }
};
</script>
<template>
  <n-layout-header
    bordered
    class="layout-header backdrop-blur-sm h-64px! flex flex-items-center justify-between"
  >
    <div class="logo text-lg w-240px flex flex-items-center justify-center">
      Windy Admin
    </div>
    <div class="menu-bar flex flex-items-center justify-between flex-1">
      <div class="inline-flex items-center h-full text-xl">
        <Icon size="20px" class="cursor-pointer" @click="sidebar.toggleSidebar">
          <MenuUnfoldOutlined v-if="sidebar.collapsed"></MenuUnfoldOutlined>
          <MenuFoldOutlined v-else></MenuFoldOutlined>
        </Icon>
      </div>
      <n-divider vertical />
      <v-tags class="max-w-60vw mx-10"></v-tags>
      <n-divider vertical />
      <div class="flex items-center pr-4 ml-auto">
        <n-space>
          <n-button quaternary circle @click="toggleDark">
            <n-icon size="20px">
              <LightModeOutlined v-if="theme.dark"></LightModeOutlined>
              <DarkModeOutlined v-else></DarkModeOutlined>
            </n-icon>
          </n-button>
          <n-popover
            content-class="h-100px flex flex-items-center"
            :width="200"
            trigger="click"
          >
            <template #trigger>
              <n-button quaternary circle>
                <n-icon size="20px">
                  <ColorLensOutlined></ColorLensOutlined>
                </n-icon>
              </n-button>
            </template>
            <template #default>
              <n-color-picker
                v-model:value="theme.themeOverrides.common.primaryColor"
                :mode="['hex']"
                :show-alpha="false"
                :swatches="[
                  '#6181FF',
                  '#D9138A',
                  '#12A4D9',
                  '#4203C9',
                  '#6883BC',
                  '#77C593'
                ]"
              />
            </template>
          </n-popover>
          <n-popover :width="300" trigger="click">
            <template #trigger>
              <n-badge dot :offset="[-5, 10]">
                <n-button quaternary circle>
                  <n-icon size="20px">
                    <BellOutlined></BellOutlined>
                  </n-icon>
                </n-button>
              </n-badge>
            </template>
            <n-tabs
              justify-content="center"
              :bar-width="150"
              type="line"
              animated
              placement="top"
            >
              <n-tab-pane name="message">
                <template #tab>
                  <n-badge :max="99" :value="1000" :offset="[5, -5]">
                    {{ $t(`common.message`) }}</n-badge
                  >
                </template>
                <n-virtual-list
                  class="max-h-300px"
                  :item-size="42"
                  :items="items"
                >
                  <template #default="{ item }">
                    <div>
                      <div class="h-full flex flex-items-center">
                        <n-tag size="small" :bordered="false" type="primary">
                          {{ $t(`common.unread`) }}
                        </n-tag>
                        <h1 class="ml-10px">{{ item.title }}</h1>
                      </div>
                      <p class="color-gray">消息内容</p>
                      <n-divider />
                    </div>
                  </template>
                </n-virtual-list>
              </n-tab-pane>
              <n-tab-pane name="notice">
                <template #tab>
                  <n-badge :value="1" :offset="[5, -5]">{{
                    $t(`common.notice`)
                  }}</n-badge>
                </template>
                <n-virtual-list
                  class="max-h-300px"
                  :item-size="42"
                  :items="items"
                >
                  <template #default="{ item }">
                    <div>
                      <div class="h-full flex flex-items-center">
                        <n-tag size="small" :bordered="false">
                          {{ $t(`common.read`) }}
                        </n-tag>
                        <h1 class="ml-10px">{{ item.title }}</h1>
                      </div>
                      <p class="color-gray">消息内容</p>
                      <n-divider />
                    </div>
                  </template>
                </n-virtual-list>
              </n-tab-pane>
            </n-tabs>
          </n-popover>
          <n-popselect
            v-model:value="locale.locale"
            :options="langs"
            label-field="title"
            trigger="click"
            @update:value="(v) => locale.setLocale(v)"
          >
            <n-button quaternary circle>
              <n-icon size="20px">
                <TranslateOutlined />
              </n-icon>
            </n-button>
          </n-popselect>
          <n-dropdown
            trigger="hover"
            :options="settings"
            @select="handleSelect"
          >
            <n-button quaternary circle>
              <n-icon size="20px">
                <Wind />
              </n-icon>
            </n-button>
          </n-dropdown>
        </n-space>
      </div>
    </div>
  </n-layout-header>
</template>
