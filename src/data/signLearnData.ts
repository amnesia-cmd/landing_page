import heroImg from '../assets/images/cosmic_sign_hero_1790679056998.jpg';
import lessonNotesImg from '../assets/images/lesson_notes_capture_1790679073034.jpg';
import kinematicPracticeImg from '../assets/images/kinematic_practice_deck_1790679083452.jpg';
import teacherBridgeImg from '../assets/images/teacher_command_bridge_1790679095546.jpg';

export interface SignModule {
  id: string;
  index: string;
  title: string;
  category: string;
  duration: string;
  signsCount: number;
  summary: string;
  keySigns: string[];
  accuracyRate: number;
  offlineReady: boolean;
  handPosePreset: 'greeting' | 'rhythm' | 'directions' | 'family';
  keyframeNotes: {
    step: string;
    motionVector: string;
    instruction: string;
  }[];
}

export interface StudentSignal {
  id: string;
  name: string;
  currentModule: string;
  streakDays: number;
  lessonsCompleted: number;
  score: number;
  status: 'NOMINAL' | 'CHECK-IN NEEDED';
  lastSync: string;
  noteSummary: string;
}

export interface TeacherDraftReview {
  id: string;
  lessonTitle: string;
  capturedFrom: string;
  confidence: string;
  generatedNote: string;
  teacherCorrection: string;
  status: 'Awaiting Review' | 'Synced to Class';
}

export const SIGNLEARN_LIVE_URLS = {
  student: 'https://sign-learn-education-app--devikathatsme.replit.app/student',
  studentUpload: 'https://sign-learn-education-app--devikathatsme.replit.app/student/upload',
  studentProfile: 'https://sign-learn-education-app--devikathatsme.replit.app/student/profile',
  teacher: 'https://sign-learn-education-app--devikathatsme.replit.app/teacher/students',
  teacherReview: 'https://sign-learn-education-app--devikathatsme.replit.app/teacher/review',
};

export const GENERATED_ASSETS = {
  hero: heroImg,
  lessonNotes: lessonNotesImg,
  kinematicPractice: kinematicPracticeImg,
  teacherBridge: teacherBridgeImg,
};

export const SIGN_MODULES: SignModule[] = [
  {
    id: 'first-exchange',
    index: '01',
    title: 'A Friendly First Exchange',
    category: 'Foundational Dialogue',
    duration: '12 min',
    signsCount: 14,
    summary: 'Names, where you are from, and how to ask someone to sign that again with natural facial grammar.',
    keySigns: ['HELLO', 'NAME', 'WHERE FROM', 'SIGN AGAIN', 'NICE TO MEET YOU'],
    accuracyRate: 96.4,
    offlineReady: true,
    handPosePreset: 'greeting',
    keyframeNotes: [
      {
        step: '01 · Open Salute',
        motionVector: 'Azimuth +38° · Temple Outward',
        instruction: 'Flat B-hand starts near the brow and arcs outward in a crisp, welcoming trajectory.',
      },
      {
        step: '02 · Name Cross-Tap',
        motionVector: 'Bilateral H-Hands · 2x Contact',
        instruction: 'Index and middle fingers extended, tapping middle finger of dominant H-hand over non-dominant.',
      },
      {
        step: '03 · Repeat Request',
        motionVector: 'Curved Bent-5 · Arc Into Palm',
        instruction: 'Raise brows slightly while curving dominant hand into open non-dominant palm to request repetition.',
      },
    ],
  },
  {
    id: 'ordinary-day',
    index: '02',
    title: 'Rhythm of an Ordinary Day',
    category: 'Temporal Sequencing',
    duration: '18 min',
    signsCount: 22,
    summary: 'Build a clear sequence of signs for morning routines, class schedules, and temporal transitions.',
    keySigns: ['MORNING', 'WAKE UP', 'STUDY', 'CLASSROOM', 'EVERY DAY'],
    accuracyRate: 92.8,
    offlineReady: true,
    handPosePreset: 'rhythm',
    keyframeNotes: [
      {
        step: '01 · Horizon Rise',
        motionVector: 'Elevation +62° · Forearm Pivot',
        instruction: 'Dominant flat hand rises like the sun over the horizon line formed by the non-dominant arm.',
      },
      {
        step: '02 · Visual Absorption',
        motionVector: '5-Hand Flutter · Toward Eyes',
        instruction: 'Wiggling fingers of dominant 5-hand draw information up from the flat palm representing a page.',
      },
      {
        step: '03 · Daily Continuity',
        motionVector: 'A-Hand Cheek Brush · Forward2x',
        instruction: 'Knuckles of thumb and index brush forward along the lower cheek in two steady beats.',
      },
    ],
  },
  {
    id: 'asking-directions',
    index: '03',
    title: 'Asking for Spatial Directions',
    category: 'Spatial Indexing',
    duration: '15 min',
    signsCount: 18,
    summary: 'Navigate hallways, transit corridors, and landmarks using perspective-locked spatial pointing.',
    keySigns: ['WHERE', 'TURN LEFT', 'STRAIGHT AHEAD', 'NEARBY', 'LIBRARY'],
    accuracyRate: 89.5,
    offlineReady: true,
    handPosePreset: 'directions',
    keyframeNotes: [
      {
        step: '01 · Interrogative Shake',
        motionVector: 'Index D-1 · Lateral Oscillation',
        instruction: 'Single upright index finger pivots rapidly side-to-side paired with furrowed eyebrows.',
      },
      {
        step: '02 · Corridor Vector',
        motionVector: 'B-Hand Blade · Z-Axis Extension',
        instruction: 'Extend flat hand straight forward from shoulder depth to establish primary hallway vector.',
      },
      {
        step: '03 · Library Circle',
        motionVector: 'L-Handshape · Clockwise Orbit',
        instruction: 'Thumb and index form an L and trace a clean clockwise orbital loop at shoulder height.',
      },
    ],
  },
  {
    id: 'family-home',
    index: '04',
    title: 'Family, Community & Home',
    category: 'Relational Sign Maps',
    duration: '16 min',
    signsCount: 19,
    summary: 'Connect people, shared living spaces, and classroom communities with expressive circular classifiers.',
    keySigns: ['FAMILY', 'HOME', 'TOGETHER', 'FRIEND', 'COMMUNITY'],
    accuracyRate: 94.1,
    offlineReady: true,
    handPosePreset: 'family',
    keyframeNotes: [
      {
        step: '01 · Family Ring',
        motionVector: 'Bilateral F-Hands · 360° Enclosure',
        instruction: 'Both hands in F-shape touch index/thumbs in front and sweep outward into a complete circle.',
      },
      {
        step: '02 · Home Contact',
        motionVector: 'Flattened O · Cheek to Jawline',
        instruction: 'Fingertips touch near the corner of the mouth and then lightly at the upper cheek.',
      },
      {
        step: '03 · Interlocked Friends',
        motionVector: 'Hooked X-Fingers · Alternating Link',
        instruction: 'Index fingers hook together twice, reversing top-and-bottom orientation cleanly.',
      },
    ],
  },
];

