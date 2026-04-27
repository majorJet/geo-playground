<template>
  <div class="fullscreen-map">
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// 修复 Leaflet 默认图标路径问题
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
})

const mapContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!mapContainer.value) return

  const map = L.map(mapContainer.value).setView([39.9042, 116.4074], 10)

  // 使用高德地图瓦片 (国内访问速度快)
  L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    maxZoom: 18,
    subdomains: ['1', '2', '3', '4'],
    attribution: '© 高德地图'
  }).addTo(map)

  L.marker([39.9042, 116.4074]).addTo(map)
    .bindPopup('这是一个 Leaflet 标记!')
    .openPopup()

  L.circle([39.908, 116.397], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
  }).addTo(map)

  L.polygon([
    [39.909, 116.38],
    [39.903, 116.36],
    [39.91, 116.347]
  ]).addTo(map)
})
</script>

<style scoped>
.fullscreen-map {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.map-container {
  width: 100%;
  height: 100%;
}
</style>
