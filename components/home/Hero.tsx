'use client'

import { Button } from '@/components/ui/button'
import { Marquee } from '@/components/ui/marquee'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  const marqueeText = "REPRESENTS ALL THINGS ECO, ETHICAL & GREEN IN ONE UNIFIED MOVEMENT • REPRESENTS ALL THINGS ECO, ETHICAL & GREEN IN ONE UNIFIED MOVEMENT • REPRESENTS ALL THINGS ECO, ETHICAL & GREEN IN ONE UNIFIED MOVEMENT •"

  return (
    <div className="relative w-full overflow-hidden bg-[#FFFBF4]">
      {/* Hero Section - Stack on mobile */}
      <div className="relative w-full h-auto md:h-screen flex flex-col md:flex-row mt-16 bg-[#FFFBF4]">
        {/* Left Image with Button - Full width on mobile */}
        <div className="w-full md:w-1/2 h-[70vh] md:h-full relative">
          <Image
            src="/hero_left.jpg"
            alt="AYSEGUL IKNA Collection Left"
            fill
            className="object-cover object-center"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-1/3 left-1/4 transform -translate-x-1/4 -translate-y-1/3 z-10">
            <Button asChild className="bg-[#EEDEC5] text-[#4E4A45] hover:bg-[#EEDEC5]/90 min-w-[280px] rounded-none py-8 px-10">
              <Link href="/shop" className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'LostInSouth, sans-serif' }}>
                SHOP NEW IN
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Right Image with Button - Full width on mobile */}
        <div className="w-full md:w-1/2 h-[70vh] md:h-full relative">
          <Image
            src="/hero_right.jpg"
            alt="AYSEGUL IKNA Collection Right"
            fill
            className="object-cover object-center"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/4 translate-y-1/3 z-10">
            <Button asChild className="bg-[#EEDEC5] text-[#4E4A45] hover:bg-[#EEDEC5]/90 min-w-[280px] rounded-none py-8 px-10">
              <Link href="/shop" className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'LostInSouth, sans-serif' }}>
                SHOP NEW IN
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Full-width Text Banner with Carousel Effect */}
      <div className="w-full bg-[#E5DAC8] py-4 overflow-hidden">
        <Marquee>
          <span className="text-black text-xl md:text-2xl font-medium tracking-wider uppercase mx-4">
            {marqueeText}
          </span>
        </Marquee>
      </div>

      {/* Text Section - Proper line wrapping */}
      <div className="w-full bg-[#FFFBF4] pt-12 pb-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <p 
            className="text-2xl md:text-3xl text-neutral-600 dark:text-neutral-400 mb-8"
            style={{ 
              fontFamily: 'Anton, sans-serif', 
              letterSpacing: '0.5px',
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          >
            WE CREATE <span className="text-[#3F433E]" style={{ fontFamily: 'Anton, sans-serif' }}>HIGH-QUALITY</span> GARMENTS USING <span className="text-[#3F433E]" style={{ fontFamily: 'Anton, sans-serif' }}>UPCYCLED MATERIALS</span> AND EXPERT CONSTRUCTION. FASHION CAN BE BOTH LUXURIOUS AND SUSTAINABLE — AND WE'RE HERE TO PROVE IT.
          </p>
        </div>
      </div>

      {/* Three Long Images - Stack on mobile */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 bg-[#FFFBF4]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            <Image
              src="/break_left.jpg"
              alt="New Arrivals"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              style={{ objectPosition: 'center' }}
            />
          </div>
          
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            <Image
              src="/break_middle.jpg"
              alt="Summer Essentials"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              style={{ objectPosition: 'center' }}
            />
          </div>
          
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            <Image
              src="/break_right.jpg"
              alt="Limited Edition"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              style={{ objectPosition: 'center' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero