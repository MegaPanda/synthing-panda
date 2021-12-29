import { Circle, OrbitControls, SpotLight } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react';
import Panda from './components/Panda';
import './styles.css'

function App() {
  return (
    <>
    {/*
      <div style={{ position: "absolute", bottom: "10px", left: "10px", zIndex: 10, color: "#FAF089", 
          fontFamily: "system-ui", fontSize: "10px", fontWeight: 700
      }}>
        Drag the panda up and<br />
        down to make some noise!
      </div>
    */}
      <Canvas camera={{ fov: 75, position: [0, 0, 7] }}>
        <color attach="background" args={['#1A202C']} />
        <ambientLight />
        <SpotLight 
          penumbra={0.5}
          position={[0, 4, 0]}
          distance={10}
          intensity={100}
          angle={0.5}
          color="#FAF089"
          castShadow
        />
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
        <Suspense fallback={null}>
          <Panda />
          <Circle receiveShadow rotation-x={11} args={[2, 50]} position={[0, -2.7, 0]}>
            <meshPhongMaterial color="#E53E3E" />
          </Circle>
        </Suspense>
      </Canvas>
    </>
  )
}

export default App;
