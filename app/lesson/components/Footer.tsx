import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TStatus } from '@/types/defaults'
import { useFooter } from './useFooter'

type TFooterProps = {
  onCheck: () => void
  status: TStatus | 'completed'
  disabled?: boolean
  lessonId?: boolean
}

type TMessageFooterProps = {
  text: string
  className: string
  Icon: any
}

export const Footer = ({
  onCheck,
  disabled,
  lessonId,
  status,
}: TFooterProps) => {
  const { isMobile, textForStatus } = useFooter(lessonId, onCheck)
  return (
    <footer
      className={cn(
        'h-[100px] lg:-h-[140px] border-t-2',
        status === 'correct' && 'border-transparent bg-green-100',
        status === 'wrong' && 'border-transparent bg-rose-100',
      )}
    >
      <div className="flex max-w-[1140px] h-full mx-auto items-center justify-between px-6 lg:px-10">
        {textForStatus[status].messageFooter &&
          textForStatus[status].messageFooter}
        <Button
          disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? 'sm' : 'lg'}
          variant={status === 'wrong' ? 'danger' : 'secondary'}
        >
          {textForStatus[status].buttonText}
        </Button>
      </div>
    </footer>
  )
}

export const MessageFooter = ({
  text,
  className,
  Icon,
}: TMessageFooterProps) => {
  return (
    <div
      className={`${className} flex items-center font-bold gap-2.5 text-base lg:text-2xl`}
    >
      <Icon clasName="h-6 w-6 lg:h-10 lg:w-10" />
      {text}
    </div>
  )
}
