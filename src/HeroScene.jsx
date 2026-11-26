import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function HeroScene() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2', { alpha: true, antialias: true })
    if (!context) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 30)
    camera.position.z = 8

    const renderer = new THREE.WebGLRenderer({
      canvas,
      context,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    container.appendChild(renderer.domElement)

    const geometries = new Set()
    const materials = new Set()
    const addMesh = (geometry, material) => {
      geometries.add(geometry)
      materials.add(material)
      return new THREE.Mesh(geometry, material)
    }

    const sculpture = new THREE.Group()
    const knot = addMesh(
      new THREE.TorusKnotGeometry(1.15, 0.012, 180, 8, 2, 3),
      new THREE.MeshBasicMaterial({ color: 0xd2ff5b, transparent: true, opacity: 0.85 }),
    )
    const orbit = addMesh(
      new THREE.TorusGeometry(1.75, 0.008, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0x9bbd51, transparent: true, opacity: 0.65 }),
    )
    const orbitOuter = addMesh(
      new THREE.TorusGeometry(2.35, 0.006, 8, 140),
      new THREE.MeshBasicMaterial({ color: 0xd2ff5b, transparent: true, opacity: 0.38 }),
    )
    const orbitInner = addMesh(
      new THREE.TorusGeometry(1.35, 0.006, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0xf1f5ee, transparent: true, opacity: 0.3 }),
    )
    const core = addMesh(
      new THREE.IcosahedronGeometry(0.42, 1),
      new THREE.MeshBasicMaterial({ color: 0xd2ff5b, wireframe: true, transparent: true, opacity: 0.55 }),
    )
    orbit.rotation.set(0.9, 0.25, 0.5)
    orbitOuter.rotation.set(1.15, -0.3, 0.25)
    orbitInner.rotation.set(0.1, 0.8, -0.65)

    const satellites = Array.from({ length: 4 }, (_, index) => {
      const satellite = addMesh(
        new THREE.SphereGeometry(index === 0 ? 0.065 : 0.04, 12, 8),
        new THREE.MeshBasicMaterial({
          color: index % 2 === 0 ? 0xd2ff5b : 0xf1f5ee,
          transparent: true,
          opacity: 0.9,
        }),
      )
      sculpture.add(satellite)
      return satellite
    })

    sculpture.add(knot, orbit, orbitOuter, orbitInner, core)
    scene.add(sculpture)

    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 180
    const particlePositions = new Float32Array(particleCount * 3)
    for (let index = 0; index < particlePositions.length; index += 3) {
      particlePositions[index] = (Math.random() - 0.5) * 7
      particlePositions[index + 1] = (Math.random() - 0.5) * 5
      particlePositions[index + 2] = (Math.random() - 0.5) * 3
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    geometries.add(particleGeometry)
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd2ff5b,
      size: 0.025,
      transparent: true,
      opacity: 0.62,
      sizeAttenuation: true,
    })
    materials.add(particleMaterial)
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = container.getBoundingClientRect()
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      renderer.render(scene, camera)
    })
    resizeObserver.observe(container)

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frameId = 0
    let isVisible = false
    const pointer = new THREE.Vector2()

    const handlePointerMove = (event) => {
      const bounds = container.getBoundingClientRect()
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1
    }

    container.addEventListener('pointermove', handlePointerMove, { passive: true })

    const animate = (time) => {
      frameId = requestAnimationFrame(animate)
      sculpture.rotation.y = time * 0.00012
      sculpture.rotation.x = Math.sin(time * 0.00016) * 0.12
      orbitOuter.rotation.z = time * 0.0001
      orbitInner.rotation.y = -time * 0.00014
      core.rotation.x = time * 0.0003
      core.rotation.y = -time * 0.00022
      core.scale.setScalar(1 + Math.sin(time * 0.0015) * 0.08)
      particles.rotation.y = -time * 0.000035
      particles.rotation.x = Math.sin(time * 0.00012) * 0.08
      satellites.forEach((satellite, index) => {
        const angle = time * (0.00018 + index * 0.000025) + index * Math.PI / 2
        const radius = index % 2 === 0 ? 1.8 : 2.35
        satellite.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 1.3) * 0.7,
          Math.sin(angle) * radius * 0.55,
        )
      })
      camera.position.x += (pointer.x * 0.34 - camera.position.x) * 0.025
      camera.position.y += (pointer.y * 0.22 - camera.position.y) * 0.025
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }

    const stop = () => {
      cancelAnimationFrame(frameId)
      frameId = 0
    }

    const start = () => {
      if (!reducedMotion && isVisible && document.visibilityState === 'visible' && !frameId) {
        frameId = requestAnimationFrame(animate)
      }
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible) start()
      else stop()
    })
    visibilityObserver.observe(container)

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') start()
      else stop()
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      stop()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      container.removeEventListener('pointermove', handlePointerMove)
      geometries.forEach((geometry) => geometry.dispose())
      materials.forEach((material) => material.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="hero-scene" ref={containerRef} />
}

export default HeroScene
