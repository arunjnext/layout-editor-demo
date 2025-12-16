import { resumeValues } from '@/lib/utils/dataTransformers';
import { useEffect } from 'react';
import { useResume } from './useResume';

interface UseFormWatchProps {
  watch: (callback: (data: any, info: { name?: string; type?: string }) => void) => { unsubscribe: () => void }
  key: string
  trigger?: () => Promise<boolean>
}

export const useFormWatch = ({ watch, key, trigger }: UseFormWatchProps) => {
  const { updateResume } = useResume()

  useEffect(() => {
    const subscription = watch(async (data, { name, type }) => {
      if (name && type === 'change') {
        if (trigger) {
          const valid = await trigger()
          if (!valid) return
        }
        const cleanFunction = (resumeValues as any)[key]
        if (cleanFunction) {
          const cleanedData = cleanFunction(data, key)
          updateResume(cleanedData)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, updateResume, key, trigger])
}
