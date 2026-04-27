// 地图演示组件配置文件
// 新增分组或组件时修改此文件

// 分组配置
export interface GroupConfig {
  id: string
  name: string
  icon: string
}

export const groups: GroupConfig[] = [
  { id: 'basic', name: '基础地图演示', icon: 'Location' },
  { id: 'visualization', name: '可视化', icon: 'Picture' },
  { id: 'analysis', name: '空间分析', icon: 'Tools' },
  { id: 'advanced', name: '高级功能', icon: 'Monitor' }
]

// 框架标签配置
export interface TagConfig {
  id: string
  label: string
  icon: string
}

export const tags: TagConfig[] = [
  { id: 'leaflet', label: 'Leaflet', icon: 'MapLocation' },
  { id: 'maplibre', label: 'MapLibre', icon: 'Grid' },
  { id: 'cesium', label: 'Cesium', icon: 'View' }
]

// 组件元数据配置
// 键：子文件夹名，值：显示名和描述
export const componentMeta: Record<string, { name: string; desc: string }> = {
  leaflet: {
    name: 'Leaflet 地图',
    desc: '轻量级 2D 地图，支持标记、圆形、多边形等基础功能'
  },
  maplibre: {
    name: 'MapLibre GL',
    desc: '高性能 WebGL 矢量/栅格地图，支持交互式地图功能'
  },
  cesium: {
    name: 'Cesium 3D',
    desc: '3D 地球与地形可视化，支持实体标注与相机飞行'
  }
}
