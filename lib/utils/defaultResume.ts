import { newSocialLink, SocialLink } from './dataTransformers'
import { resumeOptionValue } from './resumeConstants'
import { CustomSectionItem, EducationItem, ExperienceItem, ProficiencyItem, SkillItem } from './types'

export interface ResumeSection {
  id: string
  sectionKey: string
  sectionName: string
  isVisible: boolean
  showInSidebar: boolean
}

export interface ResumeDesign {
  layout: string
  sections: ResumeSection[]
  spacing: string
  sidebarStyle: string
  palette: {
    primary: string
    accent: string
  }
  font: string
  headerStyle: string
  accentStyle: string
  shape: string
  pageNumbers: boolean
}

export interface Resume {
  id: string
  name: string
  jobTitle: string
  firstName: string
  lastName: string
  email: string
  phone: string
  summary: string
  profileImage: string | null
  showProfileImage: boolean
  links: SocialLink[]
  experience: ExperienceItem[]
  skills: SkillItem[]
  education: EducationItem[]
  proficiencies: ProficiencyItem[]
  customSections: CustomSectionItem[]
  design: ResumeDesign
}

export const createDefaultResume = (): Resume => ({
  id: 'temp-id',
  name: 'New Resume',
  jobTitle: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  summary: '',
  profileImage: null,
  showProfileImage: true,
  links: [newSocialLink],
  experience: [],
  skills: [],
  education: [],
  proficiencies: [],
  customSections: [],
  design: {
    layout: resumeOptionValue.sidebarLeft,
    sections: [
      {
        id: 'personal-details',
        sectionKey: resumeOptionValue.personalDetails,
        sectionName: 'Personal Details',
        isVisible: true,
        showInSidebar: false
      },
      {
        id: 'experience',
        sectionKey: resumeOptionValue.experience,
        sectionName: 'Experience',
        isVisible: true,
        showInSidebar: false
      },
      {
        id: 'skills',
        sectionKey: resumeOptionValue.skills,
        sectionName: 'Skills',
        isVisible: true,
        showInSidebar: false
      },
      {
        id: 'education',
        sectionKey: resumeOptionValue.education,
        sectionName: 'Education',
        isVisible: true,
        showInSidebar: false
      },
      {
        id: 'proficiencies',
        sectionKey: resumeOptionValue.proficiencies,
        sectionName: 'Proficiencies',
        isVisible: true,
        showInSidebar: false
      },
      {
        id: 'custom-sections',
        sectionKey: resumeOptionValue.customSections,
        sectionName: 'Custom Sections',
        isVisible: true,
        showInSidebar: false
      }
    ],
    spacing: resumeOptionValue.normal,
    sidebarStyle: resumeOptionValue.normal,
    palette: {
      primary: resumeOptionValue.electric,
      accent: resumeOptionValue.cloud
    },
    font: resumeOptionValue.timeless,
    headerStyle: resumeOptionValue.default,
    accentStyle: resumeOptionValue.none,
    shape: resumeOptionValue.rounded,
    pageNumbers: false
  }
})
