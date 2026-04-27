// 元数据解析模块
// 从文件路径约定推导组件元数据（保持懒加载，无硬编码）

import { groups, tags, componentMeta } from './views/maps/config'

export interface DemoMeta {
  name: string
  group: string
  tag: string
  icon: string
  desc: string
  path: string
  importFn: () => Promise<any>
}

export interface DemoGroup {
  id: string
  name: string
  icon: string
  items: DemoMeta[]
}

// 从配置构建查找表
const groupMap = Object.fromEntries(groups.map(g => [g.id, g]))
const tagMap = Object.fromEntries(tags.map(t => [t.id, t]))

// 从文件路径解析组件元数据
// ./views/maps/basic/leaflet/index.vue -> /basic/leaflet
function parseComponentPath(filePath: string) {
  const parts = filePath.split('/')
  const mapsIndex = parts.indexOf('maps')
  if (mapsIndex === -1) return null

  const afterMaps = parts.slice(mapsIndex + 1)
  const group = afterMaps[0]
  const subFolder = afterMaps[1]
  const fileName = afterMaps[2]?.replace('.vue', '')

  if (!group || !subFolder) return null

  const tagId = subFolder.toLowerCase()
  const tagConf = tagMap[tagId] || { icon: 'Location', label: subFolder }
  const meta = componentMeta[subFolder] || { name: subFolder, desc: `${subFolder} 演示` }

  return {
    name: meta.name,
    group,
    tag: tagConf.label,
    icon: tagConf.icon,
    desc: meta.desc,
    path: `/${group}/${fileName === 'index' ? subFolder : fileName}`
  }
}

// Vite glob: 懒加载组件（不 eager，保持代码分割）
const moduleImports = import.meta.glob('./views/maps/**/index.vue')

export function getDemoRoutes() {
  const routes: Array<{
    path: string
    name: string
    component: () => Promise<any>
    meta: { fullscreen: boolean; group: string }
  }> = []

  for (const [path, importFn] of Object.entries(moduleImports)) {
    const meta = parseComponentPath(path)
    if (meta) {
      routes.push({
        path: meta.path,
        name: meta.name,
        component: importFn,
        meta: { fullscreen: true, group: meta.group }
      })
    }
  }

  return routes
}

export function getDemoGroups(): DemoGroup[] {
  const demos: DemoMeta[] = []

  for (const [path, importFn] of Object.entries(moduleImports)) {
    const meta = parseComponentPath(path)
    if (meta) {
      demos.push({
        name: meta.name,
        group: meta.group,
        tag: meta.tag,
        icon: meta.icon,
        desc: meta.desc,
        path: meta.path,
        importFn
      })
    }
  }

  // 按分组聚合
  const grouped: Record<string, DemoMeta[]> = {}
  for (const demo of demos) {
    if (!grouped[demo.group]) grouped[demo.group] = []
    grouped[demo.group].push(demo)
  }

  return Object.entries(grouped).map(([id, items]) => ({
    id,
    name: groupMap[id]?.name || id,
    icon: groupMap[id]?.icon || 'Folder',
    items
  }))
}
