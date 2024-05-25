import { auth } from '@clerk/nextjs'

export const isAdmin = () => {
  const adminIds = process.env.NEXT_PUBLIC_PERMISSION_ID
  const { userId } = auth()

  if (!userId || !adminIds) {
    return false
  }

  return adminIds.indexOf(userId) !== -1
}
