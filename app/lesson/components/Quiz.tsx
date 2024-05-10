'use client'

import { challengeOptions, challenges } from '@/db/schema'
import { Header } from './Header'
import { QuestionBubble } from './QuestionBubble'
import { Challenge } from './Challenge'
import { Footer } from './Footer'
import { CompletedLesson } from './CompletedLesson'
import { useQuiz } from '@/actions/useQuiz'
import { useModal } from '@/store/useModal'

export type TQuizProps = {
  initialLessonId: number
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean
    challengeOptions: (typeof challengeOptions.$inferSelect)[]
  })[]
  initialHearts: number
  initialPercentage: number
  userSubscription: any
}

export const Quiz = (props: TQuizProps) => {
  const { userSubscription } = props
  const { variants, onSelect, onContinue } = useQuiz(props)

  if (!variants.currentChallenge) {
    return (
      <CompletedLesson
        hearts={variants.hearts}
        challenges={variants.challengesU}
        lessonId={variants.lessonId}
      />
    )
  }

  const titleChallenge =
    variants.currentChallenge.type === 'ASSIST'
      ? 'Select the correct meaning'
      : variants.currentChallenge.question

  return (
    <>
      {variants.correctAudio}
      {variants.incorrectAudio}
      <Header
        hearts={variants.hearts}
        percentage={variants.percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />

      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col w-full lg:w-[600px] gap-y-12 lg:min-h-[350px] px-6 lg:px-0">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {titleChallenge}
            </h1>
            <div>
              {variants.currentChallenge.type === 'ASSIST' && (
                <QuestionBubble question={variants.currentChallenge.question} />
              )}
              <Challenge
                options={variants.currentChallengeOptions}
                onSelect={onSelect}
                status={variants.status}
                selectedOption={variants.selectedOption}
                disabled={variants.pending}
                type={variants.currentChallenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={variants.pending || !variants.selectedOption}
        status={variants.status}
        onCheck={onContinue}
      />
    </>
  )
}
