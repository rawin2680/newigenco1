<script setup lang="ts">
import * as THREE from 'three'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RotateCw, Eye, Sparkles } from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const { isDark } = useTheme()

const isWireframe = ref(false)
const isAutoRotate = ref(true)
const activeProductModel = ref<'core' | 'sensor' | 'energy'>('core')

let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let mesh: THREE.Mesh | null = null
let innerMesh: THREE.Mesh | null = null
let animationId: number | null = null

let isDragging = false
let previousMousePosition = { x: 0, y: 0 }

const createGeometry = (type: 'core' | 'sensor' | 'energy') => {
  if (type === 'core') {
    return new THREE.IcosahedronGeometry(1.6, 2)
  } else if (type === 'sensor') {
    return new THREE.CylinderGeometry(1.2, 1.4, 2.2, 32)
  } else {
    return new THREE.TorusGeometry(1.5, 0.45, 24, 60)
  }
}

const updateModel = (type: 'core' | 'sensor' | 'energy') => {
  activeProductModel.value = type
  if (!mesh || !innerMesh || !scene) return

  mesh.geometry.dispose()
  mesh.geometry = createGeometry(type)

  innerMesh.geometry.dispose()
  if (type === 'core') {
    innerMesh.geometry = new THREE.OctahedronGeometry(1.0, 1)
  } else if (type === 'sensor') {
    innerMesh.geometry = new THREE.CylinderGeometry(0.7, 0.7, 2.4, 16)
  } else {
    innerMesh.geometry = new THREE.SphereGeometry(0.8, 24, 24)
  }
}

const toggleWireframe = () => {
  isWireframe.value = !isWireframe.value
  if (!mesh || !innerMesh) return
  ;(mesh.material as THREE.MeshPhysicalMaterial).wireframe = isWireframe.value
  ;(innerMesh.material as THREE.MeshBasicMaterial).wireframe = isWireframe.value
}

onMounted(() => {
  if (!import.meta.client || !canvasRef.value) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, canvasRef.value.clientWidth / canvasRef.value.clientHeight, 0.1, 100)
  camera.position.set(0, 0, 5.5)

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true
  })
  renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
  scene.add(ambientLight)

  const pointLight1 = new THREE.PointLight(0x00ff88, 3.5, 10)
  pointLight1.position.set(4, 4, 4)
  scene.add(pointLight1)

  const pointLight2 = new THREE.PointLight(0x00c864, 2.5, 10)
  pointLight2.position.set(-4, -4, 2)
  scene.add(pointLight2)

  // Outer Holographic Shell
  const outerMat = new THREE.MeshPhysicalMaterial({
    color: 0x00c864,
    metalness: 0.25,
    roughness: 0.15,
    transmission: 0.65,
    thickness: 1.2,
    wireframe: isWireframe.value,
    clearcoat: 1.0
  })
  mesh = new THREE.Mesh(createGeometry('core'), outerMat)
  scene.add(mesh)

  // Inner Glowing Core
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x00ff88,
    wireframe: true
  })
  innerMesh = new THREE.Mesh(new THREE.OctahedronGeometry(1.0, 1), innerMat)
  scene.add(innerMesh)

  // Mouse drag interaction
  const dom = canvasRef.value
  dom.addEventListener('mousedown', (e) => {
    isDragging = true
    previousMousePosition = { x: e.clientX, y: e.clientY }
  })

  window.addEventListener('mouseup', () => {
    isDragging = false
  })

  dom.addEventListener('mousemove', (e) => {
    if (!isDragging || !mesh || !innerMesh) return
    const deltaX = e.clientX - previousMousePosition.x
    const deltaY = e.clientY - previousMousePosition.y

    mesh.rotation.y += deltaX * 0.015
    mesh.rotation.x += deltaY * 0.015
    innerMesh.rotation.y -= deltaX * 0.015
    innerMesh.rotation.x -= deltaY * 0.015

    previousMousePosition = { x: e.clientX, y: e.clientY }
  })

  // Animation Loop
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    if (!renderer || !scene || !camera || !mesh || !innerMesh) return

    if (isAutoRotate.value && !isDragging) {
      mesh.rotation.y += 0.008
      mesh.rotation.x += 0.004
      innerMesh.rotation.y -= 0.012
      innerMesh.rotation.z += 0.006
    }

    renderer.render(scene, camera)
  }
  animate()
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (renderer) renderer.dispose()
})
</script>

<template>
  <div class="spatial-glass rounded-3xl p-6 sm:p-8 border border-current/10 relative overflow-hidden flex flex-col justify-between">
    <!-- Header of 3D Canvas -->
    <div class="flex items-center justify-between gap-4 z-10">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-[#00C864] dark:bg-[#00FF88] animate-ping" />
        <span class="font-mono text-xs font-bold uppercase tracking-wider text-[#00C864] dark:text-[#00FF88]">
          3D IMMERSIVE VIEWER // โครงสร้างจำลอง 3 มิติ
        </span>
      </div>
      <div class="text-[11px] font-mono opacity-60 hidden sm:block">
        [ คลิกค้างแล้วลากเพื่อหมุนวัตถุ 360° ]
      </div>
    </div>

    <!-- 3D Canvas -->
    <div class="relative w-full h-[280px] sm:h-[340px] my-4 cursor-grab active:cursor-grabbing flex items-center justify-center">
      <canvas ref="canvasRef" class="w-full h-full" />
      <div class="absolute bottom-2 left-2 text-[10px] font-mono opacity-50 pointer-events-none">
        RENDER: THREE.JS // WEBGL 60FPS
      </div>
    </div>

    <!-- Controls & Product Model Switcher -->
    <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-current/10 z-10">
      <!-- Select Model -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all',
            activeProductModel === 'core'
              ? 'bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806]'
              : 'border border-current/20 hover:border-[#00C864]'
          ]"
          @click="updateModel('core')"
        >
          AI Core Model
        </button>
        <button
          type="button"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all',
            activeProductModel === 'sensor'
              ? 'bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806]'
              : 'border border-current/20 hover:border-[#00C864]'
          ]"
          @click="updateModel('sensor')"
        >
          IoT Sensor Hub
        </button>
        <button
          type="button"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all',
            activeProductModel === 'energy'
              ? 'bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806]'
              : 'border border-current/20 hover:border-[#00C864]'
          ]"
          @click="updateModel('energy')"
        >
          Bio-Grid Loop
        </button>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg border border-current/20 hover:bg-[#00C864]/10 text-xs font-mono flex items-center gap-1.5 transition-colors"
          @click="toggleWireframe"
        >
          <Eye class="w-3.5 h-3.5" />
          <span>{{ isWireframe ? 'Solid' : 'Wireframe' }}</span>
        </button>
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg border border-current/20 hover:bg-[#00C864]/10 text-xs font-mono flex items-center gap-1.5 transition-colors"
          @click="isAutoRotate = !isAutoRotate"
        >
          <RotateCw class="w-3.5 h-3.5" />
          <span>{{ isAutoRotate ? 'Pause' : 'Rotate' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
