import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries'
import { redirect } from 'next/navigation'
import { Quiz } from '../components/Quiz'

type TLessonIdPageProps = {
  params: {
    lessonId: number
  }
}

const LessonIdPage = async ({ params }: TLessonIdPageProps) => {
  const [lesson, userProgress, userSubscription] = await Promise.all([
    getLesson(params.lessonId),
    getUserProgress(),
    getUserSubscription(),
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
      userSubscription={userSubscription}
    />
  )
}

export default LessonIdPage
