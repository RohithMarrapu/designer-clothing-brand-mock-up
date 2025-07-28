import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const FeaturedCollection = () => {
  // Custom featured products data with only 3 products
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
    <section className="py-20 md:py-32 bg-[#FFFBF4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 
            className="text-4xl md:text-8xl mb-6 text-[#2E2B26]"
            style={{ fontFamily: 'Hornset, sans-serif' }}
          >
            FEATURED COLLECTION
          </h2>
          <p 
            className="text-xl md:text-2xl text-[#2E2B26] max-w-3xl"
            style={{ fontFamily: 'Hornset, sans-serif' }}
          >
            Discover our most coveted pieces, meticulously crafted with premium materials
            and impeccable attention to detail.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {featuredProducts.map((product) => (
            <Link 
              href={`/shop/${product.id}`} 
              key={product.id}
              className="group flex flex-col"
            >
              <div className="relative h-[550px] w-full overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: 'center' }}
                  priority
                />
              </div>
              <div className="mt-6 text-center">
                <h3 
                  className="text-xl md:text-2xl text-[#2E2B26]"
                  style={{ fontFamily: 'Hornset, sans-serif' }}
                >
                  {product.name}
                </h3>
                <p 
                  className="text-xl text-[#2E2B26] mt-2"
                  style={{ fontFamily: 'Hornset, sans-serif' }}
                >
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center mt-16">
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