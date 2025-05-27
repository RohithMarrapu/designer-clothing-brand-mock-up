"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductGrid from '@/components/shop/ProductGrid'
import Filters from '@/components/shop/Filters'
import { products, getPriceRange, getCategories, getGenders } from '@/lib/data/products'
import { Product, FilterOptions, Category, Gender } from '@/lib/types'
import { Filter, ArrowDownUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Shop() {
  const searchParams = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: getPriceRange(),
    genders: [],
  })

  // Initialize filters from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const genderParam = searchParams.get('gender')

    const newFilters = { ...filters }

    if (categoryParam) {
      newFilters.categories = [categoryParam as Category]
    }

    if (genderParam) {
      newFilters.genders = [genderParam as Gender]
    }

    setFilters(newFilters)
  }, [searchParams])

  // Apply filters
  useEffect(() => {
    let filtered = [...products]

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        product.categories.some(category => 
          filters.categories.includes(category)
        )
      )
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    )

    // Filter by gender
    if (filters.genders.length > 0) {
      filtered = filtered.filter(product => 
        filters.genders.includes(product.gender)
      )
    }

    setFilteredProducts(filtered)
  }, [filters])

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <div className="bg-neutral-100 dark:bg-neutral-900 py-8 mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-playfair text-center">Collection</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filters
            </Button>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              {filteredProducts.length} Products
            </div>
          </div>

          {/* Filters Sidebar */}
          <div 
            className={cn(
              "md:w-64 lg:w-80 shrink-0",
              isFilterOpen ? "block" : "hidden md:block"
            )}
          >
            <Filters 
              filters={filters} 
              setFilters={setFilters} 
              availableCategories={getCategories() as Category[]}
              availableGenders={getGenders() as Gender[]}
              priceRange={getPriceRange()}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="hidden md:flex justify-between items-center mb-6">
              <div className="text-sm text-neutral-500 dark:text-neutral-400">
                {filteredProducts.length} Products
              </div>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowDownUp size={16} />
                Sort
              </Button>
            </div>
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  )
}