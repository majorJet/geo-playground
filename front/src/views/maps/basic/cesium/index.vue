<template>
  <div class="fullscreen-map">
    <div ref="cesiumContainer" class="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Viewer, Cartesian3, Color, LabelStyle, VerticalOrigin } from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

const cesiumContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!cesiumContainer.value) return

  const viewer = new Viewer(cesiumContainer.value, {
    animation: false,
    timeline: false,
    baseLayerPicker: true
  })

  viewer.entities.add({
    name: '中国中心点',
    position: Cartesian3.fromDegrees(104.994, 35.0, 0),
    point: {
      pixelSize: 10,
      color: Color.RED,
      outlineColor: Color.WHITE,
      outlineWidth: 2
    },
    label: {
      text: '中国',
      font: '14px sans-serif',
      fillColor: Color.WHITE,
      outlineColor: Color.BLACK,
      outlineWidth: 2,
      style: LabelStyle.FILL_AND_OUTLINE,
      verticalOrigin: VerticalOrigin.BOTTOM,
      pixelOffset: new Cartesian3(0, -15)
    }
  })

  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(104.994, 35.0, 15000000)
  })
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
