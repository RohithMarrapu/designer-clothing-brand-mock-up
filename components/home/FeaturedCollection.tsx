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
    <section className="py-16 md:py-24 bg-[#FFFBF4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair mb-4 text-[#2E2B26]">Featured Collection</h2>
          <p className="text-[#2E2B26] max-w-2xl mx-auto font-medium">
            Discover our most coveted pieces, meticulously crafted with premium materials
            and impeccable attention to detail.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: 'center' }}
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-[#2E2B26]">{product.name}</h3>
                <p className="text-[#2E2B26] mt-1 font-semibold">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link 
            href="/shop" 
            className="inline-flex items-center text-sm font-semibold hover:underline text-[#2E2B26]"
          >
            View All Collection
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollection