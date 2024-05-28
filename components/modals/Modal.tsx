'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import Image from 'next/image'

type TModalProps = {
  close: () => void
  isOpen: boolean
  img: {
    src: string
    alt?: string
    width?: number
    height?: number
  }
  title: string
  description: string
  buttonPrimary?: any
  buttonCancel?: any
}

export const Modal = ({
  isOpen,
  close,
  img,
  title,
  description,
  buttonPrimary,
  buttonCancel,
}: TModalProps) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src={img.src}
              alt={img.alt || 'Mascot'}
              height={img.height || 50}
              width={img.width || 50}
            />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            {buttonPrimary && buttonPrimary}
            {buttonCancel && buttonCancel}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
