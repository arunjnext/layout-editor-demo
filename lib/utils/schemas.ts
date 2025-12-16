import { z } from 'zod'
import { validateDates } from './validateDates'

export const commonSchema = {
  title: z.string().optional(),
  subTitle: z.string().optional(),
  description: z.any().optional(),
  isVisible: z.boolean().optional().default(true),
  startMonth: z.string().optional(),
  startYear: z.string().optional(),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
  isPresent: z.boolean().optional().default(false),
  showDate: z.boolean().optional().default(false),
  isInternship: z.boolean().optional().default(false),
  skill: z.string(),
  rating: z.number().optional(),
  url: z.string().optional().default(''),
  name: z.string().optional().default(''),
  profileImage: z.any().optional(),
  showProfileImage: z.boolean().default(true),
  firstName: z.string(),
  lastName: z.string(),
  jobTitle: z.string(),
  summary: z.string(),
  phone: z.string(),
  email: z.string()
}

export const resumeItemSchemas = {
  link: z.object({
    url: commonSchema.url,
    name: commonSchema.name
  }),

  skill: z.object({
    skill: commonSchema.skill,
    rating: commonSchema.rating,
    isVisible: commonSchema.isVisible
  }),

  experience: z
    .object({
      title: commonSchema.title,
      subTitle: commonSchema.subTitle,
      isInternship: commonSchema.isInternship,
      startMonth: commonSchema.startMonth,
      startYear: commonSchema.startYear,
      endMonth: commonSchema.endMonth,
      endYear: commonSchema.endYear,
      isPresent: commonSchema.isPresent,
      description: commonSchema.description,
      isVisible: commonSchema.isVisible
    })
    .refine(validateDates, {
      message: 'endDateError',
      path: ['endYear']
    }),

  education: z
    .object({
      title: commonSchema.title,
      subTitle: commonSchema.subTitle,
      startMonth: commonSchema.startMonth,
      startYear: commonSchema.startYear,
      endMonth: commonSchema.endMonth,
      endYear: commonSchema.endYear,
      isPresent: commonSchema.isPresent,
      description: commonSchema.description,
      isVisible: commonSchema.isVisible
    })
    .refine(validateDates, {
      message: 'endDateError',
      path: ['endYear']
    }),

  proficiency: z.object({
    title: commonSchema.title,
    subTitle: commonSchema.subTitle,
    startMonth: commonSchema.startMonth,
    startYear: commonSchema.startYear,
    showDate: commonSchema.showDate,
    description: commonSchema.description,
    isVisible: commonSchema.isVisible
  }),

  customSection: z.object({
    title: commonSchema.title,
    subTitle: commonSchema.subTitle,
    startMonth: commonSchema.startMonth,
    startYear: commonSchema.startYear,
    showDate: commonSchema.showDate,
    description: commonSchema.description,
    isVisible: commonSchema.isVisible
  })
}

export const resumeSectionSchemas = {
  links: z.array(resumeItemSchemas.link),
  experience: z.object({
    experience: z.array(resumeItemSchemas.experience)
  }),
  education: z.object({
    education: z.array(resumeItemSchemas.education)
  }),
  skills: z.array(resumeItemSchemas.skill),
  proficiencies: z.object({
    proficiencies: z.array(resumeItemSchemas.proficiency)
  }),
  customSections: z.object({
    customSections: z.array(resumeItemSchemas.customSection)
  })
}

export const personalDetailsSchema = z.object({
  profileImage: commonSchema.profileImage,
  showProfileImage: commonSchema.showProfileImage,
  firstName: commonSchema.firstName,
  lastName: commonSchema.lastName,
  jobTitle: commonSchema.jobTitle,
  summary: commonSchema.summary,
  phone: commonSchema.phone,
  email: commonSchema.email,
  links: resumeSectionSchemas.links
})

// Unified schema that matches Resume interface structure exactly
// Form data structure directly matches Resume structure (no nested wrappers)
export const unifiedResumeSchema = z.object({
  // Personal Details fields (flat structure, not nested)
  profileImage: commonSchema.profileImage,
  showProfileImage: commonSchema.showProfileImage,
  firstName: commonSchema.firstName,
  lastName: commonSchema.lastName,
  jobTitle: commonSchema.jobTitle,
  summary: commonSchema.summary,
  phone: commonSchema.phone,
  email: commonSchema.email,
  links: z.array(resumeItemSchemas.link),
  
  // Experience (direct array, not wrapped)
  experience: z.array(resumeItemSchemas.experience),
  
  // Skills (direct array)
  skills: z.array(resumeItemSchemas.skill),
  
  // Education (direct array)
  education: z.array(resumeItemSchemas.education),
  
  // Proficiencies (direct array)
  proficiencies: z.array(resumeItemSchemas.proficiency),
  
  // Custom Sections (direct array)
  customSections: z.array(resumeItemSchemas.customSection),
})
