'use client'

import { Reorder } from 'motion/react'
import { useEditor } from '@/hooks/useEditor'
import { useResume } from '@/hooks/useResume'
import { getResumeTitle } from '@/lib/utils/helpers'
import { editorSections, resumeOptionValue } from '@/lib/utils/resumeConstants'
import { EditorContent } from './EditorContent'
import { EditorNavigation } from './EditorNavigation'
import { EditorPanelContainer } from './EditorPanelContainer'
import { EditorPanelItem } from './EditorPanelItem'
import { EditorSheet } from './EditorSheet'
import { EditorTopbar, ResumeTitle } from './EditorTopbar'

const defaultTranslations = {
  newResume: 'New Resume',
  personalDetails: 'Personal Details',
  experience: 'Experience',
  skills: 'Skills',
  education: 'Education',
  proficiencies: 'Proficiencies',
  customSections: 'Custom Sections',
  yourNameSummaryImageAndTitle: 'Your name, summary, image and title',
  yourWorkHistoryAndAchievements: 'Your work history and achievements',
  keyAreasThatIllustrateYourStrengths: 'Key areas that illustrate your strengths',
  whereYouStudiedAndYourQualifications: 'Where you studied and your qualifications',
  certificatesAndLanguages: 'Certificates and languages',
  showcaseUniqueExperiences: 'Showcase unique experiences'
}

interface EditorPanelProps {
  translations?: Record<string, string>
}

export const EditorPanel = ({ translations = {} }: EditorPanelProps) => {
  const { activePanelId, isSheetActive } = useEditor()
  const { resume, updateResume } = useResume()
  const { name, jobTitle } = resume
  const tc = { ...defaultTranslations, ...translations }
  const resumeName = getResumeTitle({ name, jobTitle }) || tc.newResume

  const sectionOrder = resume.design.sections || []

  const orderedSections = sectionOrder
    .map((sectionItem) => {
      const sectionDetails = editorSections.find(
        (section) => section.id === sectionItem.sectionKey
      )
      return sectionDetails
        ? {
            ...sectionDetails,
            ...sectionItem
          }
        : null
    })
    .filter(Boolean) as Array<typeof editorSections[0] & typeof sectionOrder[0]>

  const handleReorder = (newOrder: typeof orderedSections) => {
    if (!resume?.design) return

    const personalDetails = resume.design.sections.find(
      (section) => section.sectionKey === resumeOptionValue.personalDetails
    )

    const updatedSections = [
      ...(personalDetails ? [personalDetails] : []),
      ...newOrder.filter(
        (section) => section.sectionKey !== resumeOptionValue.personalDetails
      )
    ]

    updateResume({
      design: {
        ...resume.design,
        sections: updatedSections
      }
    })
  }

  return (
    <div className='h-full flex flex-col overflow-hidden'>
      <EditorNavigation translations={tc} />
      <div className='relative flex-auto overflow-y-auto overflow-hidden thin-scrollbar'>
        <EditorTopbar>{resumeName && <ResumeTitle title={resumeName} />}</EditorTopbar>
        <EditorPanelContainer className={`${isSheetActive ? 'hidden' : 'flex'}`}>
          <Reorder.Group
            className='relative'
            axis='y'
            values={orderedSections}
            onReorder={handleReorder}>
            {orderedSections.map((section) => {
              return (
                <EditorPanelItem key={section.id} section={section as any} translations={tc} />
              )
            })}
          </Reorder.Group>
        </EditorPanelContainer>
        <EditorSheet isSheetActive={isSheetActive} activePanelId={activePanelId}>
          <EditorContent activePanelId={activePanelId} translations={tc} />
        </EditorSheet>
      </div>
    </div>
  )
}

