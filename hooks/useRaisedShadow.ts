import { animate, useMotionValue, type MotionValue } from 'motion/react'
import { useEffect } from 'react'

const inactiveShadow = '0px 0px 0px rgba(0,0,0,0.8)'

export const useRaisedShadow = (value: MotionValue<number>) => {
  const boxShadow = useMotionValue(inactiveShadow)

  useEffect(() => {
    let isActive = false
    const unsubscribe = value.on('change', (latest) => {
      const wasActive = isActive
      if (latest === 0) {
        isActive = false
        if (isActive !== wasActive) {
          animate(boxShadow, inactiveShadow)
        }
      } else {
        isActive = true
        if (isActive !== wasActive) {
          animate(boxShadow, '5px 5px 10px rgba(0,0,0,0.3)')
        }
      }
    })

    return unsubscribe
  }, [value, boxShadow])

  return boxShadow
}

