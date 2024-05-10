import { HeartIcon } from '@/components/HeartIcon'
import { Progress } from '@/components/ui/progress'
import { useExitModal } from '@/store/useModal'
import { InfinityIcon, X } from 'lucide-react'

type THeaderProps = {
  hearts: number
  percentage: number
  hasActiveSubscription: boolean
}

export const Header = ({
  hearts,
  percentage,
  hasActiveSubscription,
}: THeaderProps) => {
  const { open } = useExitModal()

  return (
    <header className="flex pt-5 lg:pt-12 px-10 gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <X
        onClick={open}
        className="text-slate-500 hover:opacity-75 translation cursor-pointer"
      />
      <Progress value={percentage} />

      <div className="flex items-center font-bold text-rose-500">
        <HeartIcon />
        {hasActiveSubscription ? (
          <InfinityIcon className="h-6 w-6 stroke-[3]" />
        ) : (
          hearts
        )}
      </div>
    </header>
  )
}
