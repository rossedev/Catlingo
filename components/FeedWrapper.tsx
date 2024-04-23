import { ReactNode } from 'react'

type TFeedWrapperProps = {
  children: ReactNode
}

export const FeedWrapper = ({ children }: TFeedWrapperProps) => {
  return <div className="relative flex-1 top-0 pb-10">{children}</div>
}
