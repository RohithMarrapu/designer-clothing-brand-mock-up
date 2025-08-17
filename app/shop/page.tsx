"use client"

import Filters from '@/components/shop/Filters'
import ProductGrid from '@/components/shop/ProductGrid'
import { Button } from '@/components/ui/button'
import { getCategories, getGenders, getPriceRange, products } from '@/lib/data/products'
import { Category, FilterOptions, Gender, Product } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ArrowDownUp, ChevronDown, Filter } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const sortOptions = [
  { label: "Recommended", value: "default" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
] as const

type SortType = typeof sortOptions[number]["value"]

export default function Shop() {
  const searchParams = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: getPriceRange(),
    genders: [],
  })
  const [sortType, setSortType] = useState<SortType>("default")
  const [showSortMenu, setShowSortMenu] = useState(false)

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const genderParam = searchParams.get('gender')

    const newFilters = { ...filters }

    if (categoryParam && isCategory(categoryParam)) {
      newFilters.categories = [categoryParam as Category]
    }

    if (genderParam && isGender(genderParam)) {
      newFilters.genders = [genderParam as Gender]
    }

    setFilters(newFilters)
  }, [searchParams])

  // Helper type guards
  function isCategory(category: string): category is Category {
    return ['dresses', 'outerwear', 'tops', 'bottoms', 'accessories'].includes(category)
  }

  function isGender(gender: string): gender is Gender {
    return ['men', 'women', 'unisex'].includes(gender)
  }

  useEffect(() => {
    let filtered = [...products]

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        product.categories.some(category =>
          filters.categories.includes(category)
        )
      )
    }

    // Apply price filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1]
    )

    // Apply gender filter
    if (filters.genders.length > 0) {
      filtered = filtered.filter(product =>
        filters.genders.includes(product.gender)
      )
    }

    // Apply sort
    if (sortType === "asc") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortType === "desc") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortType === "default") {
      filtered = products.filter(p => filtered.some(f => f.id === p.id))
    }

    setFilteredProducts(filtered)
  }, [filters, sortType])

  return (
    <div className="pt-24 pb-16 relative z-10 bg-[#FFFFFF] min-h-screen">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filter & Sort Toggle */}
          <div className="md:hidden flex justify-between items-center mb-6 gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-[#252525] text-[#FFFBF4] border-[#EEDEC5]"
              style={{ fontFamily: 'Hornset, sans-serif' }}
            >
              <Filter size={16} />
              Filters
            </Button>

            <div className="relative z-30">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 bg-[#252525] text-[#FFFBF4] border-[#EEDEC5]"
                style={{ fontFamily: 'Hornset, sans-serif' }}
              >
                <ArrowDownUp size={16} />
                Sort
                <ChevronDown size={14} className={cn("transition-transform", showSortMenu ? "rotate-180" : "")} />
              </Button>

              {showSortMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-[#EEDEC5] rounded-lg shadow-lg z-50">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortType(option.value)
                        setShowSortMenu(false)
                      }}
                      className={cn(
                        'w-full text-left px-4 py-2 text-sm hover:bg-[#EEDEC5]/30 text-black transition-colors',
                        sortType === option.value && 'font-medium bg-[#EEDEC5]/50'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="text-sm text-black">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'}
            </div>
          </div>

          {/* Filters Sidebar */}
          <div
            className={cn(
              "md:w-64 lg:w-72 shrink-0 transition-all",
              isFilterOpen ? "block" : "hidden md:block"
            )}
          >
            <div className="sticky top-32">
              <Filters
                filters={filters}
                setFilters={setFilters}
                availableCategories={getCategories() as Category[]}
                availableGenders={getGenders() as Gender[]}
                priceRange={getPriceRange()}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Desktop Sort */}
            <div className="hidden md:flex justify-between items-center mb-8">
              <div className="text-sm text-black" style={{ fontFamily: 'Anton, sans-serif' }}>
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'}
              </div>

              <div className="relative z-30">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center gap-2 bg-[#252525] text-[#FFFBF4] border-[#EEDEC5]"
                  style={{ fontFamily: 'Hornset, sans-serif' }}
                >
                  <ArrowDownUp size={16} />
                  Sort
                  <ChevronDown size={14} className={cn("transition-transform", showSortMenu ? "rotate-180" : "")} />
                </Button>

                {showSortMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-[#EEDEC5] rounded-lg shadow-lg z-50">
                    {sortOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortType(option.value)
                          setShowSortMenu(false)
                        }}
                        className={cn(
                          'w-full text-left px-4 py-2 text-sm hover:bg-[#EEDEC5]/30 text-black transition-colors',
                          sortType === option.value && 'font-medium bg-[#EEDEC5]/50'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  )
}