import { resumeOptionValue } from '@/lib/utils/resumeConstants'
import { EditorPanelHeader } from '@/components/EditorUI/EditorPanelHeader'

export const Proficiencies = () => {
  return (
    <>
      <EditorPanelHeader
        sectionKey={resumeOptionValue.proficiencies}
        description='certificatesAndLanguages'
      />
      <div className='p-4 text-muted-foreground'>
        Proficiencies section - To be implemented
      </div>
    </>
  )
}

