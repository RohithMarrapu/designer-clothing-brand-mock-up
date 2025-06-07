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

    if (categoryParam) {
      newFilters.categories = [categoryParam as Category]
    }

    if (genderParam) {
      newFilters.genders = [genderParam as Gender]
    }

    setFilters(newFilters)
  }, [searchParams])

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
    <div className="pt-24 pb-16 relative z-10">
      {/* Header */}
      <div className="py-8 mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-playfair text-center">Collection</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filter & Sort Toggle */}
          <div className="md:hidden flex justify-between items-center mb-4 gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filters
            </Button>

            <div className="relative z-30">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2"
              >
                <ArrowDownUp size={16} />
                Sort
                <ChevronDown size={14} />
              </Button>

              {showSortMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded shadow z-50">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortType(option.value)
                        setShowSortMenu(false)
                      }}
                      className={cn(
                        'w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700',
                        sortType === option.value && 'font-medium text-primary'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
              availableCategories={getCategories()}
              availableGenders={getGenders()}
              priceRange={getPriceRange()}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Desktop Sort */}
            <div className="hidden md:flex justify-between items-center mb-6 relative z-30">
              <div className="text-sm text-neutral-500 dark:text-neutral-400">
                {filteredProducts.length} Products
              </div>

              <div className="relative z-30">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center gap-2"
                >
                  <ArrowDownUp size={16} />
                  Sort
                  <ChevronDown size={14} />
                </Button>

                {showSortMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded shadow z-50">
                    {sortOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortType(option.value)
                          setShowSortMenu(false)
                        }}
                        className={cn(
                          'w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700',
                          sortType === option.value && 'font-medium text-primary'
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
