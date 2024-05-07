'use server'

import db from '@/db/drizzle'
import { getCourseById, getUserProgress } from '@/db/queries'
import { userProgress } from '@/db/schema'
import { auth, currentUser } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const upsertUserProgress = async (courseID: number) => {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    throw new Error('Unauthorized')
  }

  const course = await getCourseById(courseID)

  if (!course) {
    throw new Error('Course not found')
  }

  /* TODO: Units and Lessons
    if(!course.units.length || !course.units[0].lessons.length){
        throw new Error("Course empty")
    } */

  const existingUserProgress = await getUserProgress()

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseID,
      userName: user.firstName || 'User',
      userImageSrc: user.imageUrl || '/icons/mascot.svg',
    })

    revalidatePath('/courses')
    revalidatePath('/learn')
    redirect('/learn')
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseID,
    userName: user.firstName || 'User',
    userImageSrc: user.imageUrl || '/icons/mascot.svg',
  })
  revalidatePath('/courses')
  revalidatePath('/learn')
  redirect('/learn')
}
