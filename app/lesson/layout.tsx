import { TLayoutProps } from '@/types/defaults'

const LessonLayout = ({ children }: TLayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full w-full">{children}</div>
    </div>
  )
}

export default LessonLayout
