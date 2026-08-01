"use client";

import { GrainGradient } from "@paper-design/shaders-react";

export function GradientBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        colorBack="hsl(0, 0%, 0%)"
        softness={1}
        intensity={0}
        noise={0.15}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={0}
        colors={[
          "hsl(0, 0%, 3%)",
          "hsl(0, 0%, 2%)",
          "hsl(0, 0%, 1%)",
        ]}
      />
    </div>
  );
}
