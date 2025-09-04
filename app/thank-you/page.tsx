"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ShoppingBag, Clock, MapPin } from "lucide-react"
import { useCart } from "@/lib/context/CartContext"
import { useEffect, useState } from "react"

export default function ThankYouPage() {
  const { recentOrder } = useCart()
  const [orderDetails, setOrderDetails] = useState<any>(null)
  
  useEffect(() => {
    // In a real app, you would fetch order details from an API
    // For this example, we'll use mock data
    setOrderDetails({
      orderNumber: `#${Math.floor(10000 + Math.random() * 90000)}`,
      estimatedDelivery: "3-5 business days",
      shippingAddress: "123 Main St, City, State 12345",
      items: recentOrder || [],
      total: recentOrder?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0
    })
  }, [recentOrder])

  if (!orderDetails) {
    return (
      <div className="bg-[#FFFFFF] min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <p style={{ fontFamily: 'HellasFun, sans-serif' }}>Loading order details...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <CheckCircle size={64} className="text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl mb-4 text-gray-900" style={{ fontFamily: 'NATS, sans-serif' }}>
            Thank You For Your Order!
          </h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto text-lg" style={{ fontFamily: 'HellasFun, sans-serif' }}>
            Your order has been confirmed and will be shipped soon. You'll receive a confirmation email shortly.
          </p>
          
          <div className="max-w-md mx-auto rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm p-6 mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4" style={{ fontFamily: 'NATS, sans-serif' }}>
              Order Details
            </h2>
            
            <div className="space-y-3 text-left mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center" style={{ fontFamily: 'HellasFun, sans-serif' }}>
                  <Clock size={16} className="mr-2" />
                  Order Number
                </span>
                <span className="text-gray-900" style={{ fontFamily: 'NATS, sans-serif' }}>{orderDetails.orderNumber}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center" style={{ fontFamily: 'HellasFun, sans-serif' }}>
                  <Clock size={16} className="mr-2" />
                  Estimated Delivery
                </span>
                <span className="text-gray-900" style={{ fontFamily: 'NATS, sans-serif' }}>{orderDetails.estimatedDelivery}</span>
              </div>
              
              <div className="flex justify-between items-start">
                <span className="text-gray-600 flex items-start" style={{ fontFamily: 'HellasFun, sans-serif' }}>
                  <MapPin size={16} className="mr-2 mt-0.5" />
                  Shipping Address
                </span>
                <span className="text-gray-900 text-right max-w-xs" style={{ fontFamily: 'NATS, sans-serif' }}>
                  {orderDetails.shippingAddress}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between text-lg font-medium">
                  <span className="text-gray-900" style={{ fontFamily: 'NATS, sans-serif' }}>Total</span>
                  <span className="text-gray-900" style={{ fontFamily: 'NATS, sans-serif' }}>${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="px-8 bg-gray-900 hover:bg-gray-800 text-white text-base" style={{ fontFamily: 'LostInSouth, sans-serif', borderRadius: '2px' }}>
              <Link href="/orders">View Order Status</Link>
            </Button>
            <Button asChild variant="outline" className="px-8 border-gray-900 text-white hover:bg-gray-800 text-base" style={{ fontFamily: 'LostInSouth, sans-serif', borderRadius: '2px' }}>
              <Link href="/shop">
                <ShoppingBag size={18} className="mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}