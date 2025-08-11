import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const OurFavourites = () => {
  const favourites = [
    {
      id: 'favourite-1',
      name: 'Signature Silk Dress',
      price: 289.99,
      image: '/fav_left.webp'
    },
    {
      id: 'favourite-2',
      name: 'Linen Tailored Blazer',
      price: 249.99,
      image: '/fav_middle.webp'
    },
    {
      id: 'favourite-3',
      name: 'Cashmere Evening Wrap',
      price: 199.99,
      image: '/fav_right.webp'
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-[#FFFBF4] relative">
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
          IKNA&rsquo;S FAVOURITES
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative">
          {favourites.map((item) => (
            <div key={item.id} className="group flex flex-col">
              <div className="relative h-[500px] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                  style={{ objectPosition: 'center' }}
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <h3 
                  className="text-xl md:text-2xl text-[#2E2B26]"
                  style={{ fontFamily: 'Hornset, sans-serif' }}
                >
                  {item.name}
                </h3>
                <p 
                  className="text-xl text-[#2E2B26] mt-1"
                  style={{ fontFamily: 'Hornset, sans-serif' }}
                >
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link 
            href="/shop" 
            className="inline-flex items-center hover:underline text-[#2E2B26] text-lg md:text-xl"
            style={{ fontFamily: 'Hornset, sans-serif' }}
          >
            Discover More Favourites
            <ArrowRight size={20} className="ml-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default OurFavourites