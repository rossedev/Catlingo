'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export const Promo = () => {
  const router = useRouter()

  const handleUpgrade = () => [router.push('/shop')]

  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image src="/icons/unlimited.svg" alt="Pro" width={26} height={26} />
          <h3 className="font-bold text-lg">Upgrade to Pro</h3>
        </div>
        <p className="text-muted-foreground">Get unlimited hearts and more!</p>
      </div>
      <Button
        variant="super"
        className="w-full"
        size="lg"
        onClick={handleUpgrade}
      >
        Upgrade today
      </Button>
    </div>
  )
}
