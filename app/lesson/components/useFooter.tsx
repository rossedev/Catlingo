import { CheckCircle, XCircle } from 'lucide-react'
import { MessageFooter } from './Footer'
import { Button } from '@/components/ui/button'
import { useKey, useMedia } from 'react-use'

export const useFooter = (
  lessonId: boolean | undefined,
  onCheck: () => void,
) => {
  const isMobile = useMedia('(max-width:1024px)')
  useKey('Enter', onCheck, {}, [onCheck])

  const textForStatus = {
    none: {
      buttonText: 'Check',
      messageFooter: null,
    },
    correct: {
      buttonText: 'Next',
      messageFooter: (
        <MessageFooter
          Icon={CheckCircle}
          className="text-green-500"
          text="Nicely done!"
        />
      ),
    },
    wrong: {
      buttonText: 'Retry',
      messageFooter: (
        <MessageFooter
          Icon={XCircle}
          className="text-rose-500"
          text="Try again"
        />
      ),
    },
    completed: {
      buttonText: 'Continue',
      messageFooter: (
        <Button
          variant="default"
          size={isMobile ? 'sm' : 'lg'}
          onClick={() => (window.location.href = `/lesson/${lessonId}`)}
        >
          Practice again
        </Button>
      ),
    },
  }

  return { isMobile, textForStatus }
}
