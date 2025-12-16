import { resumeOptionValue } from '@/lib/utils/resumeConstants'
import { EditorPanelHeader } from '@/components/EditorUI/EditorPanelHeader'

export const Education = () => {
  return (
    <>
      <EditorPanelHeader
        sectionKey={resumeOptionValue.education}
        description='whereYouStudiedAndYourQualifications'
      />
      <div className='p-4 text-muted-foreground'>
        Education section - To be implemented
      </div>
    </>
  )
}

