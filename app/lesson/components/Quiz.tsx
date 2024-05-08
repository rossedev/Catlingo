'use client'

import { challengeOptions, challenges } from '@/db/schema'
import { useState, useTransition } from 'react'
import { Header } from './Header'
import { QuestionBubble } from './QuestionBubble'
import { Challenge } from './Challenge'
import { Footer } from './Footer'
import { TStatus } from '@/types/defaults'
import { upsertChallengeProgress } from '@/actions/challengeProgress'
import { toast } from 'sonner'
import { reduceHearts } from '@/actions/userProgress'

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
  const [pending, startTransition] = useTransition()

  const [hearts, setHearts] = useState(initialHearts)
  const [percentage, setPercentage] = useState(initialPercentage)
  const [challenges] = useState(initialLessonChallenges)
  const [selectedOption, setSelectedOption] = useState<number>()
  const [status, setStatus] = useState<TStatus>('none')
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge: any) => !challenge.completed,
    )
    return uncompletedIndex === -1 ? 0 : uncompletedIndex
  })

  const currentChallenge = challenges[activeIndex]
  const currentChallengeOptions = currentChallenge?.challengeOptions ?? []

  const onSelect = (id: number) => {
    if (status !== 'none') return

    setSelectedOption(id)
  }

  const onNext = () => {
    setActiveIndex((current) => current + 1)
  }

  const onContinue = () => {
    if (!selectedOption) return

    if (status === 'wrong') {
      resetStatusOptions()
      return
    }

    if (status === 'correct') {
      onNext()
      resetStatusOptions()
      return
    }

    const correctOption = currentChallengeOptions.find(
      (option) => option.correct,
    )

    if (!correctOption) return

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(currentChallenge.id)
          .then((res) => {
            if (res?.error === 'heart') {
              console.error('Missing hearts')
              return
            }
            setStatus('correct')
            setPercentage((prev) => prev + 100 / challenges.length)

            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5))
            }
          })
          .catch(() => toast.error('Something went wrong. Please try again.'))
      })
    } else {
      startTransition(() => {
        reduceHearts(currentChallenge.id)
          .then((res) => {
            if (res?.error === 'hearts') {
              //TODO: Change for a warning modal
              console.error('Missing hearts')
              return
            }

            setStatus('wrong')

            if (!res?.error) {
              setHearts((prev) => Math.max(prev - 1, 0))
            }
          })
          .catch(() => toast.error('Something went wrong. Please try again.'))
      })

      console.log('Not Correct :c')
    }
  }

  const resetStatusOptions = () => {
    setStatus('none')
    setSelectedOption(undefined)
  }

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
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={currentChallenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  )
}
