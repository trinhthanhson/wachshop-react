import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Coffee = () => {
  // const earth = useGLTF("./coffee/scene.gltf");
  const coffee = useGLTF('./watch/scene.gltf')

  return (
    <>
      <primitive
        object={coffee.scene}
        scale={2.5}
        position-y={-1}
        rotation-y={-1}
      />
      {/* <Plane args={[50, 50]} rotation-x={-Math.PI / 2} position-y={-10} receiveShadow /> */}
      {/* <hemisphereLight intensity={1} /> */}
      <ambientLight intensity={3.5} />
      {/* <directionalLight intensity={8} position={[0, 10, 0]} /> */}
      {/* <spotLight intensity={10} position={[0, 10, 0]} /> */}
      <pointLight intensity={10} position={[0, 10, 0]} />
    </>
  )
}

const CoffeeCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6]
        // position: [0, 10, 0],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={true}
          // quay 90 độ (can't xoay lên trên)
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={-Math.PI / 4}
        />
        <Coffee />

        <Preload all />
      </Suspense>
    </Canvas>
  )
}

export default CoffeeCanvas
