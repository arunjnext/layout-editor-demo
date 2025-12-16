export interface DateData {
  startMonth?: string
  startYear?: string
  endMonth?: string
  endYear?: string
  isPresent?: boolean
}

export const validateDates = (data: DateData): boolean => {
  const { startMonth, startYear, endMonth, endYear, isPresent } = data

  if (isPresent) {
    return true
  }

  // If any date field is empty, skip validation (return true)
  if (!startMonth || !startYear || !endMonth || !endYear) {
    return true
  }

  const start = new Date(Number.parseInt(startYear), Number.parseInt(startMonth) - 1)
  const end = new Date(Number.parseInt(endYear), Number.parseInt(endMonth) - 1)

  return end >= start
}
