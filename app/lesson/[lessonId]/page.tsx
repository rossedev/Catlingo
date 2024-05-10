import { getLesson, getUserProgress } from '@/db/queries'
import { redirect } from 'next/navigation'
import { Quiz } from '../components/Quiz'

type TLessonIdPageProps = {
  params: {
    lessonId: number
  }
}

const LessonIdPage = async ({ params }: TLessonIdPageProps) => {
  const [lesson, userProgress] = await Promise.all([
    getLesson(params.lessonId),
    getUserProgress(),
  ])

  if (!lesson || !userProgress) {
    redirect('/learn')
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge: any) => challenge.completed).length /
      lesson.challenges.length) *
    100

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={null}
    />
  )
}

export default LessonIdPage
