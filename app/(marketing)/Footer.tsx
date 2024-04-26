import { CountryButton } from '@/components/CountryButton'
import countriesList from '@/data/countriesList.json'

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200">
      <div className="flex max-w-screen-lg mx-auto items-center justify-evenly h-full">
        {countriesList.map((country) => (
          <CountryButton
            imageSrc={country.imageSrc}
            nameCountry={country.title}
            key={country.title}
          />
        ))}
      </div>
    </footer>
  )
}
