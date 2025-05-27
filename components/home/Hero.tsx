import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Hero = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden mt-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/9558577/pexels-photo-9558577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)', 
          backgroundPosition: '50% 30%'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="slide-up">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white mb-6 leading-tight">
            The Summer <span className="font-medium">Collection</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Embrace the warmth with our curated selection of lightweight fabrics and 
            elegant silhouettes designed for the season.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 min-w-[160px]">
              <Link href="/shop">
                Shop Women
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 min-w-[160px]">
              <Link href="/shop">
                Shop Men
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero