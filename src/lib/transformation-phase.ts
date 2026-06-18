import { motionValue } from "framer-motion";

// Shared scroll-driven 0..1 progress used to morph the hero / circular-economy
// 3D field through three phases: 0 = waste, 0.5 = recycling, 1 = product.
export const transformationPhase = motionValue(0);

export const PHASE_COLORS = {
  waste: "#6b5b4a",     // muted earth — raw plastic waste
  recycling: "#2563EB", // brand blue — purification & extrusion
  product: "#22C55E",   // brand green — finished sustainable granule
} as const;