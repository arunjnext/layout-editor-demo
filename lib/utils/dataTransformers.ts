// Helper to convert Lexical JSON to plain text string (for backward compatibility)
const convertLexicalToString = (value: any): string => {
  if (typeof value === 'string') {
    return value
  }
  if (value && typeof value === 'object') {
    // Try to extract text from Lexical structure
    if (value.root && value.root.children) {
      const extractText = (node: any): string => {
        if (node.text) {
          return node.text
        }
        if (node.children && Array.isArray(node.children)) {
          return node.children.map(extractText).join('')
        }
        return ''
      }
      return value.root.children.map(extractText).join('\n')
    }
    // If it's an object but not Lexical structure, return empty string
    return ''
  }
  return value || ''
}

export const removeId = <T extends { id?: string }>(item: T): Omit<T, 'id'> => {
  const newItem = { ...item }
  delete newItem.id
  return newItem
}

export interface SocialLink {
  url: string
  name: string
  id?: string
}

export const newSocialLink: SocialLink = {
  url: '',
  name: ''
}

export interface ResumeData {
  profileImage?: any
  showProfileImage?: boolean
  firstName?: string
  lastName?: string
  jobTitle?: string
  summary?: string
  phone?: string
  email?: string
  links?: SocialLink[]
  experience?: any[]
  education?: any[]
  proficiencies?: any[]
  customSections?: any[]
  design?: any
}

// Deprecated: These transformation functions are no longer needed with unified form
// Keeping for backward compatibility during migration
export const resumeValues = {
  personalDetails: (data?: ResumeData) => {
    return {
      profileImage: data?.profileImage || null,
      showProfileImage: data?.showProfileImage ?? true,
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      jobTitle: data?.jobTitle || '',
      summary: convertLexicalToString(data?.summary),
      phone: data?.phone || '',
      email: data?.email || '',
      links: resumeValues.links(data)
    }
  },
  links: (data?: ResumeData): SocialLink[] => {
    return data?.links?.map(removeId) || [newSocialLink]
  },
  experience: (data?: ResumeData, key?: string) => {
    const sectionData = data?.experience?.map(removeId) || []
    return key ? { [key]: sectionData } : sectionData
  },
  education: (data?: ResumeData, key?: string) => {
    const sectionData = data?.education?.map(removeId) || []
    return key ? { [key]: sectionData } : sectionData
  },
  proficiencies: (data?: ResumeData, key?: string) => {
    const sectionData = data?.proficiencies?.map(removeId) || []
    return key ? { [key]: sectionData } : sectionData
  },
  customSections: (data?: ResumeData, key?: string) => {
    const sectionData = data?.customSections?.map(removeId) || []
    return key ? { [key]: sectionData } : sectionData
  },
  design: (data?: ResumeData, key?: string) => {
    return key ? { [key]: data } : data?.design
  }
}

// New helper: Direct mapping from Resume to form defaults (no transformations)
// Form data structure matches Resume structure exactly
import type { Resume } from './defaultResume'

export const getResumeFormDefaults = (resume?: Resume) => {
  if (!resume) {
    return {
      profileImage: null,
      showProfileImage: true,
      firstName: '',
      lastName: '',
      jobTitle: '',
      summary: '',
      phone: '',
      email: '',
      links: [newSocialLink],
      experience: [],
      skills: [],
      education: [],
      proficiencies: [],
      customSections: [],
    }
  }

  return {
    profileImage: resume.profileImage ?? null,
    showProfileImage: resume.showProfileImage ?? true,
    firstName: resume.firstName ?? '',
    lastName: resume.lastName ?? '',
    jobTitle: resume.jobTitle ?? '',
    summary: resume.summary ?? '',
    phone: resume.phone ?? '',
    email: resume.email ?? '',
    links: resume.links ?? [newSocialLink],
    experience: resume.experience ?? [],
    skills: resume.skills ?? [],
    education: resume.education ?? [],
    proficiencies: resume.proficiencies ?? [],
    customSections: resume.customSections ?? [],
  }
}
