"use client"

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Category, FilterOptions, Gender } from '@/lib/types'
import { Dispatch, SetStateAction } from 'react'

interface FiltersProps {
  filters: FilterOptions
  setFilters: Dispatch<SetStateAction<FilterOptions>>
  availableCategories: Category[]
  availableGenders: Gender[]
  priceRange: [number, number]
  categoryCounts?: Record<Category, number>
}

const formatPrice = (price: number) => {
  return `$${price.toFixed(0)}`
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const Filters = ({ 
  filters, 
  setFilters, 
  availableCategories, 
  availableGenders,
  priceRange: [minPrice, maxPrice],
  categoryCounts
}: FiltersProps) => {
  const toggleCategory = (category: Category) => {
    setFilters(prev => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter(c => c !== category)
        }
      } else {
        return {
          ...prev,
          categories: [...prev.categories, category]
        }
      }
    })
  }

  const toggleGender = (gender: Gender) => {
    setFilters(prev => {
      if (prev.genders.includes(gender)) {
        return {
          ...prev,
          genders: prev.genders.filter(g => g !== gender)
        }
      } else {
        return {
          ...prev,
          genders: [...prev.genders, gender]
        }
      }
    })
  }

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [value[0], value[1]] as [number, number]
    }))
  }

  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: [minPrice, maxPrice],
      genders: []
    })
  }

  return (
    <div className="space-y-8 p-6 bg-white rounded-xl shadow-lg border border-[#EEDEC5] transition-all hover:shadow-xl">
      {/* Header */}
      <div className="border-b border-[#EEDEC5] pb-4">
        <h2 className="text-2xl font-bold text-black">Filters</h2>
        <p className="text-neutral-600">Refine your product selection</p>
      </div>

      {/* Categories */}
      <div className="bg-[#FFFBF4] p-4 rounded-lg border border-[#EEDEC5] transition-all hover:shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-black flex items-center">
          <svg className="w-5 h-5 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Categories
        </h3>
        <div className="space-y-3">
          {availableCategories.map((category) => (
            <div 
              key={category} 
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-[#EEDEC5] transition-colors cursor-pointer"
              onClick={() => toggleCategory(category)}
            >
              <Checkbox 
                id={`category-${category}`} 
                checked={filters.categories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
                className="border-[#EEDEC5] data-[state=checked]:bg-black data-[state=checked]:border-black h-5 w-5"
              />
              <Label 
                htmlFor={`category-${category}`}
                className="text-sm font-medium cursor-pointer text-black flex-1"
              >
                {capitalizeFirstLetter(category)}
              </Label>
              {categoryCounts && categoryCounts[category] && (
                <span className="text-xs bg-[#EEDEC5] text-black px-2 py-1 rounded-full">
                  {categoryCounts[category]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-[#FFFBF4] p-4 rounded-lg border border-[#EEDEC5] transition-all hover:shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-black flex items-center">
          <svg className="w-5 h-5 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Price Range
        </h3>
        <div className="px-2">
          <Slider 
            defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
            min={minPrice}
            max={maxPrice}
            step={50}
            value={[filters.priceRange[0], filters.priceRange[1]]}
            onValueChange={handlePriceChange}
            className="mb-6"
            thumbClassName="bg-[#D4C4A8] border-black focus-visible:ring-[#D4C4A8] h-4 w-4 shadow-md"
            trackClassName="bg-[#6B5B4D] h-2"
            rangeClassName="bg-[#D4C4A8] h-2"
          />
          <div className="flex justify-between text-sm font-medium text-black">
            <span className="bg-[#EEDEC5] px-3 py-1 rounded-full">{formatPrice(filters.priceRange[0])}</span>
            <span className="bg-[#EEDEC5] px-3 py-1 rounded-full">{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Gender */}
      <div className="bg-[#FFFBF4] p-4 rounded-lg border border-[#EEDEC5] transition-all hover:shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-black flex items-center">
          <svg className="w-5 h-5 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Gender
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {availableGenders.map((gender) => (
            <div 
              key={gender} 
              className={`flex items-center space-x-2 p-3 rounded-lg border transition-all cursor-pointer ${filters.genders.includes(gender) ? 'border-black bg-[#EEDEC5] shadow-inner' : 'border-[#EEDEC5] hover:shadow-md'}`}
              onClick={() => toggleGender(gender)}
            >
              <Checkbox 
                id={`gender-${gender}`} 
                checked={filters.genders.includes(gender)}
                onCheckedChange={() => toggleGender(gender)}
                className="border-[#EEDEC5] data-[state=checked]:bg-black data-[state=checked]:border-black h-5 w-5"
              />
              <Label 
                htmlFor={`gender-${gender}`}
                className="text-sm font-medium cursor-pointer text-black flex-1"
              >
                {capitalizeFirstLetter(gender)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <Button 
        onClick={resetFilters}
        className="w-full bg-[#EEDEC5] hover:bg-[#EEDEC5]/90 text-black font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reset All Filters
      </Button>
    </div>
  )
}

export default Filters