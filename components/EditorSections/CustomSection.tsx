import { resumeOptionValue } from '@/lib/utils/resumeConstants'
import { EditorPanelHeader } from '@/components/EditorUI/EditorPanelHeader'

export const CustomSection = () => {
  return (
    <>
      <EditorPanelHeader
        sectionKey={resumeOptionValue.customSections}
        description='showcaseUniqueExperiences'
      />
      <div className='p-4 text-muted-foreground'>
        Custom Sections - To be implemented
      </div>
    </>
  )
}

