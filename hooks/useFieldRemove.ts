import { removeId } from '@/lib/utils/dataTransformers'
import { useCallback } from 'react'
import { useResume } from './useResume'

interface UseFieldRemoveProps {
  remove: (index: number) => void
  sectionKey: string
  data: any[]
}

export const useFieldRemove = ({ remove, sectionKey, data }: UseFieldRemoveProps) => {
  const { updateResume } = useResume()
  const handleRemove = useCallback(
    (index: number) => {
      const currentItem = data?.[index]
      if (!currentItem) {
        remove(index)
        return
      }

      const updatedArray = data
        .filter((_, index_) => index_ !== index)
        .map((item) => removeId(item))
      remove(index)
      updateResume({ [sectionKey]: updatedArray })
    },
    [remove, sectionKey, data, updateResume]
  )
  return handleRemove
}
