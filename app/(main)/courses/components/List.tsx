'use client'

import { courses, userProgress } from '@/db/schema'
import { Card } from './Card'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { upsertUserProgress } from '@/actions/userProgress'
import { toast } from 'sonner'

type TListProps = {
  courses: (typeof courses.$inferSelect)[]
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId
}

export const List = ({ courses, activeCourseId }: TListProps) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const handleClickCard = (id: number) => {
    if (pending) return

    if (id === activeCourseId) {
      return router.push('/learn')
    }

    startTransition(() => {
      upsertUserProgress(id).catch(() => toast.error('Something wrong'))
    })
  }

  return (
    <div className="pt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={handleClickCard}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  )
}
