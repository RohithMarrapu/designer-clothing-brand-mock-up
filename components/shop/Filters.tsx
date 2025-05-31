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
  priceRange: [minPrice, maxPrice]
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
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {availableCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`} 
                checked={filters.categories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label 
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer"
              >
                {capitalizeFirstLetter(category)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <div className="px-2">
          <Slider 
            defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
            min={minPrice}
            max={maxPrice}
            step={50}
            value={[filters.priceRange[0], filters.priceRange[1]]}
            onValueChange={handlePriceChange}
            className="mb-6"
          />
          <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Gender */}
      <div>
        <h3 className="text-lg font-medium mb-4">Gender</h3>
        <div className="space-y-2">
          {availableGenders.map((gender) => (
            <div key={gender} className="flex items-center space-x-2">
              <Checkbox 
                id={`gender-${gender}`} 
                checked={filters.genders.includes(gender)}
                onCheckedChange={() => toggleGender(gender)}
              />
              <Label 
                htmlFor={`gender-${gender}`}
                className="text-sm cursor-pointer"
              >
                {capitalizeFirstLetter(gender)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <Button 
        variant="outline" 
        size="sm"
        onClick={resetFilters}
        className="w-full"
      >
        Reset Filters
      </Button>
    </div>
  )
}

export default Filters