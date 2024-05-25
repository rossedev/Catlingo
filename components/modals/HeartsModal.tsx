'use client'

import { useRouter } from 'next/navigation'
import { Modal } from './Modal'
import { useModal } from '@/store/useModal'
import { Button } from '../ui/button'

export const HeartsModal = () => {
  const router = useRouter()
  const { isOpen, close } = useModal()

  const onClick = () => {
    close()
    router.push('/store')
  }

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      img={{ src: '/icons/bad.svg' }}
      title="You ran out of hearts!"
      description="Get Pro for unlimited hearts, or purchase them in the store."
      buttonPrimary={
        <Button
          variant="primary"
          className="w-full"
          size="lg"
          onClick={onClick}
        >
          Get Unlimited Hearts
        </Button>
      }
      buttonCancel={
        <Button
          variant="primaryOutline"
          className="w-full"
          size="lg"
          onClick={close}
        >
          No thanks
        </Button>
      }
    />
  )
}
