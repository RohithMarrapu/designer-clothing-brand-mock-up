import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Editorial = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div 
              className="aspect-[4/5] relative overflow-hidden"
              style={{ 
                backgroundImage: 'url(https://images.pexels.com/photos/6401656/pexels-photo-6401656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
            </div>
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6 max-w-xl mx-auto lg:mx-0">
            <h2 className="text-3xl md:text-4xl font-playfair mb-4">The Art of Craftsmanship</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Each garment represents our commitment to exceptional quality and traditional techniques.
              From selecting the finest materials to the final stitch, our meticulous approach ensures
              pieces of enduring beauty.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Our artisans bring decades of experience and passion to every piece, preserving time-honored
              techniques while embracing contemporary innovation.
            </p>
            <div className="pt-4">
              <Button asChild variant="outline" size="lg" className="border-black dark:border-white">
                <Link href="/about">
                  Discover Our Story
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Editorial