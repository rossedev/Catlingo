import 'dotenv/config'

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import countriesList from '@/data/countriesList.json'
import unitsList from '@/data/units.json'
import lessonsList from '@/data/lessons.json'
import { challengeOptionsList, challengesList } from '@/data/challenges'

import * as schema from '@/db/schema'

const sql = neon(process.env.DRIZZLE_DB_URL!)
const db = drizzle(sql, { schema })

const main = async () => {
  try {
    console.log('Seeding database')

    await db.delete(schema.courses)
    await db.delete(schema.userProgress)
    await db.delete(schema.units)
    await db.delete(schema.lessons)
    await db.delete(schema.challenges)
    await db.delete(schema.challengeOptions)
    await db.delete(schema.challengeProgress)
    await db.delete(schema.userSubscription)

    await db.insert(schema.courses).values(countriesList)
    await db.insert(schema.units).values(unitsList)
    await db.insert(schema.lessons).values(lessonsList)
    await db.insert(schema.challenges).values(challengesList)
    await db.insert(schema.challengeOptions).values(challengeOptionsList)

    console.log('Seeding finished')
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed the database')
  }
}

main()
