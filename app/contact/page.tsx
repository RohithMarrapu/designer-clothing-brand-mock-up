"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
})

type FormValues = z.infer<typeof formSchema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true)

    setTimeout(() => {
      toast.success('Message sent successfully. We will get back to you soon.')
      reset()
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="pt-24 pb-16 bg-[#FFFBF4] text-black">
      {/* Header */}
      <div className="py-8 mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl text-center" style={{ fontFamily: 'Hornset, sans-serif' }}>
            Contact Us
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg text-neutral-600" style={{ fontFamily: 'HellasFun, sans-serif' }}>
              We'd love to hear from you. Please feel free to reach out with any questions about our products or services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="font-medium mb-4 flex items-center" style={{ fontFamily: 'Anton, sans-serif' }}>
                  <MapPin size={18} className="mr-2" />
                  Address
                </h3>
                <p className="text-neutral-600" style={{ fontFamily: 'HellasFun, sans-serif' }}>
                  Apple Park Way<br />
                  Cupertino, CA 95014<br />
                  United States
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2 flex items-center" style={{ fontFamily: 'Anton, sans-serif' }}>
                  <Phone size={18} className="mr-2" />
                  Phone
                </h3>
                <p className="text-neutral-600" style={{ fontFamily: 'HellasFun, sans-serif' }}>
                  +1 (408) 996–1010
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2 flex items-center" style={{ fontFamily: 'Anton, sans-serif' }}>
                  <Mail size={18} className="mr-2" />
                  Email
                </h3>
                <p className="text-neutral-600" style={{ fontFamily: 'HellasFun, sans-serif' }}>
                  contact@aysegulikna.com
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2" style={{ fontFamily: 'Anton, sans-serif' }}>Opening Hours</h3>
                <p className="text-neutral-600" style={{ fontFamily: 'HellasFun, sans-serif' }}>
                  Monday - Friday: 10am - 7pm<br />
                  Saturday: 11am - 6pm<br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ fontFamily: 'Anton, sans-serif' }}>
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    {...register('name')}
                    className={`bg-white border border-[#EEDEC5] text-black placeholder:font-hellasfun ${errors.name ? 'border-red-500' : ''}`}
                    style={{ fontFamily: 'HellasFun, sans-serif' }}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500" style={{ fontFamily: 'HellasFun, sans-serif' }}>{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ fontFamily: 'Anton, sans-serif' }}>
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    {...register('email')}
                    className={`bg-white border border-[#EEDEC5] text-black placeholder:font-hellasfun ${errors.email ? 'border-red-500' : ''}`}
                    style={{ fontFamily: 'HellasFun, sans-serif' }}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500" style={{ fontFamily: 'HellasFun, sans-serif' }}>{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ fontFamily: 'Anton, sans-serif' }}>
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    rows={6}
                    {...register('message')}
                    className={`bg-white border border-[#EEDEC5] text-black placeholder:font-hellasfun ${errors.message ? 'border-red-500' : ''}`}
                    style={{ fontFamily: 'HellasFun, sans-serif' }}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500" style={{ fontFamily: 'HellasFun, sans-serif' }}>{errors.message.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-[160px] bg-[#EEDEC5] hover:bg-[#EEDEC5]/90 text-black"
                  style={{ fontFamily: 'Anton, sans-serif' }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send size={16} className="mr-2" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="mt-16 rounded-md overflow-hidden">
            <iframe
              title="Apple HQ"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.368355746453!2d-122.01123422427786!3d37.33478973821909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5a6f29a395b%3A0x4966b2f4a34d7ae4!2sApple%20Park!5e0!3m2!1sen!2sus!4v1681723361666!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}