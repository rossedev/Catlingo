import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
  publicRoutes: ['/', '/api/webhooks/stripe'],
  afterAuth(auth: any, req) {
    const adminIds = process.env.NEXT_PUBLIC_PERMISSION_ID

    const initURL = new URL('/', req.url)

    if (!adminIds) {
      return NextResponse.redirect('/')
    }

    const existAsAdmin = adminIds.indexOf(auth.userId) !== -1

    if ((!auth?.userId || !existAsAdmin) && !auth.isPublicRoute) {
      return NextResponse.redirect(initURL)
    }
  },
})

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
