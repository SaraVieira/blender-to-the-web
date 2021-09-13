import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Stage } from "./Components/Stage";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import { wobble, lookAt } from "./utils/animations";

function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/modelDraco.gltf");

  const coffee = new THREE.MeshPhysicalMaterial({
    roughness: 0.8,
    clearcoat: 0.1,
    transparent: true,
    reflectivity: 0.2,
    refractionRatio: 0.985,
    color: "#000"
  });

  useFrame((state) => {
    const { position, rotation } = group.current;
    position.y += (Math.cos(10000 + state.clock.elapsedTime) * Math.PI) / 1000;
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
        position={[0.29, 2.32, -1.34]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle002.geometry}
        material={coffee}
        position={[0.31, 3.6, -1.34]}
      />
    </group>
  );
}

const Side = () => {
  return (
    <Canvas style={{ height: "90%", top: "5%" }} shadows dpr={[1, 2]}>
      <Stage intensity={1} environment="night" contactShadowOpacity={1}>
        <Model />
      </Stage>
      <EffectComposer>
        <SSAO />

        {/* <Glitch delay={[1.5, 3.5]} duration={[0.6, 1.0]} ratio={0.85} />
        <ChromaticAberration /> */}
        {/* <DotScreen scale={0.2} /> */}
        {/* <Pixelation granularity={5} /> */}
      </EffectComposer>
    </Canvas>
  );
};

export default Side;
useGLTF.preload("/modelDraco.gltf");
