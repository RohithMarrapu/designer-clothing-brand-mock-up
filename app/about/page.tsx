import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <div className="pt-24 pb-16 bg-black text-white">
      {/* Header */}
      <div className="bg-black py-8 mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-playfair text-center">Our Story</h1>
        </div>
      </div>

      {/* Brand Philosophy */}
      <section className="py-12 md:py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-playfair mb-6">The AYSEGUL IKNA Philosophy</h2>
            <p className="text-lg mb-6 leading-relaxed text-white">
              OUR MISSION GOES BEYOND CLOTHING; WE TEACH FUTURE DESIGNERS HOW TO BUILD SUSTAINABLE FASHION LINES. TRUE CHANGE IN THE INDUSTRY STARTS WITH EDUCATION AND INTENTION.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We believe in the power of exceptional quality, thoughtful design, and responsible production methods. 
              Each garment represents our commitment to these values.
            </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-12 md:py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-playfair mb-6">Exceptional Craftsmanship</h2>
              <p className="mb-4 leading-relaxed text-white">
                Our designs come to life in small, specialized ateliers across Europe, where skilled artisans apply 
                techniques passed down through generations.
              </p>
              <p className="mb-4 leading-relaxed text-white">
                We work with family-owned workshops in Italy, France, and Portugal, many of which have been perfecting 
                their craft for over a century. This connection to traditional methods and human expertise is at the 
                heart of our approach.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Every detail matters—from hand-finished seams to carefully selected buttons. This meticulous attention 
                extends to every stage of creation.
              </p>
            </div>
            <div className="order-first lg:order-last">
              <div className="aspect-[4/3] relative">
                <Image 
                  src="https://images.pexels.com/photos/6102081/pexels-photo-6102081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Artisan working on garment"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-12 md:py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-first">
              <div className="aspect-[4/3] relative">
                <Image 
                  src="https://images.pexels.com/photos/6102009/pexels-photo-6102009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Premium fabric materials"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-playfair mb-6">The Finest Materials</h2>
              <p className="mb-4 leading-relaxed text-white">
                We source only the highest quality natural materials from ethical suppliers with transparent practices.
                From Italian cashmere to Japanese denim, every fabric is selected for its exceptional quality and longevity.
              </p>
              <p className="mb-4 leading-relaxed text-white">
                Our long-standing relationships with mills and suppliers allow us to access unique, limited-production 
                materials that give our pieces their distinctive character.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Each season, we continue to explore innovative fabrics that meet our standards for quality, sustainability, 
                and beauty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="py-12 md:py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-playfair mb-6">Design Philosophy</h2>
            <p className="text-lg mb-6 leading-relaxed text-white">
              Our design approach centers on creating pieces with timeless elegance, subtle innovation, and 
              impeccable fit. We believe in design that serves a purpose, with every element carefully considered.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Rather than following trends, we focus on creating garments that resonate with their wearer for years to come, 
              building a lasting wardrobe of exceptional pieces.
            </p>
            <Button asChild size="lg">
              <Link href="/shop">
                Explore Collection
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
