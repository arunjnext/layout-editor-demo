'use client'

import { EditorPanel } from '@/components/EditorPanel/EditorPanel'
import { EditorProvider } from '@/context/EditorProvider'
import { ResumeProvider } from '@/context/ResumeProvider'
import { createDefaultResume } from '@/lib/utils/defaultResume'

export default function Page() {
  const defaultResume = createDefaultResume()

  return (
    <ResumeProvider resume={defaultResume}>
      <EditorProvider>
        <div className='h-screen w-full'>
          <EditorPanel />
        </div>
      </EditorProvider>
    </ResumeProvider>
  )
}
