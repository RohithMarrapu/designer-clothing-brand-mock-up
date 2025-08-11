'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

// Load Marquee only on the client to avoid text mismatches
const Marquee = dynamic(
  () => import('@/components/ui/marquee').then(m => m.Marquee),
  { ssr: false }
)

const Hero = () => {
  // (Optional) If any other client-only bits exist, gate them until mounted
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Static, deterministic text (no Date.now/Math.random, etc.)
  const marqueeText =
    'REPRESENTS ALL THINGS ECO, ETHICAL & GREEN IN ONE UNIFIED MOVEMENT • ' +
    'REPRESENTS ALL THINGS ECO, ETHICAL & GREEN IN ONE UNIFIED MOVEMENT • ' +
    'REPRESENTS ALL THINGS ECO, ETHICAL & GREEN IN ONE UNIFIED MOVEMENT •'

  return (
    <div className="relative w-full overflow-hidden bg-[#FFFBF4]">
      {/* Hero Section */}
      <div className="relative w-full h-auto md:h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-[#FFFBF4] mt-16">
        {/* Left Image (LCP) */}
        <div className="w-full md:w-1/2 h-[70vh] md:h-full relative">
          <Image
            src="/hero_left.webp"
            alt="AYSEGUL IKNA — statement tailoring in upcycled textiles"
            fill
            className="object-cover object-center"
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectPosition: 'center top' }}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-1/3 left-1/4 transform -translate-x-1/4 -translate-y-1/3 z-10">
            <Button
              asChild
              className="bg-[#EEDEC5] text-[#4E4A45] hover:bg-[#EEDEC5]/90 min-w-[280px] rounded-none py-8 px-10"
            >
              <Link
                href="/shop"
                className="text-2xl md:text-3xl font-bold"
                style={{ fontFamily: 'LostInSouth, sans-serif' }}
              >
                SHOP NEW IN
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Image (lazy) */}
        <div className="w-full md:w-1/2 h-[70vh] md:h-full relative">
          <Image
            src="/hero_right.webp"
            alt="AYSEGUL IKNA — elevated essentials"
            fill
            className="object-cover object-center"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectPosition: 'center top' }}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/4 translate-y-1/3 z-10">
            <Button
              asChild
              className="bg-[#EEDEC5] text-[#4E4A45] hover:bg-[#EEDEC5]/90 min-w-[280px] rounded-none py-8 px-10"
            >
              <Link
                href="/shop"
                className="text-2xl md:text-3xl font-bold"
                style={{ fontFamily: 'LostInSouth, sans-serif' }}
              >
                SHOP NEW IN
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Full-width Text Banner — client-only marquee to avoid hydration mismatch */}
      <div className="w-full bg-[#E5DAC8] py-4 overflow-hidden">
        {mounted ? (
          <Marquee>
            <span
              className="text-black text-xl md:text-2xl font-medium tracking-wider uppercase mx-4"
              suppressHydrationWarning
            >
              {marqueeText}
            </span>
          </Marquee>
        ) : (
          // Lightweight SSR placeholder (same text, no animation)
          <div className="px-4">
            <span
              className="block text-black text-xl md:text-2xl font-medium tracking-wider uppercase"
              suppressHydrationWarning
            >
              {marqueeText}
            </span>
          </div>
        )}
      </div>

      {/* Three Long Images */}
      <div className="w-full bg-[#FFFBF4] pt-12 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="relative h-[400px] md:h[500px] overflow-hidden">
              <Image
                src="/break_left.webp"
                alt="New Arrivals"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative h-[400px] md:h[500px] overflow-hidden">
              <Image
                src="/break_middle.webp"
                alt="Summer Essentials"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative h-[400px] md:h[500px] overflow-hidden">
              <Image
                src="/break_right.webp"
                alt="Limited Edition"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
