'use client'

import { Button } from '@/components/ui/button'
import { Marquee } from '@/components/ui/marquee'
import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
  const marqueeText = "PREMIUM QUALITY • SUSTAINABLE FABRICS • ETHICAL PRODUCTION • LUXURY DESIGN • WORLDWIDE SHIPPING •"

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-screen flex items-center justify-center mt-16">
        {/* Background Image - Using Next.js Image component */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png" // Your image in public folder
            alt="AYSEGUL IKNA Collection"
            fill
            className="object-contain object-center" // Maintains aspect ratio without cropping
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white mb-6 leading-tight">
              The Summer <span className="font-medium">Collection</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Embrace the warmth with our curated selection of lightweight fabrics and 
              elegant silhouettes designed for the season.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 min-w-[160px]">
                <Link href="/shop">
                  Shop Women
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 min-w-[160px]">
                <Link href="/shop">
                  Shop Men
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Text Banner with Carousel Effect */}
      <div className="w-full bg-black py-4 overflow-hidden">
        <Marquee>
          <span className="text-white text-xl md:text-2xl font-medium tracking-wider uppercase mx-4">
            {marqueeText}
          </span>
        </Marquee>
      </div>

      {/* Three Long Images - Showing full width without cropping */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="relative h-[500px] overflow-hidden rounded-lg">
            <img
              src="/b_and_w_1.png"
              alt="New Arrivals"
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 bg-black"
              style={{ objectPosition: 'center' }}
            />
          </div>
          
          <div className="relative h-[500px] overflow-hidden rounded-lg">
            <img
              src="/b_and_w_2.png"
              alt="Summer Essentials"
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 bg-black"
              style={{ objectPosition: 'center' }}
            />
          </div>
          
          <div className="relative h-[500px] overflow-hidden rounded-lg">
            <img
              src="/b_and_w_3.png"
              alt="Limited Edition"
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 bg-black"
              style={{ objectPosition: 'center' }}
            />
          </div>
        </div>

        {/* Text Section Below Images */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
            WE CREATE HIGH-QUALITY GARMENTS USING UPCYCLED MATERIALS AND EXPERT CONSTRUCTION. FASHION CAN BE BOTH LUXURIOUS AND SUSTAINABLE — AND WE'RE HERE TO PROVE IT.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero