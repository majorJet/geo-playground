<template>
  <div class="app-container">
    <!-- 全局侧边栏（始终显示，默认收缩） -->
    <aside :class="['global-sidebar', { expanded: isSidebarExpanded }]">
      <div class="sidebar-header">
        <el-button
          :icon="isSidebarExpanded ? Fold : Expand"
          circle
          size="small"
          @click="isSidebarExpanded = !isSidebarExpanded"
          class="toggle-btn"
        />
      </div>

      <el-menu
        :default-active="activeMenu"
        :collapse="!isSidebarExpanded"
        :collapse-transition="false"
        @select="handleMenuSelect"
        class="sidebar-menu"
      >
        <el-menu-item index="/" class="home-menu-item">
          <el-icon><HomeFilled /></el-icon>
          <template #title>首页</template>
        </el-menu-item>

        <el-sub-menu v-for="group in demoGroups" :key="group.id" :index="group.id">
          <template #title>
            <el-icon><component :is="group.icon" /></el-icon>
            <span>{{ group.name }}</span>
          </template>
          <el-menu-item
            v-for="item in group.items"
            :key="item.path"
            :index="item.path"
            :title="group.name"
          >
            <span class="menu-item-text">{{ item.name }}</span>
            <el-tag v-if="item.tag" size="small" class="menu-tag">{{ item.tag }}</el-tag>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </aside>

    <!-- 主内容区 -->
    <main :class="['main-content', { 'has-sidebar': true }]">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Fold, Expand, HomeFilled } from '@element-plus/icons-vue'
import { getDemoGroups } from './parseMeta'

const router = useRouter()
const route = useRoute()
const isSidebarExpanded = ref(false)
const demoGroups = computed(() => getDemoGroups())

// 当前激活的菜单项
const activeMenu = computed(() => route.path)

const goHome = () => {
  router.push('/')
}

const handleMenuSelect = (index: string) => {
  router.push(index)
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f5f5f5;
}

#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.app-container {
  display: flex;
  width: 100%;
  height: 100vh;
}

.global-sidebar {
  width: 64px;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: width 0.3s;
  flex-shrink: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.global-sidebar.expanded {
  width: 220px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 8px;
  padding-left:22px;
  border-bottom: 1px solid #ebeef5;
}

.home-menu-item {
  display: flex;
  align-items: center;
  padding: 0 12px;
  margin-bottom: 4px;
}

.toggle-btn {
  flex-shrink: 0;
}

.sidebar-menu {
  flex: 1;
  overflow-y: auto;
  border-right: none;
}

.menu-item-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.menu-tag {
  margin-left: 8px;
  flex-shrink: 0;
}

.main-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}
</style>
