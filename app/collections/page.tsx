"use client"

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const CollectionsPage = () => {
  const collectionsByYear = [
    {
      year: 'FALL 2024',
      collections: [
        { title: 'Look 2', image: '/2024 Fall/1.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/2.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/3.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/4.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/5.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/6.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/7.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/8.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/9.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/10.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/11.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/12.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/13.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/14.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/15.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/16.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/17.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/18.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/19.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/20.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/21.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2024 Fall/22.webp', description: 'Floral inspirations and light fabrics' },
      ]
    },
    {
      year: 'FALL 2023',
      collections: [
        { title: 'Look 2', image: '/2023 Fall/1.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 3', image: '/2023 Fall/2.webp', description: 'Elegant daytime wear' },
        { title: 'Look 4', image: '/2023 Fall/3.webp', description: 'Modern sophistication' },
        { title: 'Look 5', image: '/2023 Fall/4.webp', description: 'Structured tailoring' },
        { title: 'Look 1', image: '/2023 Fall/5.webp', description: 'Bold statement pieces' },
        { title: 'DSC06997', image: '/2023 Fall/6.webp', description: 'Urban elegance' },
        { title: 'DSC07170', image: '/2023 Fall/7.webp', description: 'Romantic aesthetics' },
        { title: 'DSC07230', image: '/2023 Fall/8.webp', description: 'Minimalist luxury' },
        { title: 'DSC07287', image: '/2023 Fall/9.webp', description: 'Sustainable fashion' },
        { title: 'DSC07318', image: '/2023 Fall/10.webp', description: 'Avant-garde creations' },
        { title: 'DSC07349', image: '/2023 Fall/11.webp', description: 'Timeless silhouettes' },
        { title: 'DSC07363', image: '/2023 Fall/12.webp', description: 'Haute couture inspiration' },
      ]
    },
    {
      year: 'SUMMER 2023',
      collections: [
        { title: 'Spring/Summer 2022', image: '/2023 Summer/1.webp', description: 'Minimalist elegance' },
        { title: 'Spring/Summer 2022', image: '/2023 Summer/2.webp', description: 'Minimalist elegance' },
        { title: 'Spring/Summer 2022', image: '/2023 Summer/3.webp', description: 'Minimalist elegance' },
        { title: 'Spring/Summer 2022', image: '/2023 Summer/4.webp', description: 'Minimalist elegance' },
        { title: 'Spring/Summer 2022', image: '/2023 Summer/5.webp', description: 'Minimalist elegance' },
        { title: 'Spring/Summer 2022', image: '/2023 Summer/6.webp', description: 'Minimalist elegance' },
        { title: 'Spring/Summer 2022', image: '/2023 Summer/7.webp', description: 'Minimalist elegance' },
        { title: 'Spring/Summer 2022', image: '/2023 Summer/8.webp', description: 'Minimalist elegance' },
        { title: 'Spring/Summer 2022', image: '/2023 Summer/9.webp', description: 'Minimalist elegance' },
        { title: 'Spring/Summer 2022', image: '/2023 Summer/10.webp', description: 'Minimalist elegance' },
        { title: 'Spring/Summer 2022', image: '/2023 Summer/11.webp', description: 'Minimalist elegance' },
        { title: 'Spring/Summer 2022', image: '/2023 Summer/12.webp', description: 'Minimalist elegance' },
        { title: 'Spring/Summer 2022', image: '/2023 Summer/13.webp', description: 'Minimalist elegance' },
        { title: 'Spring/Summer 2022', image: '/2023 Summer/14.webp', description: 'Minimalist elegance' },
      ]
    },
    {
      year: 'FALL 2022',
      collections: [
        { title: 'Look 2', image: '/2022 Fall/1.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2022 Fall/2.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2022 Fall/3.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2022 Fall/4.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2022 Fall/5.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2022 Fall/6.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2022 Fall/7.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2022 Fall/8.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2022 Fall/9.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2022 Fall/10.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2022 Fall/11.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2022 Fall/12.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 2', image: '/2022 Fall/13.webp', description: 'Floral inspirations and light fabrics' },
      ]
    },
    {
      year: 'FALL 2021',
      collections: [
        { title: 'Debut Collection', image: '/2021 Fall/1.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/2.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/3.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/4.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/5.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/6.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/7.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/8.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/9.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/10.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/11.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/12.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/13.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/14.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/15.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/16.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/17.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/18.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/19.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/20.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/21.webp', description: 'Classic with a contemporary twist' },
        { title: 'Debut Collection', image: '/2021 Fall/22.webp', description: 'Classic with a contemporary twist' },
      ]
    },
    {
      year: 'WINTER 2020',
      collections: [
        { title: 'Look 2', image: '/2020 Winter/1.webp', description: 'Floral inspirations and light fabrics' },
        { title: 'Look 3', image: '/2020 Winter/2.webp', description: 'Elegant daytime wear' },
        { title: 'Look 4', image: '/2020 Winter/3.webp', description: 'Modern sophistication' },
        { title: 'Look 5', image: '/2020 Winter/4.webp', description: 'Structured tailoring' },
        { title: 'Look 1', image: '/2020 Winter/5.webp', description: 'Bold statement pieces' },
        { title: 'DSC06997', image: '/2020 Winter/6.webp', description: 'Urban elegance' },
        { title: 'DSC07170', image: '/2020 Winter/7.webp', description: 'Romantic aesthetics' },
        { title: 'DSC07230', image: '/2020 Winter/8.webp', description: 'Minimalist luxury' },
        { title: 'DSC07287', image: '/2020 Winter/9.webp', description: 'Sustainable fashion' },
        { title: 'DSC07287', image: '/2020 Winter/10.webp', description: 'Sustainable fashion' },
      ]
    },
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
        {/* Keep page heading if desired; images have no per-image title/description */}
        <h2 
          className="text-4xl md:text-8xl text-[#ffffff] relative z-10 mb-[-1.5rem] md:mb-[-2.5rem] mix-blend-difference mt-16"
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
                      {/* Lazy-load images; priority on first image of each year for better LCP */}
                      <Image
                        src={collection.image}
                        alt={collection.title}
                        fill
                        className="object-cover"
                        loading={index === 0 ? undefined : "lazy"}
                        priority={index === 0}
                      />
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
