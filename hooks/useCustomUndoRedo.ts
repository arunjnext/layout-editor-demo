'use client'

import { useEffect } from 'react'

export const useCustomUndoRedo = (
  _source: string,
  data: any[],
  sectionKey: string,
  setValue: (name: string, value: any, options?: any) => void
) => {
  useEffect(() => {
    if (_source === 'undoRedo') {
      for (const [index, item] of data.entries()) {
        for (const [key, value] of Object.entries(item)) {
          setValue(`${sectionKey}.${index}.${key}` as any, value, { shouldValidate: false })
        }
      }
    }
  }, [_source, data, setValue, sectionKey])
}
