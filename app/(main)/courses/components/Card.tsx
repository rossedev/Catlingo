import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import Image from 'next/image'

type TCardProps = {
  title: string
  id: number
  imageSrc: string
  onClick: (id: number) => void
  disabled?: boolean
  active?: boolean
}

export const Card = ({
  title,
  id,
  imageSrc,
  onClick,
  disabled,
  active,
}: TCardProps) => {
  const handleClickCard = () => {
    return onClick(id)
  }
  return (
    <div
      onClick={handleClickCard}
      className={cn(
        'flex flex-col h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 items-center justify-between p-3 pb-6 sm:justify-self-center sm:self-center w-full min-h-[200px] md:max-w-[300px]',
        disabled && 'pointer-events-none opacity-50',
      )}
    >
      <div
        className={cn(
          'flex min-[24px] w-full items-center justify-end',
          !active && 'p-3',
        )}
      >
        {active && (
          <div className="flex rounded-xl bg-green-600 items-center justify-center p-1">
            <Check className="h-3 w-3 text-white stroke-[4]" />
          </div>
        )}
      </div>
      <Image
        src={imageSrc}
        alt={title}
        height={10}
        width={80}
        className="rounded-lg drop-shadow-sm border object-cover"
      />
      <p className="text-neutral-700 text-center font-bold mt-3">{title}</p>
    </div>
  )
}
