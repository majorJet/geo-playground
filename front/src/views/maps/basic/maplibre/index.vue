<template>
  <div class="fullscreen-map">
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const mapContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!mapContainer.value) return

  const map = new maplibregl.Map({
    container: mapContainer.value,
    style: {
      version: 8,
      name: 'Demo Style',
      sources: {
        'gaode-tiles': {
          type: 'raster',
          tiles: [
            'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
            'https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
            'https://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
            'https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
          ],
          tileSize: 256,
          attribution: '© 高德地图'
        }
      },
      layers: [
        {
          id: 'gaode-tiles',
          type: 'raster',
          source: 'gaode-tiles'
        }
      ]
    },
    center: [116.4074, 39.9042],
    zoom: 10
  })

  map.addControl(new maplibregl.NavigationControl(), 'top-right')

  new maplibregl.Marker()
    .setLngLat([116.4074, 39.9042])
    .setPopup(new maplibregl.Popup().setHTML('<h3>这是一个 MapLibre 标记!</h3>'))
    .addTo(map)
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
