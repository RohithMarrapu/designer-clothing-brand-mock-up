"use client"

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Category, FilterOptions, Gender } from '@/lib/types'
import React, { Dispatch, SetStateAction, useMemo, useState, useEffect } from 'react'

interface FiltersProps {
  filters: FilterOptions
  setFilters: Dispatch<SetStateAction<FilterOptions>>
  availableCategories: Category[]
  availableGenders?: Gender[]
  priceRange: [number, number]
  categoryCounts?: Record<Category, number>
}

export default function Filters(props: FiltersProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) {
    return (
      <div className="space-y-8 p-6 bg-[#f9f9f9] rounded-xl shadow-lg border border-[#cccccc]">
        <div className="border-b border-[#cccccc] pb-4">
          <div className="h-7 w-24 bg-[#cccccc] rounded" />
          <div className="mt-2 h-4 w-40 bg-[#eaeaea] rounded" />
        </div>
        <div className="bg-[#eaeaea] p-4 rounded-lg border border-[#cccccc] h-40" />
        <div className="bg-[#eaeaea] p-4 rounded-lg border border-[#cccccc] h-48" />
        <div className="h-10 w-full bg-[#cccccc] rounded-lg" />
      </div>
    )
  }
  return <FiltersInner {...props} />
}

const DISPLAY_CATEGORIES = ['tops', 'bottoms'] as unknown as Category[]

