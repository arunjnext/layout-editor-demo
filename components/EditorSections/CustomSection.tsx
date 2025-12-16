import { resumeOptionValue } from '@/lib/utils/resumeConstants'
import { EditorPanelHeader } from '@/components/EditorUI/EditorPanelHeader'

interface CustomSectionProps {
  translations?: Record<string, string>
}

export const CustomSection = ({ translations = {} }: CustomSectionProps) => {
  return (
    <>
      <EditorPanelHeader
        sectionKey={resumeOptionValue.customSections}
        description='showcaseUniqueExperiences'
        translations={translations}
      />
      <div className='p-4 text-muted-foreground'>
        Custom Sections - To be implemented
      </div>
    </>
  )
}

