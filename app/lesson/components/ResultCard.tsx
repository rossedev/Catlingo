import { cn } from '@/lib/utils'
import Image from 'next/image'

type TResultCardProps = {
  value: number
  variant: 'points' | 'hearts'
}

export const ResultCard = ({ value, variant }: TResultCardProps) => {
  const variants = {
    hearts: {
      url: '/icons/heart.svg',
    },
    points: {
      url: '/icons/points.svg',
    },
  }

  // TODO: Time LocalStorage? It's possible because change every time the person complete a lesson

  // TODO: Counts Correct Answers?

  return (
    <div
      className={cn(
        'rounded-2xl border-2 w-full',
        variant === 'points' && 'bg-orange-400 border-orange-400',
        variant === 'hearts' && 'bg-rose-500 border-rose-500',
      )}
    >
      <div
        className={cn(
          'p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs',
          variant === 'hearts' && 'bg-rose-500',
          variant === 'points' && 'bg-orange-500',
        )}
      >
        {variant === 'hearts' ? 'Hearts Left' : 'Total XP'}
      </div>
      <div
        className={cn(
          'flex items-center justify-center rounded-2xl bg-white p-6 font-extrabold text-lg',
          variant === 'hearts' && 'text-rose-500',
          variant === 'points' && 'text-orange-400',
        )}
      >
        <Image
          alt="Icon"
          src={variants[variant].url}
          height={30}
          width={30}
          className="mr-1.5"
        />
        {value}
      </div>
    </div>
  )
}
