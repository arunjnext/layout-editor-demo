'use client'

import { useEditor } from '@/hooks/useEditor'
import { resumeOptionValue } from '@/lib/utils/resumeConstants'
import {
  EditorSectionDetails,
  EditorSectionPanel,
  EditorSectionReorder,
  EditorSectionTrigger,
  EditorSectionVisibility
} from '@/components/EditorUI/EditorSectionPanel'
import type { EditorSection } from '@/lib/utils/resumeConstants'

interface EditorPanelItemProps {
  section: EditorSection & { id: string; sectionKey: string; isVisible: boolean }
  translations?: Record<string, string>
}

export const EditorPanelItem = ({ section, translations = {} }: EditorPanelItemProps) => {
  const { handlePanelClick, sectionsVisibility, visiblityControls } = useEditor()
  const { id, sectionKey } = section
  const isVisible = id in sectionsVisibility ? sectionsVisibility[id] : section.isVisible
  const isPersonalDetails = sectionKey === resumeOptionValue.personalDetails

  return (
    <div id={id} className='relative'>
      <EditorSectionPanel isVisible={isVisible}>
        <EditorSectionReorder
          dragControls={undefined}
          isVisible={isVisible}
          className={isPersonalDetails ? 'invisible' : ''}
        />
        <EditorSectionDetails
          section={section as any}
          isVisible={isVisible}
          onClick={() => handlePanelClick(sectionKey)}
          translations={translations}
        />
        <div className='absolute right-0 inset-y-0'>
          {visiblityControls && !isPersonalDetails ? (
            <EditorSectionVisibility section={section as any} isVisible={isVisible} />
          ) : (
            <EditorSectionTrigger
              isVisible={isVisible}
              handlePanelClick={() => handlePanelClick(sectionKey)}
            />
          )}
        </div>
      </EditorSectionPanel>
    </div>
  )
}

