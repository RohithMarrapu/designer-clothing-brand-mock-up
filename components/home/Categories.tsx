import Link from 'next/link'

const categories = [
  {
    name: 'Dresses',
    image: 'https://images.pexels.com/photos/4630781/pexels-photo-4630781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '/shop?category=dresses'
  },
  {
    name: 'Outerwear',
    image: 'https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '/shop?category=outerwear'
  },
  {
    name: 'Accessories',
    image: 'https://images.pexels.com/photos/6624862/pexels-photo-6624862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '/shop?category=accessories'
  }
]

const Categories = () => {
  return (
    <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair mb-4">Shop By Category</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Explore our curated selection of luxury essentials across our signature categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link href={category.link} key={category.name} className="group relative">
              <div className="overflow-hidden aspect-[3/4]">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-medium text-white mb-2">{category.name}</h3>
                    <span className="inline-block text-white/80 text-sm group-hover:translate-x-2 transition-transform duration-300">
                      Discover More
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories