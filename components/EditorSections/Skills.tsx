import { resumeOptionValue } from '@/lib/utils/resumeConstants'
import { EditorPanelHeader } from '@/components/EditorUI/EditorPanelHeader'

export const Skills = () => {
  return (
    <>
      <EditorPanelHeader
        sectionKey={resumeOptionValue.skills}
        description='keyAreasThatIllustrateYourStrengths'
      />
      <div className='p-4 text-muted-foreground'>
        Skills section - To be implemented
      </div>
    </>
  )
}

