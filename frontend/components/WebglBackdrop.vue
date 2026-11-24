<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useTheme } from '~/composables/useTheme'

const containerRef = ref<HTMLDivElement | null>(null)
const { isDark, isXray } = useTheme()

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let sculptureMesh: THREE.Mesh | null = null
let particleSystem: THREE.Points | null = null
let animationFrameId: number | null = null

let mouseNormX = 0
let mouseNormY = 0
let smoothMouseX = 0
let smoothMouseY = 0
let pulseBoost = 0

const clock = new THREE.Clock()

const updateColors = () => {
  if (!sculptureMesh || !particleSystem) return
  const mat = sculptureMesh.material as THREE.MeshPhysicalMaterial
  const pMat = particleSystem.material as THREE.PointsMaterial

  mat.wireframe = isXray.value

  if (isDark.value) {
    mat.color.setHex(0x00ff88)
    mat.emissive.setHex(0x004d29)
    pMat.color.setHex(0x00ff88)
  } else {
    mat.color.setHex(0x00d26a)
    mat.emissive.setHex(0x005228)
    pMat.color.setHex(0x00c864)
  }
}

watch([isDark, isXray], () => {
  updateColors()
})

const onMouseMove = (e: MouseEvent) => {
  mouseNormX = (e.clientX / window.innerWidth) * 2 - 1
  mouseNormY = -(e.clientY / window.innerHeight) * 2 + 1
}

const onClick = () => {
  pulseBoost = 0.5
}

const getDimensions = () => {
  let w = containerRef.value?.clientWidth || 0
  let h = containerRef.value?.clientHeight || 0
  if (w <= 0 || h <= 0) {
    const parent = containerRef.value?.parentElement
    w = parent?.clientWidth || window.innerWidth
    h = parent?.clientHeight || window.innerHeight
  }
  return {
    width: Math.max(w, 320),
    height: Math.max(h, 600)
  }
}

const onResize = () => {
  if (!camera || !renderer) return
  const { width, height } = getDimensions()
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

onMounted(() => {
  if (!import.meta.client || !containerRef.value) return

  const { width, height } = getDimensions()

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.set(0, 0, 7.0)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.domElement.style.position = 'absolute'
  renderer.domElement.style.top = '0'
  renderer.domElement.style.left = '0'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  renderer.domElement.style.pointerEvents = 'none'
  containerRef.value.appendChild(renderer.domElement)

  // 3-Point Studio Lighting for Radiant Glassy Emerald Finish
  const ambient = new THREE.AmbientLight(0xffffff, 1.2)
  scene.add(ambient)

  const keyLight = new THREE.DirectionalLight(0x00ff88, 3.2)
  keyLight.position.set(6, 6, 6)
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0x00d26a, 2.4)
  fillLight.position.set(-6, 2, 4)
  scene.add(fillLight)

  const backLight = new THREE.DirectionalLight(0xffffff, 2.0)
  backLight.position.set(0, -5, -4)
  scene.add(backLight)

  // 3D Emerald Torus Knot Geometry
  const isSmallScreen = width < 1024
  const radius = isSmallScreen ? 1.05 : 1.38
  const tube = isSmallScreen ? 0.32 : 0.42
  const geo = new THREE.TorusKnotGeometry(radius, tube, 160, 32, 2, 3)

  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x00d26a,
    emissive: 0x005228,
    emissiveIntensity: 0.35,
    roughness: 0.12,
    metalness: 0.3,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    wireframe: false
  })

  const baseX = isSmallScreen ? 0.9 : 2.05
  const baseY = isSmallScreen ? -0.2 : 0.05

  sculptureMesh = new THREE.Mesh(geo, mat)
  sculptureMesh.position.set(baseX, baseY, 0)
  scene.add(sculptureMesh)

  // Ambient Floating Particles
  const pGeo = new THREE.BufferGeometry()
  const pCount = 150
  const pPos = new Float32Array(pCount * 3)
  for (let i = 0; i < pCount * 3; i++) {
    pPos[i] = (Math.random() - 0.5) * 18
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
  const pMat = new THREE.PointsMaterial({
    color: 0x00ff88,
    size: 0.06,
    transparent: true,
    opacity: 0.7
  })
  particleSystem = new THREE.Points(pGeo, pMat)
  scene.add(particleSystem)

  updateColors()

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('click', onClick)
  window.addEventListener('resize', onResize)

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate)
    if (!renderer || !scene || !camera || !sculptureMesh) return

    const t = clock.getElapsedTime()
    pulseBoost *= 0.92

    // Organic Breathing Pulse
    const pulse = 1 + (Math.sin(t * 1.5) * 0.045 + pulseBoost * 0.08)
    sculptureMesh.scale.set(pulse, pulse, pulse)

    // Smooth Lerp Mouse Parallax
    smoothMouseX += (mouseNormX - smoothMouseX) * 0.06
    smoothMouseY += (mouseNormY - smoothMouseY) * 0.06

    const currentWidth = containerRef.value?.clientWidth || window.innerWidth
    const isSmall = currentWidth < 1024
    const currentBaseX = isSmall ? 0.9 : 2.05
    const currentBaseY = isSmall ? -0.2 : 0.05

    sculptureMesh.position.x = currentBaseX + smoothMouseX * 0.35
    sculptureMesh.position.y = currentBaseY + smoothMouseY * 0.25
    sculptureMesh.rotation.x = t * 0.18 + smoothMouseY * 0.6
    sculptureMesh.rotation.y = t * 0.25 + smoothMouseX * 0.8

    if (particleSystem) {
      particleSystem.rotation.y = t * 0.04 + smoothMouseX * 0.2
      particleSystem.rotation.x = smoothMouseY * 0.15
    }

    renderer.render(scene, camera)
  }

  animate()
})

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (import.meta.client) {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('click', onClick)
    window.removeEventListener('resize', onResize)
  }
  if (renderer) renderer.dispose()
})
</script>

<template>
  <div
    ref="containerRef"
    class="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
    style="position: absolute; inset: 0; width: 100%; height: 100%; min-height: 100%; pointer-events: none;"
  />
</template>
