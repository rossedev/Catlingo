import { challengeOptions, challenges } from '@/db/schema'
import { cn } from '@/lib/utils'
import { Card } from './Card'

type TChallengeProps = {
  options: (typeof challengeOptions.$inferSelect)[]
  onSelect: (id: number) => void
  status: 'correct' | 'wrong' | 'none'
  selectedOption?: number
  disabled?: boolean
  type: (typeof challenges.$inferSelect)['type']
}

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: TChallengeProps) => {
  return (
    <div
      className={cn(
        'grid gap-2',
        type === 'ASSIST' && 'grid-cols-1',
        type === 'SELECT' &&
          'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]',
      )}
    >
      {options.map((option, index) => (
        <Card
          key={option.id}
          id={option.id}
          text={option.text}
          imageSrc={option.imageSrc}
          audioSrc={option.audioSrc}
          shortcut={`${index + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          disabled={disabled}
          type={type}
        />
      ))}
    </div>
  )
}
