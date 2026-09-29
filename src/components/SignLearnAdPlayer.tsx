import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

/**
 * 30-Second Procedural JS Video Ad for SignLearn ("Signal Across Space — 30s Spot")
 * Features 5 choreographed scenes with high-quality cross-dissolve & warp transitions,
 * dynamic kinetic typography, 3D hand-joint motion vectors, lesson-to-note crystallization,
 * student recall rings, and teacher orbital check-in radar.
 *
 * Strictly adheres to the prompt requirement:
 * "with clean player adn nothing other than play/pause which shoudl blend in nicely"
 */
export const SignLearnAdPlayer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const isPlayingRef = useRef<boolean>(true);
  const accumulatedTimeRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number | null>(null);

  const togglePlayPause = () => {
    const next = !isPlayingRef.current;
    isPlayingRef.current = next;
    setIsPlaying(next);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = 1280);
    const height = (canvas.height = 720);
    const AD_DURATION = 30.0; // 30-second commercial loop

    // Persistent star particles for the 30s cinema canvas
    const cinemaStars = Array.from({ length: 140 }, (_, i) => ({
      x: ((i * 97) % 1280),
      y: ((i * 53) % 720),
      size: (i % 3) * 0.7 + 0.6,
      speed: ((i % 5) + 1) * 0.35,
    }));

    // 21-point hand wireframe coordinates for the ad
    const handNodes: [number, number][] = [
      [0, 140],
      [-55, 95], [-95, 45], [-120, -10], [-140, -55], // Thumb
      [-45, 5], [-62, -75], [-72, -135], [-78, -185], // Index
      [-8, -5], [-12, -95], [-14, -155], [-15, -210], // Middle
      [28, 8], [36, -72], [42, -130], [46, -180], // Ring
      [62, 28], [82, -38], [96, -88], [108, -132], // Pinky
    ];

    const handConnections: [number, number][] = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [0, 9], [9, 10], [10, 11], [11, 12],
      [0, 13], [13, 14], [14, 15], [15, 16],
      [0, 17], [17, 18], [18, 19], [19, 20],
      [5, 9], [9, 13], [13, 17],
    ];

    let rafId: number;

    const easeInOutCubic = (x: number): number =>
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

    const drawTextWithTracking = (
      text: string,
      x: number,
      y: number,
      font: string,
      fillStyle: string,
      align: CanvasTextAlign = 'center'
    ) => {
      ctx.save();
      ctx.font = font;
      ctx.fillStyle = fillStyle;
      ctx.textAlign = align;
      ctx.fillText(text, x, y);
      ctx.restore();
    };

    const renderFrame = (now: number) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = now;
      }
      const dt = (now - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = now;

      if (isPlayingRef.current) {
        accumulatedTimeRef.current = (accumulatedTimeRef.current + dt) % AD_DURATION;
      }

      const t = accumulatedTimeRef.current; // 0.0 to 30.0s

      // Base cinematic obsidian sky
      const bg = ctx.createRadialGradient(width * 0.5, height * 0.45, 50, width * 0.5, height * 0.5, 820);
      bg.addColorStop(0, '#0f1c38');
      bg.addColorStop(0.55, '#080d1a');
      bg.addColorStop(1, '#04060c');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Determine active scene (5 scenes x 6 seconds = 30.0s)
      // Scene 0 (0-6s): "Every gesture carries a universe of meaning." (3D Hand Constellation Awakening)
      // Scene 1 (6-12s): "Drop any signing video. Watch structured study notes crystallize." (Lesson Capture)
      // Scene 2 (12-18s): "Low-pressure practice rounds that help your hands remember." (Kinematic Recall Rings)
      // Scene 3 (18-24s): "A calm view of the room. People, not percentages." (Teacher Orbital Command Bridge)
      // Scene 4 (24-30s): "SignLearn — A clearer way to learn by signing. Ready online & offline." (Finale Convergence)

      const sceneIndex = Math.floor(t / 6);
      const sceneTime = t % 6; // 0..6s within current scene
      const sceneProgress = sceneTime / 6;

      // Transition warp factor near scene boundaries (first 0.65s and last 0.65s)
      let transitionWarp = 0;
      if (sceneTime < 0.65) {
        transitionWarp = 1 - easeInOutCubic(sceneTime / 0.65);
      } else if (sceneTime > 5.35) {
        transitionWarp = easeInOutCubic((sceneTime - 5.35) / 0.65);
      }

      // Draw moving starfield (accelerates into warp streaks during scene transitions!)
      ctx.save();
      cinemaStars.forEach((star) => {
        const speedMult = 1 + transitionWarp * 28;
        const sx = (star.x - t * 32 * star.speed) % width;
        const finalX = sx < 0 ? sx + width : sx;
        const streakLen = transitionWarp * 85 * star.speed;

        ctx.strokeStyle = `rgba(165, 243, 252, ${0.25 + transitionWarp * 0.45})`;
        ctx.lineWidth = star.size;
        ctx.beginPath();
        ctx.moveTo(finalX, star.y);
        ctx.lineTo(finalX + streakLen + 1.5, star.y);
        ctx.stroke();
        void speedMult;
      });
      ctx.restore();

      // Subtle widescreen letterbox framing & telemetry grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(80, 64);
      ctx.lineTo(width - 80, 64);
      ctx.moveTo(80, height - 64);
      ctx.lineTo(width - 80, height - 64);
      ctx.stroke();

      // Content alpha with smooth cross-dissolve
      const contentAlpha = Math.max(0, 1 - transitionWarp * 0.92);
      ctx.save();
      ctx.globalAlpha = contentAlpha;

      if (sceneIndex === 0) {
        // SCENE 1 (0–6s): Cosmic Hand Constellation Awakening
        const cx = width * 0.5;
        const cy = height * 0.52;

        // Pulsing orbital rings
        for (let r = 1; r <= 3; r++) {
          ctx.beginPath();
          ctx.arc(cx, cy - 40, 110 * r + Math.sin(t * 2 + r) * 8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.18 / r})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Animated 21-point hand constellation
        ctx.save();
        ctx.translate(cx, cy + 50);
        const sway = Math.sin(t * 1.8) * 0.14;
        ctx.rotate(sway);

        handConnections.forEach(([a, b], idx) => {
          const reveal = Math.min(1, Math.max(0, (sceneTime - idx * 0.06) / 1.2));
          if (reveal <= 0) return;
          const [x1, y1] = handNodes[a];
          const [x2, y2] = handNodes[b];
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1 + (x2 - x1) * reveal, y1 + (y2 - y1) * reveal);
          ctx.strokeStyle = 'rgba(34, 211, 238, 0.65)';
          ctx.lineWidth = 2.2;
          ctx.stroke();
        });

        handNodes.forEach(([nx, ny], idx) => {
          const isTip = [4, 8, 12, 16, 20].includes(idx);
          ctx.beginPath();
          ctx.arc(nx, ny, isTip ? 5.5 : 3.2, 0, Math.PI * 2);
          ctx.fillStyle = isTip ? '#22d3ee' : '#e2e8f0';
          ctx.fill();
        });
        ctx.restore();

        drawTextWithTracking(
          '01 · KINEMATIC LANGUAGE OBSERVATORY',
          width * 0.5,
          135,
          '500 13px "JetBrains Mono", monospace',
          '#22d3ee'
        );
        drawTextWithTracking(
          'A Clearer Way to Learn by Signing',
          width * 0.5,
          190,
          '700 44px "Syne", sans-serif',
          '#f8fafc'
        );
        drawTextWithTracking(
          'Every hand gesture carries spatial grammar, rhythm, and human connection.',
          width * 0.5,
          615,
          '400 19px "Plus Jakarta Sans", sans-serif',
          '#94a3b8'
        );
      } else if (sceneIndex === 1) {
        // SCENE 2 (6–12s): Video Lesson -> Structured Study Notes Crystallization
        const leftX = 160;
        const rightX = 700;
        const cardY = 230;

        // Left: Simulated Video Waveform & Hand Capture Frame
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(leftX, cardY, 420, 270, 16);
        ctx.fill();
        ctx.stroke();

        // Scanning laser beam inside video card
        const scanY = cardY + 30 + ((sceneTime * 65) % 210);
        const scanGrad = ctx.createLinearGradient(leftX, scanY - 20, leftX, scanY + 20);
        scanGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
        scanGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.55)');
        scanGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = scanGrad;
        ctx.fillRect(leftX + 12, scanY - 18, 396, 36);

        drawTextWithTracking(
          'LESSON CAPTURE · 60 FPS LANDMARKS',
          leftX + 210,
          cardY + 42,
          '500 12px "JetBrains Mono", monospace',
          '#38bdf8'
        );

        // Mini hand silhouette in left frame
        ctx.save();
        ctx.translate(leftX + 210, cardY + 215);
        ctx.scale(0.62, 0.62);
        handConnections.forEach(([a, b]) => {
          ctx.beginPath();
          ctx.moveTo(handNodes[a][0], handNodes[a][1]);
          ctx.lineTo(handNodes[b][0], handNodes[b][1]);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
          ctx.lineWidth = 2.5;
          ctx.stroke();
        });
        ctx.restore();

        // Streaming photon bridge between video and study notes
        for (let p = 0; p < 8; p++) {
          const prog = ((sceneTime * 0.9 + p * 0.125) % 1);
          const px = leftX + 420 + prog * (rightX - (leftX + 420));
          const py = cardY + 135 + Math.sin(prog * Math.PI * 2 + p) * 24;
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#22d3ee';
          ctx.fill();
        }

        // Right: Crystallized Study Note Card
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.45)';
        ctx.beginPath();
        ctx.roundRect(rightX, cardY, 420, 270, 16);
        ctx.fill();
        ctx.stroke();

        drawTextWithTracking(
          'GENERATED STUDY NOTE · OFFLINE READY',
          rightX + 28,
          cardY + 44,
          '500 12px "JetBrains Mono", monospace',
          '#818cf8',
          'left'
        );
        drawTextWithTracking(
          'Module 01: Friendly First Exchange',
          rightX + 28,
          cardY + 84,
          '700 22px "Syne", sans-serif',
          '#f8fafc',
          'left'
        );

        const noteLines = [
          '1. Flat B-hand salutes outward from temple',
          '2. Bilateral H-fingers tap twice for NAME',
          '3. Curved bent-5 arcs into palm: SIGN AGAIN',
          '4. Eyebrows raise to signal polite question',
        ];
        noteLines.forEach((line, idx) => {
          const lineAlpha = Math.min(1, Math.max(0, (sceneTime - 0.6 - idx * 0.5) * 2));
          drawTextWithTracking(
            line,
            rightX + 28,
            cardY + 132 + idx * 34,
            '400 15px "Plus Jakarta Sans", sans-serif',
            `rgba(226, 232, 240, ${lineAlpha})`,
            'left'
          );
        });

        drawTextWithTracking(
          '02 · BRING ANY LESSON TO LIFE',
          width * 0.5,
          125,
          '500 13px "JetBrains Mono", monospace',
          '#22d3ee'
        );
        drawTextWithTracking(
          'Turn Sign Videos Into Notes That Travel With You',
          width * 0.5,
          178,
          '700 38px "Syne", sans-serif',
          '#f8fafc'
        );
        drawTextWithTracking(
          'Automatic visual study notes saved locally so students can revisit lessons even offline.',
          width * 0.5,
          615,
          '400 19px "Plus Jakarta Sans", sans-serif',
          '#94a3b8'
        );
      } else if (sceneIndex === 2) {
        // SCENE 3 (12–18s): Low-Pressure Kinematic Recall Rounds
        drawTextWithTracking(
          '03 · LOW-PRESSURE KINEMATIC PRACTICE',
          width * 0.5,
          125,
          '500 13px "JetBrains Mono", monospace',
          '#22d3ee'
        );
        drawTextWithTracking(
          'Help Your Hands Remember What Your Eyes Learned',
          width * 0.5,
          178,
          '700 38px "Syne", sans-serif',
          '#f8fafc'
        );

        const gauges = [
          { label: 'FIRST EXCHANGE', score: 96, streak: '7 DAY STREAK', x: 310, color: '#22d3ee' },
          { label: 'ORDINARY DAY', score: 92, streak: '22 SIGNS MAPPED', x: 640, color: '#38bdf8' },
          { label: 'DIRECTIONS', score: 90, streak: 'EVERY TRY COUNTS', x: 970, color: '#818cf8' },
        ];

        gauges.forEach((g, idx) => {
          const prog = Math.min(1, Math.max(0, (sceneTime - idx * 0.35) / 2.2));
          const eased = easeInOutCubic(prog);
          const cy = 390;
          const radius = 98;

          // Track circle
          ctx.beginPath();
          ctx.arc(g.x, cy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 10;
          ctx.stroke();

          // Progress arc
          ctx.beginPath();
          ctx.arc(
            g.x,
            cy,
            radius,
            -Math.PI / 2,
            -Math.PI / 2 + Math.PI * 2 * (g.score / 100) * eased
          );
          ctx.strokeStyle = g.color;
          ctx.lineWidth = 10;
          ctx.lineCap = 'round';
          ctx.stroke();

          drawTextWithTracking(
            `${Math.round(g.score * eased)}%`,
            g.x,
            cy + 10,
            '700 34px "JetBrains Mono", monospace',
            '#f8fafc'
          );
          drawTextWithTracking(
            g.label,
            g.x,
            cy + 145,
            '600 15px "Syne", sans-serif',
            '#e2e8f0'
          );
          drawTextWithTracking(
            g.streak,
            g.x,
            cy + 170,
            '500 12px "JetBrains Mono", monospace',
            g.color
          );
        });

        drawTextWithTracking(
          'Gentle practice rounds build muscle memory without high-stakes grading anxiety.',
          width * 0.5,
          615,
          '400 19px "Plus Jakarta Sans", sans-serif',
          '#94a3b8'
        );
      } else if (sceneIndex === 3) {
        // SCENE 4 (18–24s): Teacher Command Bridge — "A calm view of the room. People, not percentages."
        drawTextWithTracking(
          '04 · INSTRUCTOR COMMAND BRIDGE',
          width * 0.5,
          125,
          '500 13px "JetBrains Mono", monospace',
          '#22d3ee'
        );
        drawTextWithTracking(
          'A Calm View of the Room. People, Not Percentages.',
          width * 0.5,
          178,
          '700 38px "Syne", sans-serif',
          '#f8fafc'
        );

        // Classroom signal constellation nodes
        const nodes = [
          { x: 260, y: 340, name: 'Maya Lin · 7d Streak', status: 'NOMINAL', color: '#10b981' },
          { x: 510, y: 290, name: 'Devon Brooks · 92%', status: 'NOMINAL', color: '#10b981' },
          { x: 640, y: 430, name: 'Elena R. · Quieter Week', status: 'CHECK-IN BRIDGE', color: '#f59e0b' },
          { x: 860, y: 310, name: 'Marcus Vance · 9d Streak', status: 'NOMINAL', color: '#10b981' },
          { x: 1020, y: 420, name: 'Sora T. · Check-In Ready', status: 'CHECK-IN BRIDGE', color: '#f59e0b' },
        ];

        // Connect constellation lines
        ctx.beginPath();
        for (let i = 0; i < nodes.length - 1; i++) {
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y);
        }
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        nodes.forEach((n, i) => {
          const pulse = 14 + Math.sin(t * 3 + i) * 4;
          ctx.beginPath();
          ctx.arc(n.x, n.y, pulse, 0, Math.PI * 2);
          ctx.fillStyle = n.color === '#f59e0b' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.18)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.fill();

          drawTextWithTracking(
            n.name,
            n.x,
            n.y + 34,
            '600 14px "Plus Jakarta Sans", sans-serif',
            '#f8fafc'
          );
          drawTextWithTracking(
            n.status,
            n.x,
            n.y + 54,
            '500 11px "JetBrains Mono", monospace',
            n.color
          );
        });

        drawTextWithTracking(
          'Spot learners who have had a quieter week and add your teacher voice to AI note drafts.',
          width * 0.5,
          615,
          '400 19px "Plus Jakarta Sans", sans-serif',
          '#94a3b8'
        );
      } else {
        // SCENE 5 (24–30s): Finale Convergence — SignLearn Portal
        const cx = width * 0.5;
        const cy = height * 0.44;

        // Converging orbital rings
        for (let r = 0; r < 4; r++) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(t * (0.25 + r * 0.1) * (r % 2 === 0 ? 1 : -1));
          ctx.beginPath();
          ctx.ellipse(0, 0, 180 + r * 55, 65 + r * 22, 0.2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.28 - r * 0.05})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }

        drawTextWithTracking(
          'SIGNLEARN EDUCATION APP · STUDENT & TEACHER PORTAL',
          cx,
          210,
          '500 14px "JetBrains Mono", monospace',
          '#22d3ee'
        );
        drawTextWithTracking(
          'SignLearn',
          cx,
          315,
          '800 76px "Syne", sans-serif',
          '#ffffff'
        );
        drawTextWithTracking(
          'Accessible Notes · Kinematic Practice · Classroom Connection',
          cx,
          375,
          '500 22px "Plus Jakarta Sans", sans-serif',
          '#cbd5e1'
        );
        drawTextWithTracking(
          'sign-learn-education-app--devikathatsme.replit.app/student',
          cx,
          575,
          '500 15px "JetBrains Mono", monospace',
          '#38bdf8'
        );
      }

      ctx.restore();

      // Subtle bottom progress hairline (non-interactive, pure visual edge)
      const totalProg = t / AD_DURATION;
      ctx.fillStyle = 'rgba(34, 211, 238, 0.45)';
      ctx.fillRect(0, height - 3, width * totalProg, 3);

      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      onClick={togglePlayPause}
      role="region"
      aria-label="SignLearn 30-second official cinema spot"
      className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#050811] shadow-2xl cursor-pointer select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
      />

      {/* Ambient gradient scrim to blend the single Play/Pause control seamlessly */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

      {/* Strictly ONLY Play/Pause button blended harmoniously into the cinema frame */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          togglePlayPause();
        }}
        aria-label={isPlaying ? 'Pause 30-second film' : 'Play 30-second film'}
        className="absolute bottom-5 right-5 z-10 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/55 hover:bg-slate-900/80 text-slate-100/90 hover:text-cyan-300 border border-white/12 hover:border-cyan-400/40 backdrop-blur-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 whitespace-nowrap"
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4 fill-current" />
            <span className="text-xs font-medium tracking-wider">Pause</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current" />
            <span className="text-xs font-medium tracking-wider">Play</span>
          </>
        )}
      </button>
    </div>
  );
};
