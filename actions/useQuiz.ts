import { TStatus } from '@/types/defaults'
import { useState, useTransition } from 'react'
import { useAudio } from 'react-use'
import { upsertChallengeProgress } from './challengeProgress'
import { reduceHearts } from './userProgress'
import { toast } from 'sonner'
import { TQuizProps } from '@/app/lesson/components/Quiz'

export const useQuiz = (props: TQuizProps) => {
  const {
    initialLessonId,
    initialLessonChallenges,
    initialHearts,
    initialPercentage,
  } = props

  const [pending, startTransition] = useTransition()
  const [correctAudio, _c, correctControls] = useAudio({
    src: '/audio/correct.wav',
  })
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: '/audio/incorrect.wav',
  })

  const [lessonId] = useState(initialLessonId)
  const [hearts, setHearts] = useState(initialHearts)
  const [percentage, setPercentage] = useState(initialPercentage)
  const [challengesU] = useState(initialLessonChallenges)
  const [selectedOption, setSelectedOption] = useState<number>()
  const [status, setStatus] = useState<TStatus>('none')
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challengesU.findIndex(
      (challenge: any) => !challenge.completed,
    )
    return uncompletedIndex === -1 ? 0 : uncompletedIndex
  })

  const currentChallenge = challengesU[activeIndex]
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

            correctControls.play()
            setStatus('correct')
            setPercentage((prev) => prev + 100 / challengesU.length)

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

            incorrectControls.play()
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

  return {
    variants: {
      correctAudio,
      incorrectAudio,
      hearts,
      percentage,
      currentChallenge,
      status,
      selectedOption,
      pending,
      currentChallengeOptions,
      challengesU,
      lessonId,
      activeIndex,
    },

    onSelect,
    onContinue,
  }
}
