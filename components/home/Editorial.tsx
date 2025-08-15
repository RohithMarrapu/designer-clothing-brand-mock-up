import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const Editorial = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/craftsmanship.webp" // Update this path to your new image in public folder
                alt="Craftsmanship in progress"
                fill
                className="object-contain" // Changed from object-cover to object-contain
                quality={100}
                priority
                style={{
                  objectPosition: 'center',
                  backgroundColor: '#FFFBF4' // Added matching background color
                }}
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6 max-w-xl mx-auto lg:mx-0">
            <h2 className="text-3xl md:text-8xl mb-4 text-[#5C574F]" style={{ fontFamily: 'Hornset, sans-serif' }}>THE ART OF <span className="text-[#302E2B]" style={{ fontFamily: 'Hornset, sans-serif' }}>CRAFTSMANSHIP</span></h2>
            <p className="text-lg text-[#2E2B26] md:text-2xl leading-relaxed" style={{fontFamily: 'HellasFun, sans-serif'}}>
              Crafted with Meaning, Rooted in Story From Turkish traditions to modern hands, every
              piece Aysegul creates & carries a story of culture, care, and craft.
              Discover the heart behind the work.
            </p>
            <div className="pt-4">
              <Button 
                asChild 
                className="bg-[#252525] text-[#FFFBF4] hover:bg-[#5C574F]/90 min-w-[280px] rounded-none py-8 px-10"
              >
                <Link href="/about" className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'LostInSouth, sans-serif' }}>
                  READ THE FULL STORY
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