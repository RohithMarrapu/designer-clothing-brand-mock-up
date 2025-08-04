import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const FeaturedCollection = () => {
  const featuredProducts = [
    {
      id: 'dress-1',
      name: 'Elegant Evening Dress',
      price: 249.99,
      images: ['/feature_left.jpg']
    },
    {
      id: 'dress-2',
      name: 'Summer Floral Dress',
      price: 189.99,
      images: ['/feature_middle.jpg']
    },
    {
      id: 'dress-3',
      name: 'Classic Black Gown',
      price: 279.99,
      images: ['/feature_right.jpg']
    }
  ]

  return (
    <section className="py-12 bg-[#FFFBF4] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading with reduced overlap (40%) */}
        <h2 
          className="text-6xl md:text-9xl text-[#ffffff] relative z-10 mb-[-1.5rem] md:mb-[-3.5rem] 
                    mix-blend-difference"
          style={{ 
            fontFamily: 'Hornset, sans-serif',
            lineHeight: '0.8',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          FEATURED COLLECTION
        </h2>
        
        {/* Images grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative">
          {featuredProducts.map((product) => (
            <Link 
              href={`/shop/${product.id}`} 
              key={product.id}
              className="group flex flex-col"
            >
              <div className="relative h-[500px] w-full overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                  style={{ objectPosition: 'center' }}
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl md:text-2xl text-[#2E2B26]" style={{ fontFamily: 'Hornset, sans-serif' }}>
                  {product.name}
                </h3>
                <p className="text-xl text-[#2E2B26] mt-1" style={{ fontFamily: 'Hornset, sans-serif' }}>
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link 
            href="/shop" 
            className="inline-flex items-center hover:underline text-[#2E2B26] text-lg md:text-xl"
            style={{ fontFamily: 'Hornset, sans-serif' }}
          >
            VIEW ALL COLLECTION
            <ArrowRight size={20} className="ml-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollection