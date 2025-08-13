import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section - Stacked on mobile, split on desktop */}
      <section className="relative md:h-screen h-[120vh] flex flex-col md:flex-row mt-20">
        {/* Left Image - Full width on mobile, 66% on desktop */}
        <div className="relative w-full md:w-2/3 h-1/2 md:h-full">
          <Image
            src="/about_left.webp"
            alt="AYSEGUL IKNA Designs Left"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute inset-0 flex items-center justify-start z-10 p-6 md:pl-12 lg:pl-24">
            <div className="text-left space-y-4 md:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-widest text-white">
                AYSEGUL IKNA DESIGNS
              </h1>
              <div className="space-y-3 md:space-y-4">
                <p className="text-white max-w-md text-sm sm:text-base leading-relaxed">
                  Aysegul, a graduate of Atlanta&apos;s Savannah College of Art and Design, is a designer and advocate for slow fashion. 
                  Her label, Aysegul Ikna Designs, offers modern, carefully crafted pieces for women that combine style with purpose.
                </p>
                <p className="text-white max-w-md text-sm sm:text-base leading-relaxed">
                  Using recycled and locally sourced fabrics from scraps and surplus clothing, she works with local traders to ensure 
                  materials are sustainable and community focused.
                </p>
                <p className="text-white max-w-md text-sm sm:text-base leading-relaxed">
                  The brand embraces eco friendly, ethical, and green values, creating garments that look and feel exceptional while 
                  reducing environmental impact. With sustainability at its heart, it strives to shape a more responsible fashion industry.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Image - Full width on mobile, 34% on desktop */}
        <div className="relative w-full md:w-1/3 h-1/2 md:h-full">
          <Image
            src="/myPassportSizePhoto.jpg"
            alt="AYSEGUL IKNA Portrait"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
      </section>

      {/* Full-width Image Section - Reduced height on mobile */}
      <section className="relative h-[60vh] md:h-screen w-full">
        <div className="relative w-full h-full">
          <Image
            src="/about_collage.webp"
            alt="AYSEGUL IKNA Design Collection"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
      </section>

      {/* Text Content Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="text-base md:text-lg leading-relaxed space-y-4">
          <p>
            Each garment represents our commitment to exceptional quality and traditional techniques. From selecting the finest materials to the final stitch, our meticulous approach ensures pieces of enduring beauty.
          </p>
          <p>
            Our artisans bring decades of experience and passion to every piece, preserving time-honored techniques while embracing contemporary innovation.
          </p>
        </div>
      </section>

      {/* Split Image Section - Stacked on mobile */}
      <section className="relative flex flex-col md:flex-row h-auto md:h-screen">
        {/* Left Image - Full width on mobile, 60% on desktop */}
        <div className="relative w-full md:w-3/5 h-[50vh] md:h-full">
          <Image
            src="/about_left_2.webp"
            alt="AYSEGUL IKNA Studio"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        
        {/* Right Image - Full width on mobile, 40% on desktop */}
        <div className="relative w-full md:w-2/5 h-[50vh] md:h-full">
          <Image
            src="/about_right_2.webp"
            alt="AYSEGUL IKNA Craftsmanship"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
      </section>

      {/* Full-width Image with Text - Reduced height on mobile */}
      <section className="relative h-[60vh] md:h-screen w-full">
        <div className="relative w-full h-full">
          <Image
            src="/about_left.webp"
            alt="AYSEGUL IKNA Showcase"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white bg-opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-900 text-center">
              ECO. ETHICAL. GREEN. ALWAYS.
            </h2>
          </div>
        </div>
      </section>
    </div>
  )
}