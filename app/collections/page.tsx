"use client"

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const CollectionsPage = () => {
  const collectionsByYear = [
    {
      year: 'FALL 2023',
      collections: [
        {
          title: 'Look 2',
          image: '/2023 Fall/ATLSFW 22 Look 2.webp',
          description: 'Floral inspirations and light fabrics'
        },
        {
          title: 'Look 3',
          image: '/2023 Fall/ATLSFW 22 Look 3.webp',
          description: 'Elegant daytime wear'
        },
        {
          title: 'Look 4',
          image: '/2023 Fall/ATLSFW 22 Look 4.webp',
          description: 'Modern sophistication'
        },
        {
          title: 'Look 5',
          image: '/2023 Fall/ATLSFW 22 Look 5.webp',
          description: 'Structured tailoring'
        },
        {
          title: 'Look 1',
          image: '/2023 Fall/ATLSFW 22 Look1.webp',
          description: 'Bold statement pieces'
        },
        {
          title: 'DSC06997',
          image: '/2023 Fall/DSC06997.webp',
          description: 'Urban elegance'
        },
        {
          title: 'DSC07170',
          image: '/2023 Fall/DSC07170.webp',
          description: 'Romantic aesthetics'
        },
        {
          title: 'DSC07230',
          image: '/2023 Fall/DSC07230.webp',
          description: 'Minimalist luxury'
        },
        {
          title: 'DSC07287',
          image: '/2023 Fall/DSC07287.webp',
          description: 'Sustainable fashion'
        },
        {
          title: 'DSC07318',
          image: '/2023 Fall/DSC07318.webp',
          description: 'Avant-garde creations'
        },
        {
          title: 'DSC07349',
          image: '/2023 Fall/DSC07349.webp',
          description: 'Timeless silhouettes'
        },
        {
          title: 'DSC07363',
          image: '/2023 Fall/DSC07363.webp',
          description: 'Haute couture inspiration'
        },
      ]
    },
    {
      year: 'SUMMER 2023',
      collections: [
        {
          title: 'Spring/Summer 2022',
          image: '/2023 Summer/IMG_9312.webp',
          description: 'Minimalist elegance'
        },
        {
          title: 'Spring/Summer 2022',
          image: '/2023 Summer/IMG_9321.webp',
          description: 'Minimalist elegance'
        },
        {
          title: 'Spring/Summer 2022',
          image: '/2023 Summer/IMG_9339.webp',
          description: 'Minimalist elegance'
        },
        {
          title: 'Spring/Summer 2022',
          image: '/2023 Summer/IMG_9350.webp',
          description: 'Minimalist elegance'
        },
        {
          title: 'Spring/Summer 2022',
          image: '/2023 Summer/IMG_9376.webp',
          description: 'Minimalist elegance'
        },
        {
          title: 'Spring/Summer 2022',
          image: '/2023 Summer/IMG_9383.webp',
          description: 'Minimalist elegance'
        },
        {
          title: 'Spring/Summer 2022',
          image: '/2023 Summer/IMG_9391.webp',
          description: 'Minimalist elegance'
        },
        {
          title: 'Spring/Summer 2022',
          image: '/2023 Summer/IMG_9224.webp',
          description: 'Minimalist elegance'
        },
      ]
    },
    {
      year: 'FALL 2021',
      collections: [
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Aria Blouse and Skirt.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Aria Blouse.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Aria Skirt.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Black Lace Dress Back.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Black Lace Dress.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Blk Dress Back.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Blk Dress with Long Sleeves.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Blk Dress.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Fiyona Dress Back.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Fiyona Dress.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Fiyona Top with Plead Circle Dress.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Fiyona.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Laticia Dress Back.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Laticia Dress.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Long Silk Dress back.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Long Silk Dress.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/pink top.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Puff Sleeve Top Back.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Puff Sleeve Top with Circle Skirt.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Toz Pembe Skirt and Top Back v1.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/Toz Pembe Skirt and Top.webp',
          description: 'Classic with a contemporary twist'
        },
        {
          title: 'Debut Collection',
          image: '/2021 Fall/White Top.webp',
          description: 'Classic with a contemporary twist'
        },
      ]
    }
  ]

  const [activeIndices, setActiveIndices] = useState<Record<string, number>>(
    collectionsByYear.reduce((acc, yearData) => {
      acc[yearData.year] = 0
      return acc
    }, {} as Record<string, number>)
  )

  const nextSlide = (year: string) => {
    setActiveIndices(prev => {
      const yearData = collectionsByYear.find(y => y.year === year)!
      return {
        ...prev,
        [year]: (prev[year] + 1) % yearData.collections.length
      }
    })
  }

  const prevSlide = (year: string) => {
    setActiveIndices(prev => {
      const yearData = collectionsByYear.find(y => y.year === year)!
      return {
        ...prev,
        [year]: (prev[year] - 1 + yearData.collections.length) % yearData.collections.length
      }
    })
  }

  const getVisibleSlides = (year: string) => {
    const yearData = collectionsByYear.find(y => y.year === year)!
    const currentIndex = activeIndices[year]
    const slides = []
    
    // Always show 3 images
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % yearData.collections.length
      slides.push(yearData.collections[index])
    }
    
    return slides
  }

  return (
    <section className="pt-32 pb-16 md:py-24 bg-[#FFFFFF] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl md:text-8xl text-[#ffffff] relative z-10 mb-[-1.5rem] md:mb-[-2.5rem] 
                    mix-blend-difference mt-16"
          style={{ 
            fontFamily: 'Hornset, sans-serif',
            lineHeight: '0.8',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          ARCHIVE COLLECTIONS
        </h2>

        <div className="space-y-20 mt-20">
          {collectionsByYear.map((yearData) => (
            <div key={yearData.year} className="space-y-8">
              <h3 
                className="text-3xl md:text-5xl text-[#2E2B26]"
                style={{ fontFamily: 'Hornset, sans-serif' }}
              >
                {yearData.year}
              </h3>

              <div className="relative">
                {yearData.collections.length > 3 && (
                  <>
                    <button 
                      onClick={() => prevSlide(yearData.year)}
                      className="absolute left-0 top-1/2 z-20 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm p-3 transition-all shadow-lg"
                      aria-label={`Previous ${yearData.year} collection`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#2E2B26">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button 
                      onClick={() => nextSlide(yearData.year)}
                      className="absolute right-0 top-1/2 z-20 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm p-3 transition-all shadow-lg"
                      aria-label={`Next ${yearData.year} collection`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#2E2B26">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {getVisibleSlides(yearData.year).map((collection, index) => (
                    <div 
                      key={`${yearData.year}-${index}`}
                      className="relative h-[500px] w-full overflow-hidden"
                    >
                      <Image
                        src={collection.image}
                        alt={collection.title}
                        fill
                        className="object-cover brightness-90"
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <div className="text-left">
                          <h4 
                            className="text-xl md:text-2xl text-white mb-1"
                            style={{ fontFamily: 'Hornset, sans-serif' }}
                          >
                            {collection.title}
                          </h4>
                          <p className="text-white/90 text-sm md:text-base">{collection.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {yearData.collections.length > 3 && (
                  <div className="flex justify-center mt-6 space-x-2">
                    {yearData.collections.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndices(prev => ({
                          ...prev,
                          [yearData.year]: index
                        }))}
                        className={`w-3 h-3 ${activeIndices[yearData.year] === index ? 'bg-[#2E2B26]' : 'bg-[#2E2B26]/30'}`}
                        aria-label={`View ${yearData.year} collection ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link 
            href="/shop" 
            className="inline-flex items-center hover:underline text-[#2E2B26] text-xl md:text-2xl px-8 py-4 border-2 border-[#2E2B26] rounded-full transition-all hover:bg-[#2E2B26] hover:text-[#FFFBF4]"
            style={{ fontFamily: 'Hornset, sans-serif' }}
          >
            SHOP CURRENT COLLECTION
            <ArrowRight size={24} className="ml-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CollectionsPage