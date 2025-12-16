import { resumeOptionValue } from '@/lib/utils/resumeConstants'
import { EditorPanelHeader } from '@/components/EditorUI/EditorPanelHeader'

interface SkillsProps {
  translations?: Record<string, string>
}

export const Skills = ({ translations = {} }: SkillsProps) => {
  return (
    <>
      <EditorPanelHeader
        sectionKey={resumeOptionValue.skills}
        description='keyAreasThatIllustrateYourStrengths'
        translations={translations}
      />
      <div className='p-4 text-muted-foreground'>
        Skills section - To be implemented
      </div>
    </>
  )
}

