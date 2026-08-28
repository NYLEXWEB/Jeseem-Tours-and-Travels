"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeGlobeProps {
  activeDestinationId?: string | null;
}

const DESTINATION_COORDS = [
  { id: "kyoto", lat: 35.0116, lng: 135.7681, name: "Kyoto" },
  { id: "amalfi", lat: 40.6340, lng: 14.6027, name: "Amalfi Coast" },
  { id: "swiss-alps", lat: 46.8182, lng: 8.2275, name: "Swiss Alps" },
  { id: "serengeti", lat: -2.1540, lng: 34.6857, name: "Serengeti" },
];

export default function ThreeGlobe({ activeDestinationId }: ThreeGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene & Setup
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080808, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(5, 3, 10);
    scene.add(mainLight);

    const goldLight = new THREE.PointLight(0xd4af37, 2, 50);
    goldLight.position.set(-10, 5, -10);
    scene.add(goldLight);

    // 3. Create Dotted Globe
    const globeRadius = 6.5;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Dotted Sphere representation
    const dotCount = 8000;
    const positions = new Float32Array(dotCount * 3);
    const colors = new Float32Array(dotCount * 3);

    const color1 = new THREE.Color("#444444"); // Muted dark dots
    const color2 = new THREE.Color("#d4af37"); // Highlighted gold dots

    for (let i = 0; i < dotCount; i++) {
      // Fibonacci sphere algorithm to distribute dots evenly
      const phi = Math.acos(-1 + (2 * i) / dotCount);
      const theta = Math.sqrt(dotCount * Math.PI) * phi;

      const x = globeRadius * Math.sin(phi) * Math.cos(theta);
      const y = globeRadius * Math.sin(phi) * Math.sin(theta);
      const z = globeRadius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color variation
      const randomColor = Math.random() > 0.985 ? color2 : color1;
      colors[i * 3] = randomColor.r;
      colors[i * 3 + 1] = randomColor.g;
      colors[i * 3 + 2] = randomColor.b;
    }

    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    dotGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom round dot canvas texture
    const createDotTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(8, 8, 8, 0, Math.PI * 2);
        ctx.fill();
      }
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const dotMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      map: createDotTexture(),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const dotPoints = new THREE.Points(dotGeometry, dotMaterial);
    globeGroup.add(dotPoints);

    // Inner glowing sphere to give the globe dimension
    const innerGeo = new THREE.SphereGeometry(globeRadius - 0.05, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x080808,
      transparent: true,
      opacity: 0.75,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // 4. Create Coordinates Helper and Pins
    const convertLatLngToVector3 = (lat: number, lng: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);

      const x = -(radius * Math.sin(phi) * Math.sin(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.cos(theta);

      return new THREE.Vector3(x, y, z);
    };

    const pinGroup = new THREE.Group();
    globeGroup.add(pinGroup);

    const pins: { id: string; mesh: THREE.Mesh; targetRotX: number; targetRotY: number }[] = [];

    DESTINATION_COORDS.forEach((dest) => {
      const pinPos = convertLatLngToVector3(dest.lat, dest.lng, globeRadius);

      // Create glowing pin geometry
      const pinGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        emissive: 0xd4af37,
        emissiveIntensity: 1.5,
        roughness: 0.1,
        metalness: 0.8,
      });

      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pinPos);
      pinGroup.add(pinMesh);

      // Pulse ring around pin
      const ringGeo = new THREE.RingGeometry(0.24, 0.28, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pinPos);
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
      ringMesh.rotateY(Math.PI);
      pinGroup.add(ringMesh);

      // Calculate globe rotations to bring this lat/lng facing the camera (facing positive Z axis)
      // Longitude: rotates Y axis
      // Latitude: rotates X axis
      const targetRotY = -dest.lng * (Math.PI / 180);
      const targetRotX = dest.lat * (Math.PI / 180);

      pins.push({
        id: dest.id,
        mesh: pinMesh,
        targetRotX,
        targetRotY,
      });
    });

    // 5. Starfield background particles
    const starsCount = 1500;
    const starsPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      starsPositions[i * 3] = (Math.random() - 0.5) * 80;
      starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 80 - 10;
    }
    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starsPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x555555,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const starsPoints = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsPoints);

    // 6. Animation Loop
    let animationFrameId: number;
    let targetX = 0.1; // Default tilt angles
    let targetY = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Ring pulse animation
      pinGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.RingGeometry) {
          child.scale.addScalar(0.012);
          const mat = child.material as THREE.MeshBasicMaterial;
          mat.opacity -= 0.015;

          if (mat.opacity <= 0) {
            child.scale.set(1, 1, 1);
            mat.opacity = 0.65;
          }
        }
      });

      // Globe auto-rotation if no active destination
      const activePin = pins.find((p) => p.id === activeDestinationId);
      if (activePin) {
        targetX = activePin.targetRotX;
        targetY = activePin.targetRotY;

        // Smoothly interpolate to destination coordinates (lerp)
        globeGroup.rotation.x += (targetX - globeGroup.rotation.x) * 0.055;
        // Make sure we take the shortest angular distance for rotation.y
        let diffY = targetY - globeGroup.rotation.y;
        // Normalize diffY to [-PI, PI]
        diffY = Math.atan2(Math.sin(diffY), Math.cos(diffY));
        globeGroup.rotation.y += diffY * 0.055;

        // Highlight active pin
        pins.forEach((p) => {
          const mat = p.mesh.material as THREE.MeshStandardMaterial;
          if (p.id === activeDestinationId) {
            mat.emissiveIntensity = 2.5;
            mat.color.setHex(0xffffff);
            p.mesh.scale.set(1.4, 1.4, 1.4);
          } else {
            mat.emissiveIntensity = 0.8;
            mat.color.setHex(0xd4af37);
            p.mesh.scale.set(1, 1, 1);
          }
        });
      } else {
        // Slow default rotation
        globeGroup.rotation.y += 0.0015;
        // Slowly drift back to default vertical tilt
        globeGroup.rotation.x += (0.15 - globeGroup.rotation.x) * 0.02;

        // Reset all pin highlights
        pins.forEach((p) => {
          const mat = p.mesh.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 1.0;
          mat.color.setHex(0xd4af37);
          p.mesh.scale.set(1, 1, 1);
        });
      }

      // Rotate stars very slowly
      starsPoints.rotation.y -= 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // 8. Cleanup resources on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Deep dispose geometries & materials
      dotGeometry.dispose();
      dotMaterial.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();

      pins.forEach((p) => {
        p.mesh.geometry.dispose();
        if (Array.isArray(p.mesh.material)) {
          p.mesh.material.forEach((m) => m.dispose());
        } else {
          p.mesh.material.dispose();
        }
      });

      renderer.dispose();
    };
  }, [activeDestinationId]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
    />
  );
}
