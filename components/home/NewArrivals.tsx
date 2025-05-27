import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { getNewArrivals } from '@/lib/data/products'

const NewArrivals = () => {
  const newArrivals = getNewArrivals()

  return (
    <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair mb-4">New Arrivals</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Discover our latest pieces, now available online and in store
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {newArrivals.map((product) => (
            <Link 
              href={`/shop/${product.id}`} 
              key={product.id}
              className="group"
            >
              <div className="image-zoom-container">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={600}
                  height={800}
                  className="image-zoom w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-medium group-hover:underline transition-all">
                    {product.name}
                  </h3>
                  <span className="text-sm bg-black text-white dark:bg-white dark:text-black px-2 py-1">
                    New
                  </span>
                </div>
                <p className="price">{product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link 
            href="/shop" 
            className="inline-flex items-center text-sm font-medium hover:underline"
          >
            View All New Arrivals
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NewArrivals