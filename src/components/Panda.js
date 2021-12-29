import React, { useRef } from 'react';
import { useGLTF, MeshWobbleMaterial } from '@react-three/drei';
import { useGesture } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/three";
import * as Tone from "tone";

export default function Panda({ ...props }) {
  const group = useRef();
  const { nodes } = useGLTF('/panda.glb');

  const synth = new Tone.Synth({
    volume: -12
  }).toDestination();
  const synthRef = useRef(synth);

  const [spring, api] = useSpring(() => ({ scale: [1, 1, 1], position: [0, -2, 0] }))
  const bind = useGesture({
      onPointerDown: async () => {
          await Tone.start();
          synthRef.current.triggerAttack("C4");
      },
      onDrag: ({ down, xy: [x, y] }) => {
          const mouseY = (window.innerHeight - y) * 2 / window.innerHeight + 0.5;
          api({ 
              immediate: down, 
              scale: down ? [1, mouseY, 1] : [1, 1, 1], 
              position: down ? [0, -2 + 0.7 * (mouseY - 1), 0] : [0, -2, 0]
          });
          if (!down) {
              synthRef.current.triggerRelease();
          } else if (y < 300) {
              synthRef.current.setNote("C5");
          } else if (300 < y && y < 350) {
              synthRef.current.setNote("B4");
          } else if (350 < y && y < 400) {
              synthRef.current.setNote("A4");
          } else if (400 < y && y < 450) {
              synthRef.current.setNote("G4");
          } else if (450 < y && y < 500) {
              synthRef.current.setNote("F4");
          } else if (500 < y && y < 550) {
              synthRef.current.setNote("E4");
          } else if (550 < y && y < 600) {
              synthRef.current.setNote("D4");
          } else {
              synthRef.current.setNote("C4");
          }
      },
  });

  return (
    <animated.group ref={group} {...props} {...spring} {...bind()}  dispose={null}>
      <group rotation={[0, 2, 0]} scale={[0.3, 0.4, 0.35]}>
        <mesh geometry={nodes.Panda_1.geometry}>
          <MeshWobbleMaterial factor={0.1} speed={10} color={nodes.Panda_1.material.color} />
        </mesh>
        <mesh geometry={nodes.Panda_2.geometry}>
          <MeshWobbleMaterial factor={0.1} speed={10} color={nodes.Panda_2.material.color} />
        </mesh> 
        <mesh geometry={nodes.Panda_3.geometry}>
          <MeshWobbleMaterial factor={0.1} speed={10} color={nodes.Panda_3.material.color} />
        </mesh>
      </group>
    </animated.group>
  )
}

useGLTF.preload('/panda.glb')