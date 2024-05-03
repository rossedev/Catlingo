import { challenges } from '@/db/schema'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type TCardProps = {
  id: number
  text: string
  imageSrc: string | null
  audioSrc: string | null
  shortcut: string
  selected?: boolean
  onClick: () => void
  status?: 'correct' | 'wrong' | 'none'
  disabled?: boolean
  type: (typeof challenges.$inferSelect)['type']
}

export const Card = ({
  id,
  text,
  imageSrc,
  audioSrc,
  shortcut,
  selected,
  onClick,
  status,
  disabled,
  type,
}: TCardProps) => {
  return (
    <div
      onClick={() => {}}
      className={cn(
        'h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2',
        selected && 'border-sky-300 bg-sky-100/60 hover:bg-sky-100',
        selected &&
          status === 'correct' &&
          'border-green-300 bg-green-100/60 hover:bg-green-100',
        selected &&
          status === 'wrong' &&
          'border-rose-300 bg-rose-100/60 hover:bg-rose-100',
        disabled && 'pointer-events-none hover:bg-white',
        type === 'ASSIST' && 'lg:p-3 w-full',
      )}
    >
      {imageSrc && (
        <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
          <Image src={imageSrc} fill alt={text} />
        </div>
      )}
      <div
        className={cn(
          'flex items-center justify-between',
          type === 'ASSIST' && 'flex-row-reverse',
        )}
      >
        {type === 'ASSIST' && <div />}
        <p
          className={cn(
            'text-neutral-600 text-sm lg:text-base',
            selected && 'text-sky-500',
            selected && status === 'correct' && 'text-green-500 ',
            selected && status === 'wrong' && 'text-rose-500',
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            'flex items-center justify-center rounded-lg border-2 text-neutral-400 text-xs lg:text-[15px] font-semibold lg:w-[30px] lg:h-[30px] w-5 h-5',
            selected && 'border-sky-300 text-sky-500',
            selected &&
              status === 'correct' &&
              'border-green-500 text-green-500',
            selected && status === 'wrong' && 'border-rose-500 text-rose-500',
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  )
}
