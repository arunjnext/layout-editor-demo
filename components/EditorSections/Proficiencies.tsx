import { resumeOptionValue } from '@/lib/utils/resumeConstants'
import { EditorPanelHeader } from '@/components/EditorUI/EditorPanelHeader'

interface ProficienciesProps {
  translations?: Record<string, string>
}

export const Proficiencies = ({ translations = {} }: ProficienciesProps) => {
  return (
    <>
      <EditorPanelHeader
        sectionKey={resumeOptionValue.proficiencies}
        description='certificatesAndLanguages'
        translations={translations}
      />
      <div className='p-4 text-muted-foreground'>
        Proficiencies section - To be implemented
      </div>
    </>
  )
}

