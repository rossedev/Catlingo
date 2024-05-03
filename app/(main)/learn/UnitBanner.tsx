import { Button } from '@/components/ui/button'
import { NotebookText } from 'lucide-react'
import Link from 'next/link'

type TUnitBannerProps = {
  title: string
  description: string
}

export const UnitBanner = ({ title, description }: TUnitBannerProps) => {
  return (
    <div className="flex w-full rounded-xl bg-green-500 p-5 text-white items-center justify-between">
      <div className="space-y-2.5">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>
      <Link href="/lesson">
        <Button
          size="lg"
          variant="secondary"
          className="hidden xl:flex border-2 border-b-4 active-b-2"
        >
          <NotebookText className="mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  )
}
