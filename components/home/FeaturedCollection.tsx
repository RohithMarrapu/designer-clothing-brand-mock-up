import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const FeaturedCollection = () => {
  // Custom featured products data using your images
  const featuredProducts = [
    {
      id: 'dress-1',
      name: 'Elegant Evening Dress',
      price: 249.99,
      images: ['/dress_1.png']
    },
    {
      id: 'dress-2',
      name: 'Summer Floral Dress',
      price: 189.99,
      images: ['/dress_2.png']
    },
    {
      id: 'dress-3',
      name: 'Classic Black Gown',
      price: 279.99,
      images: ['/dress_3.png']
    },
    {
      id: 'dress-4',
      name: 'Chic Cocktail Dress',
      price: 219.99,
      images: ['/dress_4.png']
    }
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair mb-4">Featured Collection</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Discover our most coveted pieces, meticulously crafted with premium materials
            and impeccable attention to detail.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Link 
              href={`/shop/${product.id}`} 
              key={product.id}
              className="group flex flex-col"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                  // Removed explicit background color to inherit from parent
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-black dark:text-white">{product.name}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link 
            href="/shop" 
            className="inline-flex items-center text-sm font-medium hover:underline text-black dark:text-white"
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