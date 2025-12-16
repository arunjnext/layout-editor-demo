'use client'

import { Check, ChevronLeft, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useEditor } from '@/hooks/useEditor'
import { useResume } from '@/hooks/useResume'
import { resumeOptionValue } from '@/lib/utils/resumeConstants'

const defaultTranslations = {
  resumeSections: 'Resume Sections',
  back: 'Back',
  save: 'Save',
  visibility: 'Visibility'
}

interface Translations {
  resumeSections?: string
  back?: string
  save?: string
  visibility?: string
  [key: string]: string | undefined
}

interface EditorNavigationProps {
  translations?: Translations
}

export const EditorNavigation = ({ translations = {} }: EditorNavigationProps) => {
  const { isSheetActive, visiblityControls, activeTab } = useEditor()
  const tc = { ...defaultTranslations, ...translations }

  return (
    <div className='px-4 lg:px-6 py-4 bg-custom-gradient border-b border-border flex items-center justify-between'>
      {activeTab === 'editor' ? (
        <>
          {isSheetActive ? (
            <>
              <BackButton translations={tc} />
              <Text
                as='span'
                variant='xs'
                weight='medium'
                className='text-muted-foreground lg:hidden'>
                {tc.resumeSections}
              </Text>
            </>
          ) : (
            <Text
              as='span'
              variant='xs'
              weight='medium'
              className='text-muted-foreground'>
              {tc.resumeSections}
            </Text>
          )}
          <div className='flex items-center gap-2.5'>
            {visiblityControls ? (
              <SaveButton translations={tc} />
            ) : (
              <VisibilityButton translations={tc} />
            )}
          </div>
        </>
      ) : null}
    </div>
  )
}

interface ButtonProps {
  translations: typeof defaultTranslations
}

const BackButton = ({ translations }: ButtonProps) => {
  const { handleBack } = useEditor()
  return (
    <Button
      variant='ghost'
      size='sm'
      className='text-xs gap-1.5 flex'
      onClick={handleBack}>
      <ChevronLeft size={16} />
      {translations.back}
    </Button>
  )
}

const SaveButton = ({ translations }: ButtonProps) => {
  const { saveItemsVisibility } = useEditor()
  const { isUpdatingResume } = useResume()
  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={saveItemsVisibility}
      disabled={isUpdatingResume}
      className='text-sm gap-1 group transition-colors text-muted-foreground'>
      <Check className='text-muted-foreground group-hover:text-muted-foreground size-4' />
      {translations.save}
    </Button>
  )
}

const VisibilityButton = ({ translations }: ButtonProps) => {
  const { isUpdatingResume } = useResume()
  const { showVisibilityControls, activePanelId, isSheetActive } = useEditor()

  if (
    isSheetActive &&
    (activePanelId === resumeOptionValue.personalDetails ||
      activePanelId === resumeOptionValue.skills)
  ) {
    return null
  }
  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={showVisibilityControls}
      disabled={isUpdatingResume}
      className='text-sm gap-1 group transition-colors text-muted-foreground'>
      <Eye className='text-muted-foreground group-hover:text-muted-foreground size-4' />
      {translations.visibility}
    </Button>
  )
}

