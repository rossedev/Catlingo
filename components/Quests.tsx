'use client'

import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

import quests from '@/data/quests.json'
import Image from 'next/image'
import { Progress } from './ui/progress'

type TQuestsProps = {
  points: number
}

export const Quests = ({ points }: TQuestsProps) => {
  const router = useRouter()

  const handleClick = () => [router.push('/quests')]

  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-lg">Quests</h3>
        <Button variant="primaryOutline" size="sm" onClick={handleClick}>
          View all
        </Button>
      </div>
      <ul>
        {quests.map((quest) => {
          const progress = (points / quest.value) * 100

          return (
            <div
              className="flex items-center w-full pb-4 gap-x-3 "
              key={quest?.title}
            >
              <Image
                src="/icons/points.svg"
                alt="Points"
                width={40}
                height={40}
              />
              <div className="flex flex-col gap-y-2 w-full">
                <p className="text-neutral-700 text-sm font-bold">
                  {quest.title}
                </p>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          )
        })}
      </ul>
    </div>
  )
}
