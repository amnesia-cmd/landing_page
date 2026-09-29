import React, { useEffect, useRef, useState } from 'react';
import {
  SIGN_MODULES,
  SIGNLEARN_LIVE_URLS,
  STUDENT_SIGNALS,
  TEACHER_DRAFTS,
  SignModule,
} from '../data/signLearnData';
import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Play,
  RefreshCw,
  Sliders,
  Sparkles,
  Users,
  WifiOff,
} from 'lucide-react';

export const SpaceshipCommandDeck: React.FC = () => {
  const [deckMode, setDeckMode] = useState<'student' | 'teacher'>('student');
  const [selectedModuleId, setSelectedModuleId] = useState<string>(SIGN_MODULES[0].id);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [orbitalAngle, setOrbitalAngle] = useState<number>(18);
  const [isSynthesizingNote, setIsSynthesizingNote] = useState<boolean>(false);
  const [synthesizedComplete, setSynthesizedComplete] = useState<boolean>(false);

  // Interactive low-pressure practice state inside Student Deck
  const [activeSignIndex, setActiveSignIndex] = useState<number>(0);
  const [practiceCompletedSigns, setPracticeCompletedSigns] = useState<string[]>([
    'HELLO',
  ]);

  // Teacher mode state
  const [studentFilter, setStudentFilter] = useState<'all' | 'checkin'>('all');
  const [sentCheckIns, setSentCheckIns] = useState<string[]>([]);
  const [approvedDrafts, setApprovedDrafts] = useState<string[]>(['rev-01']);

  // Interactive Canvas HUD crosshair coordinates
  const [cursorCoords, setCursorCoords] = useState<{ x: number; y: number }>({
    x: 214,
    y: 148,
  });

  const activeModule: SignModule =
    SIGN_MODULES.find((m) => m.id === selectedModuleId) || SIGN_MODULES[0];

  const telemetryCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = telemetryCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = 760);
    const height = (canvas.height = 420);
    let rafId: number;
    const startTime = performance.now();

    // Preset-specific hand pose variations
    const presetOffsets: Record<SignModule['handPosePreset'], number> = {
      greeting: 0.0,
      rhythm: 0.85,
      directions: 1.75,
      family: 2.65,
    };

    const baseHand: [number, number, number][] = [
      [0, 115, 0],
      [-45, 78, 12], [-78, 36, 22], [-102, -8, 28], [-118, -46, 35],
      [-38, 4, 0], [-52, -62, 6], [-60, -112, 12], [-65, -152, 18],
      [-6, -4, 0], [-10, -78, 4], [-12, -130, 10], [-14, -174, 14],
      [24, 6, -4], [30, -60, 0], [35, -108, 6], [38, -148, 10],
      [52, 24, -8], [68, -32, -4], [80, -74, 2], [90, -110, 8],
    ];

    const edges: [number, number][] = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [0, 9], [9, 10], [10, 11], [11, 12],
      [0, 13], [13, 14], [14, 15], [15, 16],
      [0, 17], [17, 18], [18, 19], [19, 20],
      [5, 9], [9, 13], [13, 17],
    ];

    const draw = (now: number) => {
      const elapsed = ((now - startTime) * 0.001) * playbackSpeed;
      const phase = presetOffsets[activeModule.handPosePreset] || 0;

      ctx.clearRect(0, 0, width, height);

      // Deep cockpit grid backdrop
      ctx.fillStyle = '#060a15';
      ctx.fillRect(0, 0, width, height);

      // Polar radar & Cartesian grid lines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.75)';
      ctx.lineWidth = 1;
      for (let x = 40; x < width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 40; y < height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const cx = width * 0.5;
      const cy = height * 0.54;

      // Concentric calibration rings
      [65, 130, 195].forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(cx, cy - 25, r, 0, Math.PI * 2);
        ctx.strokeStyle =
          idx === 1 ? 'rgba(6, 182, 212, 0.22)' : 'rgba(148, 163, 184, 0.12)';
        ctx.stroke();
      });

      // Rotate and project 21-point hand model
      const radY = (orbitalAngle * Math.PI) / 180 + Math.sin(elapsed * 1.4 + phase) * 0.32;
      const radX = Math.cos(elapsed * 1.1 + phase) * 0.16;

      const projected = baseHand.map(([bx, by, bz], idx) => {
        // Dynamic finger articulation based on active module preset
        const fingerWave =
          idx > 4
            ? Math.sin(elapsed * 2.4 + phase + idx * 0.35) * 14
            : Math.cos(elapsed * 1.8 + phase) * 8;

        const nx = bx + fingerWave * 0.45;
        const ny = by + Math.sin(elapsed * 2 + idx) * 5;
        const nz = bz + fingerWave;

        const cosY = Math.cos(radY);
        const sinY = Math.sin(radY);
        const x1 = nx * cosY + nz * sinY;
        const z1 = -nx * sinY + nz * cosY;

        const cosX = Math.cos(radX);
        const sinX = Math.sin(radX);
        const y2 = ny * cosX - z1 * sinX;

        return {
          x: cx + x1 * 1.12,
          y: cy + y2 * 1.12,
        };
      });

      // Motion trajectory arc for fingertips
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.arc(
        cx,
        cy - 45,
        145,
        -Math.PI * 0.75 + Math.sin(elapsed) * 0.2,
        -Math.PI * 0.25 + Math.sin(elapsed) * 0.2
      );
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Draw skeletal vectors
      edges.forEach(([a, b]) => {
        const p1 = projected[a];
        const p2 = projected[b];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle =
          deckMode === 'student'
            ? 'rgba(34, 211, 238, 0.78)'
            : 'rgba(129, 140, 248, 0.78)';
        ctx.lineWidth = 2.2;
        ctx.stroke();
      });

      // Draw landmarks
      projected.forEach((pt, idx) => {
        const isTip = [4, 8, 12, 16, 20].includes(idx);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isTip ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = isTip ? '#22d3ee' : '#f8fafc';
        ctx.fill();
      });

      // Bottom-left waveform telemetry ribbon inside canvas
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i < 180; i += 4) {
        const wx = 24 + i;
        const wy =
          height -
          28 +
          Math.sin(i * 0.08 + elapsed * 4) * 8 +
          Math.cos(i * 0.03 - elapsed * 2) * 5;
        if (i === 0) ctx.moveTo(wx, wy);
        else ctx.lineTo(wx, wy);
      }
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.65)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [activeModule, playbackSpeed, orbitalAngle, deckMode]);

  const handleTriggerSynthesis = () => {
    setIsSynthesizingNote(true);
    setSynthesizedComplete(false);
    setTimeout(() => {
      setIsSynthesizingNote(false);
      setSynthesizedComplete(true);
    }, 900);
  };

  const handlePracticeSignToggle = (sign: string, idx: number) => {
    setActiveSignIndex(idx);
    if (!practiceCompletedSigns.includes(sign)) {
      setPracticeCompletedSigns((prev) => [...prev, sign]);
    }
  };

  const handleSendCheckIn = (studentId: string) => {
    if (!sentCheckIns.includes(studentId)) {
      setSentCheckIns((prev) => [...prev, studentId]);
    }
  };

  const handleApproveDraft = (draftId: string) => {
    if (!approvedDrafts.includes(draftId)) {
      setApprovedDrafts((prev) => [...prev, draftId]);
    }
  };

  const filteredStudents =
    studentFilter === 'all'
      ? STUDENT_SIGNALS
      : STUDENT_SIGNALS.filter((s) => s.status === 'CHECK-IN NEEDED');

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-[#070B14]/90 backdrop-blur-2xl overflow-hidden shadow-2xl">
      {/* 1. Top Telemetry Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 border-b border-slate-800/90 bg-[#0A0F1E]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" />
            <span className="text-xs font-mono tabular-nums tracking-wider text-slate-200">
              NOMINAL · OFFLINE CACHE READY
            </span>
          </div>
          <span className="hidden sm:inline text-slate-600" aria-hidden="true">
            ·
          </span>
          <span className="hidden sm:inline text-xs font-mono tabular-nums text-slate-400">
            LAST SYNC 09:42 AM
          </span>
        </div>

        {/* Mode Switcher: Student Flight Deck vs Instructor Command Bridge */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-900 border border-slate-800">
          <button
            type="button"
            onClick={() => setDeckMode('student')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all duration-150 whitespace-nowrap ${
              deckMode === 'student'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Student Flight Deck (/student)
          </button>
          <button
            type="button"
            onClick={() => setDeckMode('teacher')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all duration-150 whitespace-nowrap ${
              deckMode === 'teacher'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Instructor Bridge (/teacher)
          </button>
        </div>

        <a
          href={
            deckMode === 'student'
              ? SIGNLEARN_LIVE_URLS.student
              : SIGNLEARN_LIVE_URLS.teacher
          }
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors whitespace-nowrap"
        >
          <span>
            Open Live {deckMode === 'student' ? 'Student' : 'Teacher'} Portal
          </span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 2. Main Split Console Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Control & Parameter Column (4 cols on desktop) */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-800/90 p-5 flex flex-col justify-between bg-[#080D1A]/70">
          {deckMode === 'student' ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    SignLearn Curriculum Modules
                  </span>
                  <span className="text-xs font-mono tabular-nums text-cyan-400">
                    4 Active
                  </span>
                </div>
                <div className="space-y-2">
                  {SIGN_MODULES.map((mod) => {
                    const isSelected = mod.id === activeModule.id;
                    return (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => {
                          setSelectedModuleId(mod.id);
                          setActiveSignIndex(0);
                          setSynthesizedComplete(false);
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 ${
                          isSelected
                            ? 'border-cyan-500/50 bg-cyan-950/25 text-white'
                            : 'border-slate-800/80 bg-slate-900/40 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold truncate">
                            {mod.index}. {mod.title}
                          </span>
                          <span className="text-xs font-mono tabular-nums text-cyan-300 shrink-0">
                            {mod.accuracyRate}%
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-400 font-mono tabular-nums">
                          <span>{mod.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{mod.signsCount} signs</span>
                          <span aria-hidden="true">·</span>
                          <span>{mod.duration}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Kinematic Calibration Sliders */}
              <div className="pt-4 border-t border-slate-800/80 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Kinematic Viewport Calibration</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400">Signing Cadence</span>
                    <span className="text-cyan-300 tabular-nums">
                      {playbackSpeed.toFixed(2)}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="2.0"
                    step="0.1"
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                    aria-label="Signing cadence multiplier"
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400">Camera Azimuth Angle</span>
                    <span className="text-cyan-300 tabular-nums">
                      {orbitalAngle > 0 ? `+${orbitalAngle}°` : `${orbitalAngle}°`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-60"
                    max="60"
                    step="2"
                    value={orbitalAngle}
                    onChange={(e) => setOrbitalAngle(parseInt(e.target.value, 10))}
                    aria-label="Camera azimuth angle"
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Classroom Signal Roster
                  </span>
                  <span className="text-xs font-mono text-amber-300 tabular-nums">
                    2 Quieter This Week
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  People, not percentages. A focused list of the students you are
                  guiding, with just enough context to know where to lean in.
                </p>

                {/* Filter Control */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-900 border border-slate-800 mb-3">
                  <button
                    type="button"
                    onClick={() => setStudentFilter('all')}
                    className={`flex-1 py-1.5 px-2.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      studentFilter === 'all'
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    All Students ({STUDENT_SIGNALS.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStudentFilter('checkin')}
                    className={`flex-1 py-1.5 px-2.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      studentFilter === 'checkin'
                        ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Needs Check-In (2)
                  </button>
                </div>

                <div className="space-y-2.5 max-h-[310px] overflow-y-auto pr-1">
                  {filteredStudents.map((st) => {
                    const isCheckedIn = sentCheckIns.includes(st.id);
                    return (
                      <div
                        key={st.id}
                        className="p-3.5 rounded-xl border border-slate-800/90 bg-slate-900/50 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-slate-100">
                            {st.name}
                          </span>
                          <span
                            className={`text-[11px] font-mono tabular-nums ${
                              st.status === 'NOMINAL'
                                ? 'text-emerald-400'
                                : 'text-amber-300'
                            }`}
                          >
                            {st.status === 'NOMINAL'
                              ? `● NOMINAL · ${st.score}%`
                              : `▲ CHECK-IN · ${st.score}%`}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {st.noteSummary}
                        </p>
                        <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-slate-400 tabular-nums">
                          <span>
                            {st.streakDays}d streak · {st.lessonsCompleted} lessons
                          </span>
                          {st.status === 'CHECK-IN NEEDED' && (
                            <button
                              type="button"
                              onClick={() => handleSendCheckIn(st.id)}
                              className={`px-2.5 py-1 rounded text-xs font-sans font-medium transition-colors whitespace-nowrap ${
                                isCheckedIn
                                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30'
                              }`}
                            >
                              {isCheckedIn ? 'Check-In Sent ✓' : 'Send Warm Check-In'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Execution Trigger in Left Column */}
          <div className="mt-6 pt-4 border-t border-slate-800/90">
            <button
              type="button"
              onClick={handleTriggerSynthesis}
              disabled={isSynthesizingNote}
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs tracking-wide transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              {isSynthesizingNote ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Making Your Study Notes...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {synthesizedComplete
                      ? 'Notes Crystallized for Offline Sync ✓'
                      : 'Simulate Video-to-Notes Synthesis'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Center / Right Main Viewport & Telemetry Tray (8 cols on desktop) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-[#060A15]">
          {/* Interactive 21-Point Hand Constellation Canvas Viewport */}
          <div
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setCursorCoords({
                x: Math.round(e.clientX - rect.left),
                y: Math.round(e.clientY - rect.top),
              });
            }}
            className="relative w-full h-[340px] sm:h-[380px] border-b border-slate-800/90 overflow-hidden cursor-crosshair"
          >
            <canvas
              ref={telemetryCanvasRef}
              className="w-full h-full object-cover block"
            />

            {/* Top-Left Viewport HUD Overlay */}
            <div className="absolute top-4 left-4 pointer-events-none space-y-1">
              <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
                {activeModule.index} · {activeModule.title}
              </div>
              <div className="text-xs font-mono text-slate-400 tabular-nums">
                ACTIVE SIGN:{' '}
                <span className="text-white font-semibold">
                  {activeModule.keySigns[activeSignIndex] || activeModule.keySigns[0]}
                </span>{' '}
                · LANDMARKS: 21 PT · CADENCE: {playbackSpeed.toFixed(1)}X
              </div>
            </div>

            {/* Top-Right Viewport HUD Metrics */}
            <div className="absolute top-4 right-4 pointer-events-none text-right font-mono tabular-nums">
              <div className="text-xs text-slate-400">CLASS RECALL ACCURACY</div>
              <div className="text-2xl font-bold text-white">
                {activeModule.accuracyRate.toFixed(1)}
                <span className="text-xs text-cyan-400 ml-1">%</span>
              </div>
            </div>

            {/* Bottom-Right Crosshair Probe Readout */}
            <div className="absolute bottom-3.5 right-4 pointer-events-none flex items-center gap-2 text-[11px] font-mono tabular-nums text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                PROBE X:{cursorCoords.x} Y:{cursorCoords.y} · AZIMUTH {orbitalAngle}°
              </span>
            </div>

            {/* Interactive Sign Selector Bar inside Viewport */}
            <div className="absolute bottom-3.5 left-4 flex flex-wrap items-center gap-1.5 max-w-[70%]">
              {activeModule.keySigns.map((sign, idx) => {
                const isCurrent = idx === activeSignIndex;
                const isDone = practiceCompletedSigns.includes(sign);
                return (
                  <button
                    key={sign}
                    type="button"
                    onClick={() => handlePracticeSignToggle(sign, idx)}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-all duration-150 whitespace-nowrap ${
                      isCurrent
                        ? 'bg-cyan-500 text-slate-950 font-semibold'
                        : isDone
                        ? 'bg-slate-900/90 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {sign} {isDone ? '✓' : ''}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Telemetry & Study Note Crystallization Tray */}
          <div className="p-5 sm:p-6 bg-[#080D1A]/90">
            {deckMode === 'student' ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Notes That Travel With You — Spatial Keyframe Breakdown
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {activeModule.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 tabular-nums">
                    <WifiOff className="w-3.5 h-3.5" />
                    <span>Saved Locally · Available Offline</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {activeModule.keyframeNotes.map((kf) => (
                    <div
                      key={kf.step}
                      className="p-3.5 rounded-xl border border-slate-800/90 bg-slate-950/65 space-y-1.5"
                    >
                      <div className="text-xs font-mono text-cyan-300">
                        {kf.step}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 tabular-nums">
                        {kf.motionVector}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">
                        {kf.instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Add Your Teacher Voice — AI Note Review Queue (/teacher/review)
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Compare AI-generated lesson notes with the original signing video
                      and publish corrections to student devices.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 tabular-nums">
                    2 Drafts Analyzed
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {TEACHER_DRAFTS.map((draft) => {
                    const isApproved = approvedDrafts.includes(draft.id);
                    return (
                      <div
                        key={draft.id}
                        className="p-4 rounded-xl border border-slate-800/90 bg-slate-950/65 space-y-2.5 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2 text-xs font-mono tabular-nums">
                            <span className="text-slate-400">
                              {draft.capturedFrom}
                            </span>
                            <span className="text-cyan-400">
                              CONFIDENCE {draft.confidence}
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-white">
                            {draft.lessonTitle}
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {draft.generatedNote}
                          </p>
                          <p className="text-xs text-cyan-200/90 leading-relaxed pt-1 border-t border-slate-800/80">
                            {draft.teacherCorrection}
                          </p>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-[11px] font-mono text-slate-400">
                            {isApproved ? '● SYNCED TO STUDENT NOTES' : '▲ DRAFT READY'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleApproveDraft(draft.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                              isApproved
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                                : 'bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400'
                            }`}
                          >
                            {isApproved ? (
                              <span className="inline-flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Saved to Notes
                              </span>
                            ) : (
                              'Save Correction to Class'
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
