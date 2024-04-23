import { ReactNode } from 'react'

type TStickyWrapperProps = {
  children: ReactNode
}

export const StickyWrapper = ({ children }: TStickyWrapperProps) => {
  return (
    <div className="hidden lg:block sticky w-[368px] self-end bottom-6">
      <div className="flex flex-col sticky gap-y-4 min-h-[calc(100vh-48px)] top-6">
        {children}
      </div>
    </div>
  )
}
