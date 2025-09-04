// lib/context/CartContext.tsx
"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  images: string[]
  description: string
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  recentOrder: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [recentOrder, setRecentOrder] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedRecentOrder = localStorage.getItem('recentOrder')
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
    
    if (savedRecentOrder) {
      setRecentOrder(JSON.parse(savedRecentOrder))
    }
    
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }, [cartItems, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('recentOrder', JSON.stringify(recentOrder))
    }
  }, [recentOrder, isLoaded])

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id)
      
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      }
      
      return [...prev, { ...item, quantity }]
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }
    
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    // Save the current cart as recent order before clearing
    setRecentOrder([...cartItems])
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        recentOrder,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}