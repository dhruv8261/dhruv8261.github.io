/* assets/globe.js — Three.js 3D rotating globe for hero section */
(function () {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const W = canvas.offsetWidth || 500;
  const H = canvas.offsetHeight || 540;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
  camera.position.set(0, 0, 4.6);

  /* Wireframe shell */
  const geoWire = new THREE.IcosahedronGeometry(1.65, 1);
  const matWire = new THREE.MeshStandardMaterial({
    color: 0x00e5ff, wireframe: true, opacity: 0.12, transparent: true
  });
  const globe = new THREE.Mesh(geoWire, matWire);
  scene.add(globe);

  /* Inner solid */
  const geoSolid = new THREE.IcosahedronGeometry(1.62, 1);
  const matSolid = new THREE.MeshStandardMaterial({
    color: 0x001824, opacity: 0.55, transparent: true
  });
  const solid = new THREE.Mesh(geoSolid, matSolid);
  scene.add(solid);

  /* Outer glow ring */
  const geoRing = new THREE.TorusGeometry(2.0, 0.012, 8, 80);
  const matRing = new THREE.MeshStandardMaterial({ color: 0x00e5ff, opacity: 0.25, transparent: true });
  const ring = new THREE.Mesh(geoRing, matRing);
  ring.rotation.x = 0.4;
  scene.add(ring);

  /* Orbital nodes */
  const nodeGroup = new THREE.Group();
  const nodeColors = [0x00e5ff, 0x69f0ae, 0xffd740, 0x00e5ff, 0x69f0ae, 0x00e5ff, 0x69f0ae, 0xffd740];
  for (let i = 0; i < 8; i++) {
    const phi   = Math.acos(-1 + (2 * i) / 7);
    const theta = Math.sqrt(8 * Math.PI) * phi;
    const r = 2.18;
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 10, 10),
      new THREE.MeshStandardMaterial({ color: nodeColors[i], emissive: nodeColors[i], emissiveIntensity: 0.3 })
    );
    sphere.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    nodeGroup.add(sphere);

    /* Connecting line to globe */
    const points = [
      sphere.position.clone().multiplyScalar(0.78),
      sphere.position.clone()
    ];
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const lineMat = new THREE.LineBasicMaterial({ color: nodeColors[i], opacity: 0.2, transparent: true });
    nodeGroup.add(new THREE.Line(lineGeo, lineMat));
  }
  scene.add(nodeGroup);

  /* Floating particles */
  const pCount = 60;
  const pPositions = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const r = 1.8 + Math.random() * 1.2;
    const phi = Math.random() * Math.PI;
    const theta = Math.random() * Math.PI * 2;
    pPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pPositions[i * 3 + 2] = r * Math.cos(phi);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  const pMat = new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.035, transparent: true, opacity: 0.5 });
  scene.add(new THREE.Points(pGeo, pMat));

  /* Lights */
  scene.add(new THREE.AmbientLight(0x002233, 1.8));
  const pt = new THREE.PointLight(0x00e5ff, 1.8, 12);
  pt.position.set(4, 3, 3);
  scene.add(pt);
  const pt2 = new THREE.PointLight(0x69f0ae, 0.6, 10);
  pt2.position.set(-3, -2, 2);
  scene.add(pt2);

  /* Animate */
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.004;
    globe.rotation.y = t * 0.7;
    solid.rotation.y = t * 0.7;
    nodeGroup.rotation.y = t * 0.85;
    nodeGroup.rotation.x = Math.sin(t * 0.35) * 0.18;
    ring.rotation.z = t * 0.2;
    pt.intensity = 1.6 + Math.sin(t * 1.2) * 0.3;
    renderer.render(scene, camera);
  }
  animate();

  /* Resize */
  window.addEventListener('resize', () => {
    const nW = canvas.offsetWidth;
    const nH = canvas.offsetHeight;
    if (nW && nH) {
      renderer.setSize(nW, nH);
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
    }
  });
})();
