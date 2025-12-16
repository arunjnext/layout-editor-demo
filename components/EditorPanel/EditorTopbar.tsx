'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { SquarePen } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { useResume } from '@/hooks/useResume'
import type { ReactNode } from 'react'

interface EditorTopbarProps {
  children: ReactNode
}

export const EditorTopbar = ({ children }: EditorTopbarProps) => {
  return (
    <div className='bg-background border-b border-border flex items-center justify-between p-4 lg:p-5'>
      {children}
    </div>
  )
}

interface ResumeTitleProps {
  title: string
}

export const ResumeTitle = ({ title }: ResumeTitleProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const { updateResume } = useResume()
  const [isEditResumeName, setIsEditResumeName] = useState(false)

  const form = useForm<{ name: string }>({
    defaultValues: {
      name: title
    }
  })

  const { control, setFocus, handleSubmit, reset } = form

  const onSubmit = useCallback(
    (data: { name: string }) => {
      updateResume({ name: data.name || 'New resume' })
      setIsEditResumeName(false)
    },
    [updateResume]
  )

  useEffect(() => {
    if (!isEditResumeName && title) {
      reset({ name: title })
    }
  }, [title, reset, isEditResumeName])

  useEffect(() => {
    if (isEditResumeName) {
      setFocus('name')

      const handleClickOutside = (event: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(event.target as Node)) {
          handleSubmit(onSubmit)()
        }
      }

      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isEditResumeName, setFocus, handleSubmit, onSubmit])

  return (
    <div className='flex items-center gap-1'>
      {isEditResumeName ? (
        <Form {...form}>
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete='off'
                      className='border-none rounded shadow-none bg-transparent p-0 text-base font-semibold text-foreground disabled:bg-transparent disabled:cursor-default placeholder:text-foreground disabled:text-foreground'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <Text
          as='button'
          variant='base'
          weight='semibold'
          className='max-w-40 w-full text-foreground truncate cursor-pointer'
          onClick={() => setIsEditResumeName(true)}>
          <span className='max-w-40 w-full text-foreground truncate'>{title}</span>
        </Text>
      )}
      {!isEditResumeName && (
        <Button
          type='button'
          onClick={() => setIsEditResumeName(true)}
          variant='ghost'
          className='border-none shadow-none p-1'>
          <SquarePen size={20} className='text-muted-foreground' />
        </Button>
      )}
    </div>
  )
}

