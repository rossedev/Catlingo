import Image from 'next/image'
import { Button } from './ui/button'

interface ICountryButtonProps {
  imageSrc: string
  nameCountry: string
}
export const CountryButton = ({
  imageSrc,
  nameCountry,
}: ICountryButtonProps) => {
  return (
    <Button size="lg" variant="ghost" className="w-full">
      <Image
        src={imageSrc}
        alt={nameCountry}
        height={32}
        width={40}
        className="mr-4 rounded-md"
      />
      <span>{nameCountry}</span>
    </Button>
  )
}
