# Geo Playground

一个用于测试 Web GIS 各种技术和应用实现的**玩具项目**。每个技术点或应用点被制作为一个独立的 Vue 组件进行展示。

## 技术栈

- **框架**: Vue 3 + TypeScript + Vite (ESM)
- **UI 库**: Element Plus
- **地图库**: Leaflet · MapLibre GL · Cesium

## 项目结构

```
front/
├── src/
│   ├── main.ts                  # 入口，全局注册 Element Plus
│   ├── App.vue                  # 根组件：全局侧边栏 + router-view
│   ├── router.ts                # 路由配置（自动扫描 maps 目录）
│   ├── parseMeta.ts             # 元数据解析模块
│   └── views/
│       ├── Home.vue             # 首页：演示组件卡片展示
│       └── maps/                # 🗺️ 所有地图演示组件
│           └── basic/           #    分组：基础地图演示
│               ├── leaflet/     #       子分类：Leaflet 框架
│               │   └── index.vue
│               ├── maplibre/    #       子分类：MapLibre 框架
│               │   └── index.vue
│               └── cesium/      #       子分类：Cesium 框架
│                   └── index.vue
```

## 约定：新增演示组件

### 方式一：已有分组和框架

只需在对应分组和框架文件夹下创建 `index.vue`：

```
src/views/maps/
└── basic/              ← 已有分组
    └── openlayers/     ← 新框架
        └── index.vue   ← 新组件
```

然后在 `src/views/maps/config.ts` 中添加配置：

```typescript
// 添加分组（如需）
export const groups = [
  // ... 现有分组
  { id: 'new-group', name: '新分组', icon: 'Star' }
]

// 添加框架标签（如需）
export const tags = [
  // ... 现有标签
  { id: 'openlayers', label: 'OpenLayers', icon: 'Map' }
]

// 添加组件元数据
export const componentMeta = {
  // ... 现有组件
  openlayers: {
    name: 'OpenLayers 地图',
    desc: 'OpenLayers 地图演示'
  }
}
```

### 方式二：全新分组 + 新框架

1. 创建文件夹：`src/views/maps/新分组/新框架/index.vue`
2. 在 `config.ts` 中添加分组、标签、组件元数据

### 元数据字段说明

| 字段 | 位置 | 说明 |
|------|------|------|
| `groups[].id` | config.ts | 分组标识（对应文件夹名） |
| `groups[].name` | config.ts | 分组显示名称 |
| `groups[].icon` | config.ts | Element Plus 图标名 |
| `tags[].id` | config.ts | 框架标识（对应子文件夹名） |
| `tags[].label` | config.ts | 框架显示名称（Tag） |
| `tags[].icon` | config.ts | 框架图标 |
| `componentMeta[].name` | config.ts | 组件显示名称 |
| `componentMeta[].desc` | config.ts | 组件描述 |

## 快速开始

```bash
npm install
npm run dev       # 开发服务器
npm run build     # 生产构建
npm run preview   # 预览构建产物
```

## 当前演示组件

| 分组 | 组件 | 路由 | 标签 |
|------|------|------|------|
| 基础地图演示 | Leaflet | `/basic/leaflet` | Leaflet |
| 基础地图演示 | MapLibre | `/basic/maplibre` | MapLibre |
| 基础地图演示 | Cesium | `/basic/cesium` | Cesium |
