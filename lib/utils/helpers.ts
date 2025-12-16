import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export interface ResumeTitleData {
  name?: string
  jobTitle?: string
}

export const getResumeTitle = ({ name, jobTitle }: ResumeTitleData): string | null => {
  if (name) {
    return name
  }

  if (jobTitle) {
    return jobTitle
  }

  return null
}