export const STUDENT_SIGNALS: StudentSignal[] = [
  {
    id: 'st-01',
    name: 'Maya Lin',
    currentModule: '01. A Friendly First Exchange',
    streakDays: 7,
    lessonsCompleted: 14,
    score: 92,
    status: 'NOMINAL',
    lastSync: 'Today · 09:42 AM',
    noteSummary: 'Completed 3 low-pressure recall rounds; saved offline study notes for facial grammar cues.',
  },
  {
    id: 'st-02',
    name: 'Devon Brooks',
    currentModule: '02. Rhythm of an Ordinary Day',
    streakDays: 5,
    lessonsCompleted: 11,
    score: 88,
    status: 'NOMINAL',
    lastSync: 'Today · 09:38 AM',
    noteSummary: 'Zero missed signs in temporal sequence drill; uploaded custom practice clip.',
  },
  {
    id: 'st-03',
    name: 'Elena Rostova',
    currentModule: '03. Asking for Spatial Directions',
    streakDays: 2,
    lessonsCompleted: 8,
    score: 76,
    status: 'CHECK-IN NEEDED',
    lastSync: '2 days ago',
    noteSummary: '1 missed in recent rounds (spatial left/right inversion). Gentle check-in recommended.',
  },
  {
    id: 'st-04',
    name: 'Marcus Vance',
    currentModule: '04. Family, Community & Home',
    streakDays: 9,
    lessonsCompleted: 16,
    score: 94,
    status: 'NOMINAL',
    lastSync: 'Today · 09:41 AM',
    noteSummary: 'Reviewed AI study notes offline during commute; 100% recall on relational classifiers.',
  },
  {
    id: 'st-05',
    name: 'Sora Takahashi',
    currentModule: '02. Rhythm of an Ordinary Day',
    streakDays: 1,
    lessonsCompleted: 6,
    score: 68,
    status: 'CHECK-IN NEEDED',
    lastSync: '3 days ago',
    noteSummary: 'Quieter week recorded. A kind, specific check-in can be the bridge back in.',
  },
];

export const TEACHER_DRAFTS: TeacherDraftReview[] = [
  {
    id: 'rev-01',
    lessonTitle: 'Asking Someone to Sign That Again',
    capturedFrom: 'Classroom Video · 02m 44s',
    confidence: '98.4%',
    generatedNote: 'Curve dominant bent-5 hand into open non-dominant palm while raising eyebrows to form a polite yes/no question.',
    teacherCorrection: 'Added teacher voice: Keep eye contact steady during the palm contact so your partner knows you are actively following.',
    status: 'Synced to Class',
  },
  {
    id: 'rev-02',
    lessonTitle: 'Temporal Markers: Morning to Night',
    capturedFrom: 'Uploaded Lesson · 04m 12s',
    confidence: '96.1%',
    generatedNote: 'Non-dominant arm serves as the horizon line; dominant arm angle maps sun elevation from dawn (0°) to noon (90°).',
    teacherCorrection: 'Added teacher voice: Slow down the transition between AFTERNOON and NIGHT to keep the wrist pivot distinct.',
    status: 'Awaiting Review',
  },
];
