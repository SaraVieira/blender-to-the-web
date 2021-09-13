import * as THREE from "three";

export const wobble = (state) =>
  Math.sin(1000 + state.clock.elapsedTime) * Math.PI;

export const lookAt = (state, rotation) =>
  THREE.MathUtils.lerp(rotation, (state.mouse.x * Math.PI) / 20, 1);
