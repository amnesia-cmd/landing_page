/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Layers,
  Play,
  Sparkles,
  WifiOff,
} from 'lucide-react';
import { CosmicBackgroundCanvas } from './components/CosmicBackgroundCanvas';
import { SignLearnAdPlayer } from './components/SignLearnAdPlayer';
import { SpaceshipCommandDeck } from './components/SpaceshipCommandDeck';
import { ResilientCosmicImage } from './components/ResilientCosmicImage';
import {
  GENERATED_ASSETS,
  SIGN_MODULES,
  SIGNLEARN_LIVE_URLS,
} from './data/signLearnData';

export default function App() {
  const [selectedRouteTab, setSelectedRouteTab] = useState<
    'upload' | 'practice' | 'notes' | 'teacher'
  >('upload');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'student' | 'teacher'>('student');
  const [inviteStatus, setInviteStatus] = useState<'idle' | 'error' | 'sent'>('idle');

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteEmail.trim())) {
      setInviteStatus('error');
      return;
    }
    setInviteStatus('sent');
  };

  return (
    <div className="relative min-h-screen bg-[#06080F] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Continuous Looping JS Cosmic Background Video/Animation */}
      <CosmicBackgroundCanvas />

      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06080F]/80 backdrop-blur-xl">
        <div className="max-w-[1240px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-display text-xl font-bold tracking-tight text-white hover:text-cyan-300 transition-colors"
          >
            SignLearn
          </a>

          {/* Zone 2: 5 single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a
              href="#cinema-spot"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              30s Film
            </a>
            <a
              href="#architecture"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Architecture
            </a>
            <a
              href="#command-deck"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Command Deck
            </a>
            <a
              href="#curriculum"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Curriculum
            </a>
            <a
              href="#impact"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Impact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3">
            <a
              href={SIGNLEARN_LIVE_URLS.student}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
            >
              <span>Launch Student App</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* SECTION 1: HERO PROPOSITION */}
        <section className="pt-16 pb-24 md:pt-24 md:pb-32 px-6">
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Unboxed quiet metadata kicker */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono tabular-nums text-cyan-300 tracking-wide">
                <span>SIGNLEARN EDUCATION PORTAL</span>
                <span aria-hidden="true">·</span>
                <span>STUDENT &amp; TEACHER WORKSPACES</span>
                <span aria-hidden="true">·</span>
                <span>OFFLINE-READY NOTES</span>
              </div>

              <h1
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]"
                style={{ textWrap: 'balance' }}
              >
                A clearer way to learn by signing across every classroom orbit.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-[64ch]">
                SignLearn transforms sign-language video lessons into structured
                visual study notes, low-pressure kinematic recall rounds, and calm
                classroom check-ins for students and teachers—even when the
                internet drops.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={SIGNLEARN_LIVE_URLS.student}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-sm transition-all duration-150 inline-flex items-center gap-2 shadow-lg shadow-cyan-500/20 whitespace-nowrap"
                >
                  <span>Enter Student Workspace (/student)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#cinema-spot"
                  className="px-5 py-3.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-100 font-medium text-sm transition-all duration-150 inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <Play className="w-4 h-4 text-cyan-300 fill-current" />
                  <span>Watch 30s Official Film</span>
                </a>
              </div>

              {/* Unboxed Telemetry Proof Row */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold tabular-nums text-white">
                    21<span className="text-xs font-mono text-cyan-400 ml-1">PT</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Hand Landmark Vectors
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold tabular-nums text-white">
                    100<span className="text-xs font-mono text-cyan-400 ml-1">%</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Offline Note Persistence
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold tabular-nums text-white">
                    92.4<span className="text-xs font-mono text-cyan-400 ml-1">%</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    7-Day Sign Recall Rate
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Glass Observatory Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="cosmic-glass-elevated rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono tabular-nums text-slate-300">
                  <span>OBSERVATORY FEED · MODULE 01</span>
                  <span className="text-cyan-300">● LIVE KINEMATICS</span>
                </div>

                <ResilientCosmicImage
                  src={GENERATED_ASSETS.hero}
                  alt="Futuristic cosmic sign-language learning observatory with glowing cyan hand constellation vectors"
                  aspectClass="aspect-video"
                  caption="Spatial hand-tracking converts expressive ASL motion into portable visual study notes."
                  telemetryTag="60 FPS · AZIMUTH +38°"
                />

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-950/75 border border-white/8">
                    <div className="text-[11px] font-mono text-slate-400">
                      CURRENT STREAK
                    </div>
                    <div className="text-lg font-mono font-semibold text-white tabular-nums mt-0.5">
                      7 Day Streak
                    </div>
                    <div className="text-xs text-cyan-300 mt-1">
                      Every try is useful practice.
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/75 border border-white/8">
                    <div className="text-[11px] font-mono text-slate-400">
                      LOCAL DEVICE SYNC
                    </div>
                    <div className="text-lg font-mono font-semibold text-emerald-400 tabular-nums mt-0.5">
                      Offline Ready
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      Notes that travel with you.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: 30-SECOND PROCEDURAL JS VIDEO AD */}
        <section id="cinema-spot" className="py-20 md:py-28 px-6 border-t border-white/8">
          <div className="max-w-[1240px] mx-auto space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 tabular-nums">
                  <span>01. OFFICIAL 30-SECOND SPOT</span>
                  <span aria-hidden="true">·</span>
                  <span>REAL-TIME JS CANVAS CINEMA</span>
                  <span aria-hidden="true">·</span>
                  <span>00:30 LOOP</span>
                </div>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Signal Across Space — Experience how SignLearn bridges eyes, hands, and classrooms.
                </h2>
              </div>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                Rendered live in JavaScript at 60 frames per second with seamless
                warp transitions across all five core pillars of the SignLearn
                platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <SignLearnAdPlayer />
            </motion.div>

            {/* Unboxed 5-Scene Chapter Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 pt-4 border-t border-white/8 text-xs">
              <div>
                <div className="font-mono text-cyan-400 tabular-nums">00:00 – 00:06</div>
                <div className="font-semibold text-slate-200 mt-1">
                  01. Gesture Constellation
                </div>
                <p className="text-slate-400 mt-0.5">
                  21-point hand anatomy mapped in deep space.
                </p>
              </div>
              <div>
                <div className="font-mono text-cyan-400 tabular-nums">00:06 – 00:12</div>
                <div className="font-semibold text-slate-200 mt-1">
                  02. Video-to-Notes
                </div>
                <p className="text-slate-400 mt-0.5">
                  Lessons crystallize into structured study guides.
                </p>
              </div>
              <div>
                <div className="font-mono text-cyan-400 tabular-nums">00:12 – 00:18</div>
                <div className="font-semibold text-slate-200 mt-1">
                  03. Kinematic Recall
                </div>
                <p className="text-slate-400 mt-0.5">
                  Low-pressure rounds that build muscle memory.
                </p>
              </div>
              <div>
                <div className="font-mono text-cyan-400 tabular-nums">00:18 – 00:24</div>
                <div className="font-semibold text-slate-200 mt-1">
                  04. Calm Classroom View
                </div>
                <p className="text-slate-400 mt-0.5">
                  People, not percentages—gentle check-in signals.
                </p>
              </div>
              <div>
                <div className="font-mono text-cyan-400 tabular-nums">00:24 – 00:30</div>
                <div className="font-semibold text-slate-200 mt-1">
                  05. Offline Resilience
                </div>
                <p className="text-slate-400 mt-0.5">
                  Notes and progress saved locally on your device.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SPACESHIP COMMAND DASHBOARD */}
        <section id="command-deck" className="py-20 md:py-28 px-6 border-t border-white/8">
          <div className="max-w-[1240px] mx-auto space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 tabular-nums">
                  <span>02. INTERACTIVE SPACESHIP COMMAND DECK</span>
                  <span aria-hidden="true">·</span>
                  <span>LIVE TELEMETRY CONSOLE</span>
                </div>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Pilot the SignLearn Student Flight Deck and Instructor Command Bridge.
                </h2>
              </div>
              <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                Switch between the Student (`/student`) and Teacher (`/teacher`)
                consoles below to calibrate signing cadence, inspect 21-point hand
                trajectories, and test offline note synthesis.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpaceshipCommandDeck />
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: ASYMMETRIC BENTO ARCHITECTURE (DEEP DIVE INTO THE MAIN APP) */}
        <section id="architecture" className="py-20 md:py-28 px-6 border-t border-white/8">
          <div className="max-w-[1240px] mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65 }}
              className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 tabular-nums">
                  <span>03. APPLICATION ARCHITECTURE</span>
                  <span aria-hidden="true">·</span>
                  <span>INSIDE SIGNLEARN</span>
                </div>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Built around how eyes observe, hands remember, and teachers guide.
                </h2>
              </div>

              {/* Interactive Route Inspector Filter */}
              <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
                {(
                  [
                    { id: 'upload', label: '01. Lesson Capture' },
                    { id: 'practice', label: '02. Recall Practice' },
                    { id: 'notes', label: '03. Offline Notes' },
                    { id: 'teacher', label: '04. Teacher Bridge' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedRouteTab(tab.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                      selectedRouteTab === tab.id
                        ? 'bg-cyan-400 text-slate-950 font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Asymmetric Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Feature 01: Col-Span-7 */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className={`lg:col-span-7 rounded-2xl p-6 sm:p-8 cosmic-glass flex flex-col justify-between transition-colors ${
                  selectedRouteTab === 'upload'
                    ? 'border-cyan-400/50'
                    : 'border-white/10'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-300 tabular-nums">
                    <span>01. BRING A LESSON TO LIFE</span>
                    <span>ROUTE · /student/upload</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Drop a signing video. Receive structured study notes in seconds.
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Students and educators can upload any sign-language lesson clip
                    to automatically extract keyframe postures, spatial grammar cues,
                    and clear step-by-step practice sequences. Teachers can review AI
                    note drafts, compare them side-by-side with the original video,
                    and add their own voice before publishing.
                  </p>
                </div>

                <div className="mt-6">
                  <ResilientCosmicImage
                    src={GENERATED_ASSETS.lessonNotes}
                    alt="Sign language video lesson transforming into structured visual study notes"
                    aspectClass="aspect-[16/10]"
                    caption="AI Note Review lets teachers refine generated drafts or keep notes local."
                    telemetryTag="SYNTHESIS · 98.4% CONFIDENCE"
                  />
                </div>
              </motion.div>

              {/* Feature 02: Col-Span-5 */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`lg:col-span-5 rounded-2xl p-6 sm:p-8 cosmic-glass flex flex-col justify-between transition-colors ${
                  selectedRouteTab === 'practice'
                    ? 'border-cyan-400/50'
                    : 'border-white/10'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-300 tabular-nums">
                    <span>02. KINEMATIC RECALL</span>
                    <span>ROUTE · /student</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Low-pressure rounds to help your hands remember what your eyes learned.
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Instead of punitive timers, SignLearn guides students through
                    calm daily practice rounds. Missed signs are gently queued for
                    revisit so every attempt builds lasting motor confidence.
                  </p>
                </div>

                <div className="mt-6">
                  <ResilientCosmicImage
                    src={GENERATED_ASSETS.kinematicPractice}
                    alt="Close-up of hands performing American Sign Language inside a holographic spatial calibration grid"
                    aspectClass="aspect-[4/3]"
                    caption="Every try is useful practice—track 7-day streaks and revisit missed gestures."
                    telemetryTag="LOW-PRESSURE RECALL"
                  />
                </div>
              </motion.div>

              {/* Feature 03: Col-Span-5 */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className={`lg:col-span-5 rounded-2xl p-6 sm:p-8 cosmic-glass flex flex-col justify-between transition-colors ${
                  selectedRouteTab === 'notes'
                    ? 'border-cyan-400/50'
                    : 'border-white/10'
                }`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-300 tabular-nums">
                    <span>03. NOTES THAT TRAVEL WITH YOU</span>
                    <span>OFFLINE-FIRST ENGINE</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Available when the internet drops. Ready on any device.
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Everything a student creates or saves is cached locally on their
                    device for a quick review before class or a deeper revisit on the
                    bus ride home—with multi-language support so learners study in
                    their own language.
                  </p>

                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">LOCAL STORAGE STATUS</span>
                      <span className="text-emerald-400 tabular-nums">
                        ● ACTIVE · SYNCED 09:42 AM
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">LANGUAGE ACCESSIBILITY</span>
                      <span className="text-cyan-300">
                        Multi-Language Transcripts
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">PORTABILITY</span>
                      <span className="text-slate-200">
                        Instant JSON &amp; Note Snapshot Export
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Explore saved study notes directly in the student portal
                  </span>
                  <a
                    href={SIGNLEARN_LIVE_URLS.student}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-1 whitespace-nowrap"
                  >
                    <span>Open Notes</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>

              {/* Feature 04: Col-Span-7 */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`lg:col-span-7 rounded-2xl p-6 sm:p-8 cosmic-glass flex flex-col justify-between transition-colors ${
                  selectedRouteTab === 'teacher'
                    ? 'border-cyan-400/50'
                    : 'border-white/10'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-300 tabular-nums">
                    <span>04. A CALM VIEW OF THE ROOM</span>
                    <span>ROUTE · /teacher/students</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    The signal from your class, without the noise. People, not percentages.
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    SignLearn’s teacher dashboard replaces overwhelming spreadsheets
                    with thoughtful human signals. Spot the four learners who have
                    had a quieter week, send a kind check-in bridge, and review
                    Monday snapshots of class activity at a glance.
                  </p>
                </div>

                <div className="mt-6">
                  <ResilientCosmicImage
                    src={GENERATED_ASSETS.teacherBridge}
                    alt="Futuristic spacecraft-inspired educational command bridge displaying student sign-language mastery curves"
                    aspectClass="aspect-[16/9]"
                    caption="Small signals matter: gentle classroom nudges highlight when a learner needs a check-in."
                    telemetryTag="TEACHER BRIDGE · /teacher"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CURRICULUM CONSTELLATION & MODULE SPECIFICATIONS */}
        <section id="curriculum" className="py-20 md:py-28 px-6 border-t border-white/8">
          <div className="max-w-[1240px] mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65 }}
              className="space-y-3 max-w-2xl"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 tabular-nums">
                <span>04. SIGN CURRICULUM SEQUENCES</span>
                <span aria-hidden="true">·</span>
                <span>PRACTICAL DIALOGUE MODULES</span>
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                From a friendly first exchange to navigating the rhythm of an ordinary day.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SIGN_MODULES.map((mod, idx) => (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  className="p-6 sm:p-7 rounded-2xl cosmic-glass flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 tabular-nums">
                      <span>
                        {mod.index} · {mod.category.toUpperCase()}
                      </span>
                      <span className="text-cyan-300">
                        {mod.signsCount} SIGNS · {mod.duration.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                      {mod.index}. {mod.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {mod.summary}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="text-xs font-mono text-slate-400">
                      KEY VOCABULARY SEQUENCE:{' '}
                      <span className="text-slate-200">
                        {mod.keySigns.join(' · ')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-mono text-emerald-400 tabular-nums">
                        ● {mod.accuracyRate}% CLASS COMPLETION
                      </span>
                      <a
                        href={SIGNLEARN_LIVE_URLS.student}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-1 whitespace-nowrap"
                      >
                        <span>Practice Module in App</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: QUANTITATIVE PROOF & ATTRIBUTABLE EDUCATOR OUTCOMES */}
        <section id="impact" className="py-20 md:py-28 px-6 border-t border-white/8">
          <div className="max-w-[1240px] mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65 }}
              className="space-y-3 max-w-2xl"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 tabular-nums">
                <span>05. EMPIRICAL CLASSROOM IMPACT</span>
                <span aria-hidden="true">·</span>
                <span>VERIFIED OUTCOMES</span>
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Quiet progress that becomes visible week after week.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="p-6 sm:p-7 rounded-2xl cosmic-glass space-y-4">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  DAILY PRACTICE RETENTION
                </div>
                <div className="text-4xl font-mono font-bold text-white tabular-nums">
                  +64.2<span className="text-sm text-cyan-400 ml-1">%</span>
                </div>
                <div className="text-xs font-mono text-emerald-400 tabular-nums">
                  DELTA: +3.4 SESSIONS / WEEK OVER 8 WEEKS
                </div>
                <p className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-white/10">
                  Replacing timed high-stakes drills with SignLearn’s low-pressure
                  recall rounds increased voluntary student practice streaks across
                  introductory ASL cohorts.
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl cosmic-glass space-y-4">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  LESSON-TO-NOTE TURNAROUND
                </div>
                <div className="text-4xl font-mono font-bold text-white tabular-nums">
                  42<span className="text-sm text-cyan-400 ml-1">SEC</span>
                </div>
                <div className="text-xs font-mono text-emerald-400 tabular-nums">
                  DOWN FROM 45 MIN MANUAL TRANSCRIPTION
                </div>
                <p className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-white/10">
                  Teachers upload classroom demonstration videos and publish
                  reviewed, student-ready visual study guides in under a minute.
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl cosmic-glass flex flex-col justify-between space-y-4">
                <blockquote className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  “Before SignLearn, students who missed a subtle handshape pivot in
                  class had no way to review offline on their commute. Now our Monday
                  snapshot shows who had a quieter week so I can check in warmly
                  before anyone falls behind.”
                </blockquote>
                <div className="pt-4 border-t border-white/10">
                  <div className="text-sm font-semibold text-white">
                    Dr. Hannah Morales
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Lead Deaf Studies &amp; ASL Curriculum Coordinator · Pacific
                    Visual Language Academy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: CONVERSION / LAUNCH & CLASSROOM INVITE */}
        <section className="py-20 md:py-28 px-6 border-t border-white/8">
          <div className="max-w-[1240px] mx-auto">
            <div className="cosmic-glass-elevated rounded-3xl p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 tabular-nums">
                  <span>06. LAUNCH MISSION</span>
                  <span aria-hidden="true">·</span>
                  <span>DIRECT PORTAL ACCESS</span>
                </div>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Step into the live SignLearn classroom today.
                </h2>
                <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                  Launch directly into the live Student or Teacher experience on
                  Replit, or request a pre-configured classroom invite link with
                  offline note sync enabled.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href={SIGNLEARN_LIVE_URLS.student}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-sm transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>Launch Student App (/student)</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a
                    href={SIGNLEARN_LIVE_URLS.teacher}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>Open Teacher Dashboard (/teacher)</span>
                    <ArrowUpRight className="w-4 h-4 text-cyan-300" />
                  </a>
                </div>
              </div>

              {/* Validated Classroom Invite Dispatch Form */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950/80 border border-white/10 space-y-4">
                <div className="text-sm font-semibold text-white">
                  Request Classroom Setup &amp; Invite Link
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Invite links are ready in the full classroom setup. Enter your
                  school or personal email to receive a direct workspace link.
                </p>

                <form onSubmit={handleInviteSubmit} className="space-y-3.5" noValidate>
                  <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-900 border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setInviteRole('student')}
                      className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                        inviteRole === 'student'
                          ? 'bg-cyan-500 text-slate-950 font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Student Learner
                    </button>
                    <button
                      type="button"
                      onClick={() => setInviteRole('teacher')}
                      className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                        inviteRole === 'teacher'
                          ? 'bg-cyan-500 text-slate-950 font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Classroom Teacher
                    </button>
                  </div>

                  <div>
                    <label htmlFor="invite-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="invite-email"
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => {
                        setInviteEmail(e.target.value);
                        if (inviteStatus !== 'idle') setInviteStatus('idle');
                      }}
                      placeholder="you@school.edu"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    {inviteStatus === 'error' && (
                      <p className="text-xs text-rose-400 mt-1.5">
                        Please enter a valid email address to receive your classroom
                        link.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-semibold text-xs tracking-wide transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {inviteStatus === 'sent'
                      ? `Invite Dispatched for ${
                          inviteRole === 'student' ? 'Student' : 'Teacher'
                        } Role ✓`
                      : 'Send Classroom Invite Link'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="relative z-10 border-t border-white/10 py-10 px-6 bg-[#04060B]/90">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-slate-200 text-sm">
              SignLearn
            </span>
            <span aria-hidden="true">·</span>
            <span>Accessible sign-language learning for students and teachers.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href={SIGNLEARN_LIVE_URLS.student}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Student Portal (/student)
            </a>
            <a
              href={SIGNLEARN_LIVE_URLS.studentUpload}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Upload Lesson (/student/upload)
            </a>
            <a
              href={SIGNLEARN_LIVE_URLS.teacher}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Teacher View (/teacher)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
