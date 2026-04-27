<template>
  <div class="home-container">
    <div class="home-header">
      <h1>Web GIS Playground</h1>
      <p>选择下方卡片开始体验地图演示</p>
    </div>
    
    <div v-for="group in demoGroups" :key="group.id" class="demo-section">
      <h3 class="section-title">
        <el-icon><component :is="group.icon" /></el-icon>
        {{ group.name }}
      </h3>
      <div class="card-grid">
        <el-card
          v-for="item in group.items"
          :key="item.path"
          class="map-card"
          shadow="hover"
          @click="navigateTo(item.path)"
        >
          <div class="card-content">
            <div class="card-icon">
              <el-icon :size="48"><component :is="item.icon" /></el-icon>
            </div>
            <h4>{{ item.name }}</h4>
            <p>{{ item.desc }}</p>
            <el-tag size="small" type="primary">{{ item.tag }}</el-tag>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getDemoGroups } from '../parseMeta'

const router = useRouter()
const demoGroups = computed(() => getDemoGroups())

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.home-container {
  height: 100%;
  overflow-y: auto;
  padding: 40px;
  background-color: #f5f7fa;
}

.home-header {
  text-align: center;
  margin-bottom: 40px;
}

.home-header h1 {
  font-size: 32px;
  color: #303133;
  margin-bottom: 8px;
}

.home-header p {
  font-size: 14px;
  color: #909399;
}

.demo-section {
  margin-bottom: 40px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  color: #303133;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #409eff;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.map-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.map-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-content {
  text-align: center;
  padding: 24px 16px;
}

.card-icon {
  color: #409eff;
  margin-bottom: 16px;
}

.card-content h4 {
  margin: 12px 0 8px;
  font-size: 18px;
  color: #303133;
}

.card-content p {
  color: #909399;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
  min-height: 44px;
}
</style>
