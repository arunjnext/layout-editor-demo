'use client'

import { useEditor } from '@/hooks/useEditor'
import { resumeOptionValue } from '@/lib/utils/resumeConstants'
import {
  EditorSectionReorder,
  EditorSectionVisibility
} from '@/components/EditorUI/EditorSectionPanel'
import type { EditorSection } from '@/lib/utils/resumeConstants'
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions
} from '@/components/ui/item'
import { cn } from '@/lib/utils/helpers'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

const defaultTranslations: Record<string, string> = {
  personalDetails: "Personal Details",
  experience: "Experience",
  skills: "Skills",
  education: "Education",
  proficiencies: "Proficiencies",
  customSections: "Custom Sections",
  yourNameSummaryImageAndTitle: "Your name, summary, image and title",
  yourWorkHistoryAndAchievements: "Your work history and achievements",
  keyAreasThatIllustrateYourStrengths:
    "Key areas that illustrate your strengths",
  whereYouStudiedAndYourQualifications:
    "Where you studied and your qualifications",
  certificatesAndLanguages: "Certificates and languages",
  showcaseUniqueExperiences: "Showcase unique experiences",
}

interface EditorPanelItemProps {
  section: EditorSection & { id: string; sectionKey: string; isVisible: boolean }
  translations?: Record<string, string>
}

export const EditorPanelItem = ({ section, translations = {} }: EditorPanelItemProps) => {
  const { handlePanelClick, sectionsVisibility, visiblityControls } = useEditor()
  const { id, sectionKey } = section
  const isVisible = id in sectionsVisibility ? sectionsVisibility[id] : section.isVisible
  const isPersonalDetails = sectionKey === resumeOptionValue.personalDetails
  
  const { title, description, icon: Icon, sectionName } = section
  const tc = { ...defaultTranslations, ...translations }
  
  const displayTitle = title === sectionName ? tc[title] || sectionName : sectionName
  const displayDescription = tc[description] || description

  return (
    <div id={id} className='relative'>
      <Item
        variant="outline"
        size="default"
        className={cn(
          "border-b border-border rounded-none border-x-0 border-t-0 bg-background px-4 lg:px-6 py-2",
          !isVisible && "opacity-35",
          isVisible && "hover:bg-background-alt cursor-pointer"
        )}
        onClick={() => isVisible && handlePanelClick(sectionKey)}
      >
        <EditorSectionReorder
          dragControls={undefined}
          isVisible={isVisible}
          className={cn(
            isPersonalDetails && 'invisible'
          )}
        />
        <ItemMedia variant="icon">
          <span className="flex items-center justify-center bg-accent rounded-[10px] p-1.5">
            <Icon className="text-muted-foreground size-5" />
          </span>
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-foreground max-w-52 w-full truncate sm:max-w-80">
            {displayTitle}
          </ItemTitle>
          <ItemDescription className="max-w-52 w-full truncate sm:max-w-80">
            {displayDescription}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          {visiblityControls && !isPersonalDetails ? (
            <EditorSectionVisibility section={section} isVisible={isVisible} />
          ) : (
            <Button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handlePanelClick(sectionKey)
              }}
              variant="ghost"
              size="sm"
              disabled={!isVisible}
              className="disabled:opacity-35"
            >
              <ChevronRight size={16} className="text-muted-foreground" />
            </Button>
          )}
        </ItemActions>
      </Item>
    </div>
  )
}

