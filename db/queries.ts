import { cache } from 'react'
import db from './drizzle'
import { auth } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import {
  challengeProgress,
  courses,
  lessons,
  units,
  userProgress,
} from './schema'

export const getUserProgress = cache(async () => {
  const { userId } = await auth()

  if (!userId) return null

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  })

  return data
})

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany()
  return data
})

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    // TODO
  })
  return data
})

export const getUnits = cache(async () => {
  const { userId } = await auth()
  const userProgress = await getUserProgress()

  if (!userId || !userProgress?.activeCourseId) {
    return []
  }

  const baseUnits = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  })

  return normalizedUnits(baseUnits)
})

const normalizedUnits = (units: any) => {
  const modifyData = units.map((unit: any) => {
    const lessonWithStatus = unit.lessons.map((lesson: any) => {
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false }
      }

      const completedChallenges = lesson.challenges.every(
        (challenge: any) =>
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.some(
            (progress: any) => progress.completed === false,
          ),
      )
      return { ...lesson, completed: completedChallenges }
    })
    return { ...unit, lessons: lessonWithStatus }
  })

  return modifyData
}

export const getCourseProgress = cache(async () => {
  const { userId } = await auth()
  const userProgress = await getUserProgress()

  if (!userId || !userProgress?.activeCourseId) {
    return null
  }

  const unitInActiveCourse = await db.query.units.findMany({
    orderBy: (lessons, { asc }) => [asc(lessons.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  })

  const activeLesson = getActiveLesson(unitInActiveCourse)

  return {
    activeLesson: activeLesson,
    activeLessonId: activeLesson?.id,
  }
})

const getActiveLesson = (unitInActiveCourse: any) => {
  return unitInActiveCourse
    .flatMap((unit: any) => unit.lessons)
    .find((lesson: any) => {
      return lesson.challenges.some((challenge: any) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some(
            (progress: any) => progress.completed === false,
          )
        )
      })
    })
}

export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  const courseProgress = await getCourseProgress()
  const lessonId = id || courseProgress?.activeLessonId

  if (!lessonId) {
    return null
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  })

  if (!data || !data.challenges) {
    return null
  }

  const challengesWithCompleted = normalizedChallenges(data)

  return { ...data, challenges: challengesWithCompleted }
})

const normalizedChallenges = (data: any) => {
  return data.challenges.map((challenge: any) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress: any) => progress.completed)

    return { ...challenge, completed }
  })
}

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress()

  if (!courseProgress?.activeLessonId) {
    return 0
  }

  const lesson = await getLesson(courseProgress.activeLessonId)

  if (!lesson) {
    return 0
  }

  //TODO: Changes any types
  const completedChallenges = lesson.challenges.filter(
    (challenge: any) => challenge.completed,
  )
  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100,
  )

  return percentage
})
