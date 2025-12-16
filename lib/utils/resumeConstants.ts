import {
    BriefcaseBusiness,
    FilePlus,
    GraduationCap,
    Lightbulb,
    Smile,
    UserRound
} from 'lucide-react'

export const resumeOptionValue = Object.freeze({
  sidebarLeft: 'sidebarLeft',
  sidebarRight: 'sidebarRight',
  fullWidth: 'fullWidth',
  fullSplit: 'fullSplit',
  normal: 'normal',
  inset: 'inset',
  tight: 'tight',
  loose: 'loose',
  ribbon: 'ribbon',
  blur: 'blur',
  header: 'header',
  none: 'none',
  timeless: 'Inter',
  retro: 'retro',
  roboto: 'roboto',
  clean: 'clean',
  visionary: 'visionary',
  default: 'default',
  underline: 'underline',
  dotted: 'dotted',
  squiggle: 'squiggle',
  cloud: 'cloud',
  zinc: 'zinc',
  electric: 'electric',
  pomegranate: 'pomegranate',
  emerald: 'emerald',
  royal: 'royal',
  ember: 'ember',
  blush: 'blush',
  slate: 'slate',
  stone: 'stone',
  square: 'square',
  rounded: 'rounded',
  circle: 'circle',
  personalDetails: 'personalDetails',
  experience: 'experience',
  skills: 'skills',
  education: 'education',
  proficiencies: 'proficiencies',
  customSections: 'customSections',
  design: 'design'
} as const)

export const months = [
  { value: '1', label: 'january' },
  { value: '2', label: 'february' },
  { value: '3', label: 'march' },
  { value: '4', label: 'april' },
  { value: '5', label: 'may' },
  { value: '6', label: 'june' },
  { value: '7', label: 'july' },
  { value: '8', label: 'august' },
  { value: '9', label: 'september' },
  { value: '10', label: 'october' },
  { value: '11', label: 'november' },
  { value: '12', label: 'december' }
] as const

export interface EditorSection {
  id: string
  icon: typeof UserRound
  title: string
  description: string
}

export const editorSections: EditorSection[] = [
  {
    id: resumeOptionValue.personalDetails,
    icon: UserRound,
    title: 'personalDetails',
    description: 'yourNameSummaryImageAndTitle'
  },
  {
    id: resumeOptionValue.experience,
    icon: BriefcaseBusiness,
    title: 'experience',
    description: 'yourWorkHistoryAndAchievements'
  },
  {
    id: resumeOptionValue.skills,
    icon: Lightbulb,
    title: 'skills',
    description: 'keyAreasThatIllustrateYourStrengths'
  },
  {
    id: resumeOptionValue.education,
    icon: GraduationCap,
    title: 'education',
    description: 'whereYouStudiedAndYourQualifications'
  },
  {
    id: resumeOptionValue.proficiencies,
    icon: FilePlus,
    title: 'proficiencies',
    description: 'certificatesAndLanguages'
  },
  {
    id: resumeOptionValue.customSections,
    icon: Smile,
    title: 'customSections',
    description: 'showcaseUniqueExperiences'
  }
]