function FiltersInner({
  filters,
  setFilters,
  priceRange: [minPrice, maxPrice],
  categoryCounts,
}: FiltersProps) {
  const formatPrice = (price: number) => `$${price.toFixed(0)}`
  const capitalizeFirstLetter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)
  const roundTo = (v: number, step = 10) => Math.round(v / step) * step

  const toggleCategory = (category: Category) => {
    setFilters(prev => {
      if (prev.categories.includes(category)) {
        return { ...prev, categories: prev.categories.filter(c => c !== category) }
      } else {
        return { ...prev, categories: [...prev.categories, category] }
      }
    })
  }

  const [localMin, setLocalMin] = useState(filters.priceRange[0])
  const [localMax, setLocalMax] = useState(filters.priceRange[1])

  useEffect(() => {
    setLocalMin(filters.priceRange[0])
    setLocalMax(filters.priceRange[1])
  }, [filters.priceRange])

  const handlePriceChange = (value: number[]) => {
    const [lo, hi] = value
    setLocalMin(lo)
    setLocalMax(hi)
    setFilters(prev => ({ ...prev, priceRange: [lo, hi] as [number, number] }))
  }

  const applyMinInput = (val: string) => {
    const nRaw = Number(val)
    const n = clamp(isNaN(nRaw) ? minPrice : nRaw, minPrice, localMax)
    const r = roundTo(n, 10)
    setLocalMin(r)
    setFilters(prev => ({ ...prev, priceRange: [r, prev.priceRange[1]] as [number, number] }))
  }

  const applyMaxInput = (val: string) => {
    const nRaw = Number(val)
    const n = clamp(isNaN(nRaw) ? maxPrice : nRaw, localMin, maxPrice)
    const r = roundTo(n, 10)
    setLocalMax(r)
    setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], r] as [number, number] }))
  }

  const presets = useMemo(() => {
    const span = maxPrice - minPrice
    if (span <= 0) return []
    const q1 = roundTo(minPrice + span * 0.25, 10)
    const q2 = roundTo(minPrice + span * 0.50, 10)
    const q3 = roundTo(minPrice + span * 0.75, 10)
    return [
      { label: `Under ${formatPrice(q1)}`, range: [minPrice, q1] as [number, number] },
      { label: `${formatPrice(q1)} – ${formatPrice(q2)}`, range: [q1, q2] as [number, number] },
      { label: `${formatPrice(q2)} – ${formatPrice(q3)}`, range: [q2, q3] as [number, number] },
      { label: `${formatPrice(q3)}+`, range: [q3, maxPrice] as [number, number] },
    ]
  }, [minPrice, maxPrice])

  const selectPreset = (range: [number, number]) => {
    setLocalMin(range[0])
    setLocalMax(range[1])
    setFilters(prev => ({ ...prev, priceRange: range }))
  }

  const resetFilters = () => {
    setLocalMin(minPrice)
    setLocalMax(maxPrice)
    setFilters({
      categories: [],
      priceRange: [minPrice, maxPrice],
      genders: []
    })
  }

  const sliderThemeVars: React.CSSProperties = {
    // @ts-ignore
    '--primary': '0 0% 20%', // #333333
    // @ts-ignore
    '--secondary': '0 0% 80%', // light gray
  }

  return (
    <div className="space-y-8 p-6 bg-[#f9f9f9] rounded-xl shadow-lg border border-[#cccccc] transition-all hover:shadow-xl">
      {/* Header */}
      <div className="border-b border-[#cccccc] pb-4">
        <h2 className="text-4xl text-[#333333]" style={{ fontFamily: 'Hornset, sans-serif' }}>Filters</h2>
        <p className="text-neutral-600" style={{ fontFamily: 'HellasFun, sans-serif' }}>
          Refine your product selection
        </p>
      </div>

      {/* Categories */}
      <div className="bg-white p-4 rounded-lg border border-[#cccccc] transition-all hover:shadow-sm">
        <h3 className="text-2xl mb-4 text-[#333333] flex items-center" style={{ fontFamily: 'Hornset, sans-serif' }}>
          <svg className="w-5 h-5 mr-2 text-[#333333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Categories
        </h3>
        <div className="space-y-3">
          {DISPLAY_CATEGORIES.map((category) => (
            <div
              key={category}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-[#f0f0f0] transition-colors cursor-pointer"
              onClick={() => toggleCategory(category)}
            >
              {/* Custom Checkbox without check icon */}
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
                className="border-[#cccccc] h-5 w-5 
                           data-[state=checked]:bg-[#333333] 
                           data-[state=checked]:border-[#333333] 
                           data-[state=checked]:text-white"
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm font-medium cursor-pointer text-[#333333] flex-1"
              >
                {capitalizeFirstLetter(category)}
              </Label>
              {categoryCounts && categoryCounts[category] != null && (
                <span className="text-xs bg-[#cccccc] text-[#333333] px-2 py-1 rounded-full">
                  {categoryCounts[category]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="bg-white p-4 rounded-lg border border-[#cccccc] transition-all hover:shadow-sm">
        <h3 className="text-2xl mb-4 text-[#333333] flex items-center" style={{ fontFamily: 'Hornset, sans-serif' }}>
          <svg className="w-5 h-5 mr-2 text-[#333333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Price
        </h3>

        {presets.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {presets.map((p, i) => {
              const active = localMin === p.range[0] && localMax === p.range[1]
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectPreset(p.range)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition
                    ${active ? 'bg-[#333333] text-white border-[#333333]' : 'bg-white text-[#333333] border-[#cccccc] hover:bg-[#f0f0f0]'}
                  `}
                >
                  {p.label}
                </button>
              )
            })}
          </div>
        )}

        <div className="px-2" style={sliderThemeVars}>
          <Slider
            defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
            min={minPrice}
            max={maxPrice}
            step={10}
            value={[localMin, localMax]}
            onValueChange={handlePriceChange}
            className="mb-4"
          />

          <div className="grid grid-cols-2 gap-3 items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-600">Min</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={String(localMin)}
                onChange={(e) => setLocalMin(clamp(Number(e.target.value || minPrice), minPrice, localMax))}
                onBlur={(e) => applyMinInput(e.target.value)}
                className="w-full rounded-md border border-[#cccccc] bg-white px-3 py-2 text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#333333]/20"
              />
            </div>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-xs text-neutral-600">Max</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={String(localMax)}
                onChange={(e) => setLocalMax(clamp(Number(e.target.value || maxPrice), localMin, maxPrice))}
                onBlur={(e) => applyMaxInput(e.target.value)}
                className="w-full rounded-md border border-[#cccccc] bg-white px-3 py-2 text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#333333]/20"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-between text-sm font-medium text-[#333333]">
            <span className="bg-[#eaeaea] px-3 py-1 rounded-full">{formatPrice(localMin)}</span>
            <span className="bg-[#eaeaea] px-3 py-1 rounded-full">{formatPrice(localMax)}</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <Button
        onClick={resetFilters}
        className="w-full bg-[#333333] hover:bg-[#4d4d4d] text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reset All Filters
      </Button>
    </div>
  )
}
