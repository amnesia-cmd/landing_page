import React, { useEffect, useRef } from 'react';

/**
 * Continuous, looping JS-rendered cosmic video background.
 * Renders a multi-layered deep-space starfield, orbital telemetry rings,
 * volumetric nebula ribbons, and 3D-projected 21-point hand-tracking constellations
 * that smoothly morph and respond to scroll depth and pointer movement.
 */
export const CosmicBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let scrollY = window.scrollY;
    let pointerX = 0;
    let pointerY = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handlePointerMove = (e: MouseEvent) => {
      pointerX = (e.clientX / width - 0.5) * 2;
      pointerY = (e.clientY / height - 0.5) * 2;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Starfield particles
    const starCount = 190;
    const stars = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * 2400,
      y: (Math.random() - 0.5) * 2400,
      z: Math.random() * 1000 + 80,
      radius: Math.random() * 1.6 + 0.4,
      hue: Math.random() > 0.65 ? 192 : Math.random() > 0.35 ? 222 : 42,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // 21-point anatomical hand constellation nodes (normalized coordinates)
    // Morphing between two expressive ASL poses in cosmic space
    const poseA: [number, number, number][] = [
      [0, 0.35, 0], // 0: Wrist
      [-0.12, 0.25, 0.05], [-0.22, 0.12, 0.08], [-0.28, -0.02, 0.1], [-0.33, -0.14, 0.12], // Thumb
      [-0.1, 0.02, 0], [-0.14, -0.18, 0.02], [-0.16, -0.32, 0.04], [-0.17, -0.44, 0.06], // Index
      [-0.02, 0.0, 0], [-0.03, -0.22, 0.01], [-0.03, -0.37, 0.03], [-0.03, -0.49, 0.05], // Middle
      [0.06, 0.03, -0.01], [0.08, -0.17, 0], [0.09, -0.31, 0.02], [0.1, -0.42, 0.04], // Ring
      [0.14, 0.08, -0.02], [0.18, -0.08, -0.01], [0.21, -0.2, 0.01], [0.24, -0.3, 0.03], // Pinky
    ];

    const poseB: [number, number, number][] = [
      [0, 0.35, 0], // 0: Wrist
      [-0.1, 0.22, 0.08], [-0.15, 0.08, 0.12], [-0.11, -0.04, 0.15], [-0.05, -0.1, 0.17], // Thumb curved in
      [-0.1, 0.02, 0], [-0.13, -0.19, 0.04], [-0.15, -0.34, 0.07], [-0.16, -0.46, 0.1], // Index extended
      [-0.02, 0.0, 0], [-0.02, -0.12, 0.08], [-0.01, -0.04, 0.14], [0.0, 0.04, 0.12], // Middle folded
      [0.06, 0.03, -0.01], [0.06, -0.09, 0.08], [0.05, -0.01, 0.14], [0.05, 0.06, 0.11], // Ring folded
      [0.14, 0.08, -0.02], [0.19, -0.09, 0.02], [0.23, -0.22, 0.05], [0.27, -0.34, 0.08], // Pinky extended (I-L-Y sign)
    ];

    const handEdges: [number, number][] = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [0, 9], [9, 10], [10, 11], [11, 12],
      [0, 13], [13, 14], [14, 15], [15, 16],
      [0, 17], [17, 18], [18, 19], [19, 20],
      [5, 9], [9, 13], [13, 17],
    ];

    let startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001;
      ctx.clearRect(0, 0, width, height);

      // Deep cosmic obsidian radial atmosphere
      const bgGrad = ctx.createRadialGradient(
        width * (0.5 + pointerX * 0.08),
        height * (0.35 + pointerY * 0.06),
        40,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.95
      );
      bgGrad.addColorStop(0, '#0c162d');
      bgGrad.addColorStop(0.45, '#070b16');
      bgGrad.addColorStop(1, '#04060b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle cosmic aurora wave ribbons
      ctx.save();
      for (let w = 0; w < 2; w++) {
        ctx.beginPath();
        const baseY = height * (0.32 + w * 0.28) - (scrollY * 0.08) % height;
        ctx.moveTo(0, baseY);
        for (let x = 0; x <= width; x += 60) {
          const yOffset =
            Math.sin(x * 0.0025 + elapsed * (0.4 + w * 0.15) + w) * 55 +
            Math.cos(x * 0.0012 - elapsed * 0.25) * 35;
          ctx.lineTo(x, baseY + yOffset);
        }
        ctx.strokeStyle =
          w === 0 ? 'rgba(6, 182, 212, 0.06)' : 'rgba(59, 130, 246, 0.05)';
        ctx.lineWidth = 90;
        ctx.stroke();
      }
      ctx.restore();

      // 3D Starfield with continuous forward Z-flight + scroll velocity warp
      const focalLength = 420;
      const centerX = width * 0.5 + pointerX * 28;
      const centerY = height * 0.48 + pointerY * 22;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= 0.65;
        if (star.z <= 20) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * 2400;
          star.y = (Math.random() - 0.5) * 2400;
        }

        const scale = focalLength / star.z;
        const sx = centerX + star.x * scale;
        const sy =
          ((centerY + star.y * scale - scrollY * 0.15 * (scale * 0.4)) %
            (height + 100) +
            (height + 100)) %
            (height + 100) -
          50;

        if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          const alpha =
            Math.min(1, (1000 - star.z) / 500) *
            (0.55 + 0.45 * Math.sin(elapsed * 2.2 + star.twinkleOffset));
          ctx.beginPath();
          ctx.arc(sx, sy, star.radius * scale * 0.65, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${star.hue}, 85%, 78%, ${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      // Orbital Telemetry Rings in deep background
      ctx.save();
      ctx.translate(width * 0.76 - pointerX * 18, height * 0.42 - pointerY * 14);
      ctx.rotate(elapsed * 0.05 + scrollY * 0.0004);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(width, 900) * 0.34, Math.min(width, 900) * 0.14, 0.35, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.setLineDash([4, 10]);
      ctx.ellipse(0, 0, Math.min(width, 900) * 0.44, Math.min(width, 900) * 0.19, -0.25, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.09)';
      ctx.stroke();
      ctx.restore();

      // Floating 3D Hand Constellation (right-side cosmic observatory glyph)
      const morph = 0.5 + 0.5 * Math.sin(elapsed * 0.75);
      const handCenterX = width > 900 ? width * 0.78 : width * 0.5;
      const handCenterY = height * 0.46 - (scrollY * 0.12) % (height * 0.6);
      const handScale = Math.min(width, height) * 0.38;
      const rotY = Math.sin(elapsed * 0.4) * 0.35 + pointerX * 0.25;
      const rotX = Math.cos(elapsed * 0.3) * 0.15 - pointerY * 0.15;

      const projectedNodes: { x: number; y: number; z: number }[] = poseA.map((ptA, idx) => {
        const ptB = poseB[idx];
        const nx = ptA[0] + (ptB[0] - ptA[0]) * morph;
        const ny = ptA[1] + (ptB[1] - ptA[1]) * morph;
        const nz = ptA[2] + (ptB[2] - ptA[2]) * morph;

        // Rotate around Y and X
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = nx * cosY + nz * sinY;
        const z1 = -nx * sinY + nz * cosY;

        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = ny * cosX - z1 * sinX;
        const z2 = ny * sinX + z1 * cosX;

        return {
          x: handCenterX + x1 * handScale,
          y: handCenterY + y2 * handScale,
          z: z2,
        };
      });

      // Draw constellation filaments
      ctx.save();
      ctx.lineWidth = 1.1;
      for (const [a, b] of handEdges) {
        const p1 = projectedNodes[a];
        const p2 = projectedNodes[b];
        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
        grad.addColorStop(1, 'rgba(59, 130, 246, 0.14)');
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Draw joint nodes
      projectedNodes.forEach((node, idx) => {
        const isFingertip = [4, 8, 12, 16, 20].includes(idx);
        ctx.beginPath();
        ctx.arc(node.x, node.y, isFingertip ? 3.2 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = isFingertip
          ? 'rgba(34, 211, 238, 0.55)'
          : 'rgba(148, 163, 184, 0.32)';
        ctx.fill();
      });
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
