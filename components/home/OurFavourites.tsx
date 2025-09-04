import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const OurFavourites = () => {
  const favourites = [
    { image: '/fav_left.webp' },
    { image: '/fav_middle.webp' },
    { image: '/fav_right.webp' }
  ]

  return (
    <section className="py-16 md:py-24 bg-[#FFFFFF] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading with mix-blend-difference effect */}
        <h2 
          className="text-6xl md:text-9xl text-[#ffffff] relative z-10 mb-[-1.5rem] md:mb-[-3.5rem] 
                    mix-blend-difference"
          style={{ 
            fontFamily: 'Hornset, sans-serif',
            lineHeight: '0.8',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          IKNA&apos;S FAVOURITES
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative">
          {favourites.map((item, index) => (
            <div key={index} className="group flex flex-col">
              <div className="relative h-[500px] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt="Featured favourite item"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                  style={{ objectPosition: 'center' }}
                  priority
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-16">
          <Link 
            href="/collections" 
            className="inline-flex items-center hover:underline text-[#2E2B26] text-xl md:text-2xl"
            style={{ fontFamily: 'Hornset, sans-serif' }}
          >
            Discover More Favourites
            <ArrowRight size={24} className="ml-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default OurFavourites