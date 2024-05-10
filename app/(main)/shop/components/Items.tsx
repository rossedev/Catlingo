'use client'

import { refillHearts } from '@/actions/userProgress'
import { HeartIcon } from '@/components/HeartIcon'
import { Button } from '@/components/ui/button'
import { MAX_HEARTS, POINTS_TO_REFILL } from '@/constants'
import Image from 'next/image'
import { useTransition } from 'react'
import { toast } from 'sonner'

type TItemsProps = {
  hearts: number
  points: number
  hasActiveSubscription: boolean
}

export const Items = ({
  hearts,
  points,
  hasActiveSubscription,
}: TItemsProps) => {
  const [pending, startTransition] = useTransition()
  const notPossibleRefill =
    pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL

  const onRefillHearts = () => {
    if (notPossibleRefill) {
      return
    }

    startTransition(() => {
      refillHearts()
        .then(() => {
          toast.success('Filled hearts!', {
            style: {
              color: '#16a34a',
            },
          })
        })
        .catch(() =>
          toast.error('Something went wrong, please try again later'),
        )
    })
  }

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <HeartIcon width={60} height={60} className="mr-0" />

        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
        </div>
        <Button onClick={onRefillHearts} disabled={notPossibleRefill}>
          {hearts === MAX_HEARTS ? (
            'full'
          ) : (
            <div className="flex items-start">
              <Image
                src="/icons/points.svg"
                alt="Points"
                height={18}
                width={18}
                className="mr-0.5"
              />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
    </ul>
  )
}
