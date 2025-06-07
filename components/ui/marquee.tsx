'use client'

import React from 'react'

export const Marquee = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        {children}
        {children} {/* Duplicated for seamless looping */}
      </div>
    </div>
  )
}