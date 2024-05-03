'use client'

import { challengeOptions, challenges } from '@/db/schema'
import { useState } from 'react'
import { Header } from './Header'
import { QuestionBubble } from './QuestionBubble'
import { Challenge } from './Challenge'

type TQuizProps = {
  initialLessonId: number
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean
    challengeOptions: (typeof challengeOptions.$inferSelect)[]
  })[]
  initialHearts: number
  initialPercentage: number
  userSubscription: any
}

export const Quiz = ({
  initialLessonId,
  initialLessonChallenges,
  initialHearts,
  initialPercentage,
  userSubscription,
}: TQuizProps) => {
  const [hearts, setHearts] = useState(initialHearts)
  const [percentage, setPercentage] = useState(initialPercentage)
  const [challenges] = useState(initialLessonChallenges)
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge: any) => !challenge.completed,
    )
    return uncompletedIndex === -1 ? 0 : uncompletedIndex
  })
  const currentChallenge = challenges[activeIndex]
  const currentChallengeOptions = currentChallenge?.challengeOptions ?? []

  const titleChallenge =
    currentChallenge.type === 'ASSIST'
      ? 'Select the correct meaning'
      : currentChallenge.question

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />

      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col w-full lg:w-[600px] gap-y-12 lg:min-h-[350px] px-6 lg:px-0">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {titleChallenge}
            </h1>
            <div>
              {currentChallenge.type === 'ASSIST' && (
                <QuestionBubble question={currentChallenge.question} />
              )}
              <Challenge
                options={currentChallengeOptions}
                onSelect={() => {}}
                status="none"
                selectedOption={undefined}
                disabled={false}
                type={currentChallenge.type}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
