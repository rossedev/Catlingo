import { FeedWrapper } from '@/components/FeedWrapper'
import { StickyWrapper } from '@/components/StickyWrapper'
import { UserProgress } from '@/components/UserProgress'
import { getUserProgress, getUserSubscription } from '@/db/queries'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import quests from '@/data/quests.json'
import { Progress } from '@/components/ui/progress'
import { Promo } from '@/components/Promo'

const QuestsPage = async () => {
  const [userProgress, userSubscription] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
  ])

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses')
  }

  const isPro = !!userSubscription?.isActive

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        {/* TODO: Create or replace this element because is it reappearing */}
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
      </StickyWrapper>
      <FeedWrapper>
        <div className="flex flex-col items-center w-full">
          <Image src="/icons/quests.svg" alt="Quests" height={90} width={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-4">
            Quests
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-4">
            Complete quests by earning points
          </p>
          <ul className="w-full">
            {quests.map((quest) => {
              const progress = (userProgress.points / quest.value) * 100

              return (
                <div
                  className="flex items-center w-full p-4 gap-x-4 border-t-2"
                  key={quest?.title}
                >
                  <Image
                    src="/icons/points.svg"
                    alt="Points"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col gap-y-2 w-full">
                    <p className="text-neutral-700 text-lg font-bold">
                      {quest.title}
                    </p>
                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              )
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  )
}

export default QuestsPage
