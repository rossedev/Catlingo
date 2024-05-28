'use client'

import { useRouter } from 'next/navigation'
import { Modal } from './Modal'
import { useExitModal } from '@/store/useModal'
import { Button } from '../ui/button'

export const ExitModal = () => {
  const router = useRouter()
  const { isOpen, close } = useExitModal()

  const handleClose = () => {
    close()
    router.push('/learn')
  }

  return (
    <Modal
      isOpen={isOpen}
      close={handleClose}
      img={{ src: '/icons/warning.svg' }}
      title="Wait, don't go!"
      description="You're about to leave the lesson. Are you sure?"
      buttonPrimary={
        <Button variant="primary" className="w-full" size="lg" onClick={close}>
          Keep learning
        </Button>
      }
      buttonCancel={
        <Button
          variant="dangerOutline"
          className="w-full"
          size="lg"
          onClick={handleClose}
        >
          End lesson
        </Button>
      }
    />
  )
}
