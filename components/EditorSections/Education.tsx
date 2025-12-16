import { resumeOptionValue } from '@/lib/utils/resumeConstants'
import { EditorPanelHeader } from '@/components/EditorUI/EditorPanelHeader'

interface EducationProps {
  translations?: Record<string, string>
}

export const Education = ({ translations = {} }: EducationProps) => {
  return (
    <>
      <EditorPanelHeader
        sectionKey={resumeOptionValue.education}
        description='whereYouStudiedAndYourQualifications'
        translations={translations}
      />
      <div className='p-4 text-muted-foreground'>
        Education section - To be implemented
      </div>
    </>
  )
}

