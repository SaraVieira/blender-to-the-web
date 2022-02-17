import React, { useRef } from "react";
import { Stage, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { wobble, lookAt } from "./utils/animations";

function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/model.gltf");

  useFrame((state) => {
    const { position, rotation } = group.current;
    position.y += wobble(state) / 1200;
    rotation.x += wobble(state) / 2000;
    rotation.y += wobble(state) / 1000;
    rotation.z += wobble(state) / 1000;

    rotation.y = lookAt(state, rotation.y);
    rotation.x = lookAt(state, rotation.x);
  });

  materials.mug.roughness = 0.2;

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mug.geometry}
        material={materials.mug}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle002.geometry}
          material={materials["Liquid Domain Material.001"]}
          position={[0.02, 1.19, 0]}
        />
      </mesh>
    </group>
  );
}

const Side = () => (
  <Canvas shadows>
    <Stage
      contactShadow={{
        opacity: 1,
        position: [0, -0.5, 0],
      }}
      environment="night"
    >
      <Model />
    </Stage>
  </Canvas>
);

export default Side;
useGLTF.preload("/model.gltf");
