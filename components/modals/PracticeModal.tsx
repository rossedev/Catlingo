'use client'

import { Modal } from './Modal'
import { usePracticeModal } from '@/store/useModal'
import { Button } from '../ui/button'

export const PracticeModal = () => {
  const { isOpen, close } = usePracticeModal()

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      title="Practice lesson"
      description="Use practice lessons to regain hearts and points. You cannot loose hearts or points in practice lessons."
      buttonCancel={
        <Button variant="primary" className="w-full" size="lg" onClick={close}>
          I understand
        </Button>
      }
      img={{ src: '/icons/heart.svg', alt: 'Heart', width: 100, height: 100 }}
    />
  )
}
