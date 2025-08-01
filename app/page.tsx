import Hero from '@/components/home/Hero'
import FeaturedCollection from '@/components/home/FeaturedCollection'
import Categories from '@/components/home/Categories'
import Editorial from '@/components/home/Editorial'
import OurFavourites from '@/components/home/OurFavourites'

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedCollection />
      <OurFavourites />
      <Editorial />
    </div>
  )
}