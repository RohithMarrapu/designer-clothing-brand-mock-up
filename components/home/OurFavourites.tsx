import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const OurFavourites = () => {
  // Hardcoded favourite items data
  const favourites = [
    {
      id: 'favourite-1',
      name: 'Signature Silk Dress',
      price: 289.99,
      image: '/fav_left.jpg'
    },
    {
      id: 'favourite-2',
      name: 'Linen Tailored Blazer',
      price: 249.99,
      image: '/fav_middle.jpg'
    },
    {
      id: 'favourite-3',
      name: 'Cashmere Evening Wrap',
      price: 199.99,
      image: '/fav_right.jpg'
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-[#FFFBF4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 
            className="text-3xl md:text-8xl mb-4 text-[#2E2B26]"
            style={{ fontFamily: 'Hornset, sans-serif' }}
          >
            IKNA'S FAVOURITES
          </h2>
          <p 
            className="text-xl md:text-2xl text-[#2E2B26] max-w-3xl"
            style={{ fontFamily: 'Hornset, sans-serif' }}
          >
            Timeless pieces we adore, season after season
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {favourites.map((item) => (
            <div key={item.id} className="group flex flex-col">
              <div className="relative h-[500px] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: 'center' }}
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <h3 
                  className="text-xl text-[#2E2B26]"
                  style={{ fontFamily: 'Hornset, sans-serif' }}
                >
                  {item.name}
                </h3>
                <p 
                  className="text-[#2E2B26] mt-1"
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
            className="inline-flex items-center hover:underline text-[#2E2B26]"
            style={{ fontFamily: 'Hornset, sans-serif' }}
          >
            Discover More Favourites
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default OurFavourites