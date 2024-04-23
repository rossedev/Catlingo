import { FeedWrapper } from '@/components/FeedWrapper'
import { StickyWrapper } from '@/components/StickyWrapper'
import { Header } from './Header'
import { UserProgress } from '@/components/UserProgress'
import { getUserProgress } from '@/db/queries'
import { redirect } from 'next/navigation'

const defaultCourse = {
  title: 'Spanish',
  imageSrc: '/es.svg',
}

const LearnPage = async () => {
  const [userProgress] = await Promise.all([getUserProgress()])

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses')
  }

  return (
    <div className="flex gap-12 px-6">
      <FeedWrapper>
        <Header title="Spanish" />
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          activeCourse={defaultCourse}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  )
}

export default LearnPage
