export interface LexicalNode {
  type: string
  text?: string
  children?: LexicalNode[]
  [key: string]: any
}

export interface LexicalRoot {
  root: {
    type: string
    direction: string
    format: string
    indent: number
    version: number
    children: LexicalNode[]
  }
}

const defaultDescription: LexicalRoot = {
  root: {
    type: 'root',
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '',
            type: 'text',
            version: 1
          }
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        textFormat: 0,
        version: 1
      }
    ]
  }
}

export const removeId = <T extends { id?: string }>(item: T): Omit<T, 'id'> => {
  const newItem = { ...item }
  delete newItem.id
  return newItem
}

export interface SocialLink {
  url: string
  name: string
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
  summary?: LexicalRoot
  phone?: string
  email?: string
  links?: SocialLink[]
  experience?: any[]
  education?: any[]
  proficiencies?: any[]
  customSections?: any[]
  design?: any
}

export const resumeValues = {
  personalDetails: (data?: ResumeData) => {
    return {
      profileImage: data?.profileImage || null,
      showProfileImage: data?.showProfileImage ?? true,
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      jobTitle: data?.jobTitle || '',
      summary: data?.summary || defaultDescription,
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

export { defaultDescription }
