import { FeedWrapper } from '@/components/FeedWrapper'
import { StickyWrapper } from '@/components/StickyWrapper'
import { Header } from './Header'
import { UserProgress } from '@/components/UserProgress'
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from '@/db/queries'
import { redirect } from 'next/navigation'
import { Unit } from './Unit'

const LearnPage = async () => {
  const [userProgress, units, courseProgress, lessonPercentage] =
    await Promise.all([
      getUserProgress(),
      getUnits(),
      getCourseProgress(),
      getLessonPercentage(),
    ])

  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
    redirect('/courses')
  }

  return (
    <div className="flex gap-12 px-6">
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit: any) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  )
}

export default LearnPage
