import { resumeOptionValue } from '@/lib/utils/resumeConstants'
import { EditorPanelHeader } from '@/components/EditorUI/EditorPanelHeader'

interface ExperienceProps {
  translations?: Record<string, string>
}

export const Experience = ({ translations = {} }: ExperienceProps) => {
  return (
    <>
      <EditorPanelHeader
        sectionKey={resumeOptionValue.experience}
        description='yourWorkHistoryAndAchievements'
        translations={translations}
      />
      <div className='p-4 text-muted-foreground'>
        Experience section - To be implemented
      </div>
    </>
  )
}

