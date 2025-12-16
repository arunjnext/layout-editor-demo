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

export const EditorNavigation = () => {
  const { isSheetActive, visiblityControls, activeTab } = useEditor()

  return (
    <div className='px-4 lg:px-6 py-4 bg-custom-gradient border-b border-border flex items-center justify-between'>
      {activeTab === 'editor' ? (
        <>
          {isSheetActive ? (
            <>
              <BackButton />
              <Text
                as='span'
                variant='xs'
                weight='medium'
                className='text-muted-foreground lg:hidden'>
                {defaultTranslations.resumeSections}
              </Text>
            </>
          ) : (
            <Text
              as='span'
              variant='xs'
              weight='medium'
              className='text-muted-foreground'>
              {defaultTranslations.resumeSections}
            </Text>
          )}
          <div className='flex items-center gap-2.5'>
            {visiblityControls ? (
              <SaveButton />
            ) : (
              <VisibilityButton />
            )}
          </div>
        </>
      ) : null}
    </div>
  )
}

const BackButton = () => {
  const { handleBack } = useEditor()
  return (
    <Button
      variant='ghost'
      size='sm'
      className='text-xs gap-1.5 flex'
      onClick={handleBack}>
      <ChevronLeft size={16} />
      {defaultTranslations.back}
    </Button>
  )
}

const SaveButton = () => {
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
      {defaultTranslations.save}
    </Button>
  )
}

const VisibilityButton = () => {
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
      {defaultTranslations.visibility}
    </Button>
  )
}

