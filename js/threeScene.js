/* ============================================
   VICTORIA QUANT LAB — Three.js Scene
   Rotating wireframe globe, network nodes,
   particle connections, data grid
   ============================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // --- Colors ---
  const NEON_BLUE = 0x00d4ff;
  const NEON_PURPLE = 0xa855f7;
  const NEON_CYAN = 0x00fff5;

  // --- Wireframe Globe ---
  const globeGeometry = new THREE.IcosahedronGeometry(1.8, 3);
  const globeMaterial = new THREE.MeshBasicMaterial({
    color: NEON_BLUE,
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  });
  const globe = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(globe);

  // Inner globe
  const innerGlobeGeometry = new THREE.IcosahedronGeometry(1.5, 2);
  const innerGlobeMaterial = new THREE.MeshBasicMaterial({
    color: NEON_PURPLE,
    wireframe: true,
    transparent: true,
    opacity: 0.06,
  });
  const innerGlobe = new THREE.Mesh(innerGlobeGeometry, innerGlobeMaterial);
  scene.add(innerGlobe);

  // --- Network Nodes ---
  const nodeCount = 80;
  const nodePositions = [];
  const nodeGeometry = new THREE.BufferGeometry();
  const nodeVertices = [];

  for (let i = 0; i < nodeCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2.2 + Math.random() * 1.8;
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    nodeVertices.push(x, y, z);
    nodePositions.push({ x, y, z, ox: x, oy: y, oz: z });
  }

  nodeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodeVertices, 3));

  const nodeMaterial = new THREE.PointsMaterial({
    color: NEON_CYAN,
    size: 0.04,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  });

  const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
  scene.add(nodes);

  // --- Particle Connections (lines between nearby nodes) ---
  const linesMaterial = new THREE.LineBasicMaterial({
    color: NEON_BLUE,
    transparent: true,
    opacity: 0.06,
  });

  const linesGroup = new THREE.Group();
  const connectionThreshold = 2.0;

  for (let i = 0; i < nodePositions.length; i++) {
    for (let j = i + 1; j < nodePositions.length; j++) {
      const a = nodePositions[i];
      const b = nodePositions[j];
      const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
      if (dist < connectionThreshold) {
        const lineGeom = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(a.x, a.y, a.z),
          new THREE.Vector3(b.x, b.y, b.z),
        ]);
        const line = new THREE.Line(lineGeom, linesMaterial);
        linesGroup.add(line);
      }
    }
  }
  scene.add(linesGroup);

  // --- Floating Data Points ---
  const dataCount = 200;
  const dataGeometry = new THREE.BufferGeometry();
  const dataVertices = [];

  for (let i = 0; i < dataCount; i++) {
    dataVertices.push(
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 12
    );
  }

  dataGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dataVertices, 3));

  const dataMaterial = new THREE.PointsMaterial({
    color: NEON_PURPLE,
    size: 0.015,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
  });

  const dataPoints = new THREE.Points(dataGeometry, dataMaterial);
  scene.add(dataPoints);

  // --- Data Grid (horizontal grid plane) ---
  const gridHelper = new THREE.GridHelper(20, 40, NEON_BLUE, NEON_BLUE);
  gridHelper.position.y = -3;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.04;
  scene.add(gridHelper);

  // --- Mouse Tracking ---
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // --- Animation Loop ---
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Rotate globe
    globe.rotation.y = elapsed * 0.08;
    globe.rotation.x = elapsed * 0.03;

    innerGlobe.rotation.y = -elapsed * 0.05;
    innerGlobe.rotation.z = elapsed * 0.02;

    // Rotate connections with globe
    linesGroup.rotation.y = elapsed * 0.08;
    linesGroup.rotation.x = elapsed * 0.03;

    // Rotate nodes with globe
    nodes.rotation.y = elapsed * 0.08;
    nodes.rotation.x = elapsed * 0.03;

    // Float data points
    dataPoints.rotation.y = elapsed * 0.02;

    // Breathe grid
    gridHelper.material.opacity = 0.03 + Math.sin(elapsed * 0.5) * 0.015;

    // Slow camera movement following mouse
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();

  // --- Resize ---
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
