// Types for resume data structure

export interface LexicalNode {
  type: string
  text?: string
  children?: LexicalNode[]
  [key: string]: any
}

export interface LexicalEditorState {
  root: {
    type: string
    direction: string
    format: string
    indent: number
    version: number
    children: LexicalNode[]
  }
}

export interface SocialLink {
  id?: string
  url: string
  name: string
}

export interface ExperienceItem {
  id?: string
  title?: string
  subTitle?: string
  description?: LexicalEditorState
  isVisible?: boolean
  startMonth?: string
  startYear?: string
  endMonth?: string
  endYear?: string
  isPresent?: boolean
  showDate?: boolean
  isInternship?: boolean
}

export interface EducationItem {
  id?: string
  title?: string
  subTitle?: string
  description?: LexicalEditorState
  isVisible?: boolean
  startMonth?: string
  startYear?: string
  endMonth?: string
  endYear?: string
  isPresent?: boolean
  showDate?: boolean
}

export interface SkillItem {
  id?: string
  skill: string
  rating?: number
  isVisible?: boolean
}

export interface ProficiencyItem {
  id?: string
  title?: string
  subTitle?: string
  description?: LexicalEditorState
  isVisible?: boolean
  startMonth?: string
  startYear?: string
  showDate?: boolean
}

export interface CustomSectionItem {
  id?: string
  title?: string
  subTitle?: string
  description?: LexicalEditorState
  isVisible?: boolean
  startMonth?: string
  startYear?: string
  showDate?: boolean
}

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

export interface ResumeData {
  id: string
  name: string
  jobTitle: string
  firstName: string
  lastName: string
  email: string
  phone: string
  summary: LexicalEditorState
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

