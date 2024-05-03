'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Check, Crown, Star } from 'lucide-react'
import Link from 'next/link'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

type TLessonButtonProps = {
  id: number
  index: number
  totalCount: number
  locked?: boolean
  current?: boolean
  percentage: number
}

export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percentage,
}: TLessonButtonProps) => {
  const cycleLength = 8
  const cycleIndex = index % cycleLength
  const isFirst = index === 0
  const isLast = index === totalCount
  const isCompleted = !current && !locked
  const Icon = isCompleted ? Check : isLast ? Crown : Star
  const href = isCompleted ? `/lesson/${id}` : '/lesson'

  let identationLevel

  if (cycleIndex <= 2) {
    identationLevel = cycleIndex
  } else if (cycleIndex <= 4 || cycleIndex <= 6) {
    identationLevel = 4 - cycleIndex
  } else {
    identationLevel = cycleIndex - 8
  }

  const rightPosition = identationLevel * 40

  return (
    <Link
      href={href}
      aria-disabled={locked}
      className={`${locked ? 'pointer-events-none' : 'pointer-events-auto'}`}
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompleted ? 60 : 24,
        }}
      >
        {current ? (
          <div className="relative h-[102px] w-[102px]">
            <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
              Start
              <div className="absolute w-0 h-0 left-1/2 -bottom-2 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
            </div>
            <CircularProgressbarWithChildren
              value={Number.isInteger(percentage) ? 0 : percentage}
              styles={{
                path: {
                  stroke: '#4ade80',
                },
                trail: {
                  stroke: '#e5e7eb',
                },
              }}
            >
              <Button
                size="rounded"
                variant={locked ? 'locked' : 'secondary'}
                className="h-[70px] w-[70px] border-b-8"
              >
                <Icon
                  className={cn(
                    'h-10 w-10',
                    locked
                      ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
                      : 'fill-primary-foreground text-primary-foreground',
                    isCompleted && 'fill-none stroke-[4]',
                  )}
                />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <div>
            <Button
              size="rounded"
              variant={locked ? 'locked' : 'secondary'}
              className="h-[70px] w-[70px] border-t border-r border-l border-b-[5px]"
            >
              <Icon
                className={cn(
                  'h-10 w-10',
                  locked
                    ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
                    : 'fill-primary-foreground text-primary-foreground',
                  isCompleted && 'fill-none stroke-[4]',
                )}
              />
            </Button>
          </div>
        )}
      </div>
    </Link>
  )
}