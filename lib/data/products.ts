import { Product } from '@/lib/types'

export const products: Product[] = [
  {
    id: "prod-001",
    name: "Recycled Quilted Circle Skirt",
    description: "A stylish, eco-friendly skirt crafted from recycled materials with a quilted circle design.",
    price: 249.00,
    images: [
      "/products/1/1.webp",
      "/products/1/2.webp",
    ],
    // Skirt -> bottoms
    categories: ["bottoms"],
    gender: "women",
    featured: true
  },
  {
    id: "prod-002",
    name: "Custom Designed Recycled Men’s Shirting",
    description: "Unique men's shirt made from upcycled fabrics, featuring custom quilted accents for modern flair.",
    price: 169.00,
    images: [
      "/products/2/3.webp",
      "/products/2/4.webp",
    ],
    // Shirting -> tops
    categories: ["tops"],
    gender: "unisex",
    featured: true
  },
  {
    id: "prod-003",
    name: "Recycled Quilted Circle Pants",
    description: "Comfortable circle pants with intricate quilting, made entirely from sustainable recycled textiles.",
    price: 229.00,
    images: [
      "/products/3/5.webp",
      "/products/3/6.webp"
    ],
    // Pants -> bottoms
    categories: ["bottoms"],
    gender: "unisex"
  },
  {
    id: "prod-004",
    name: "Recycled Quilted Top",
    description: "Chic quilted top designed with recycled fabric, combining comfort and sustainable fashion.",
    price: 189.00,
    images: [
      "/products/4/7.webp",
      "/products/4/8.webp",
    ],
    // Top -> tops
    categories: ["tops"],
    gender: "women",
    new: true
  },
  {
    id: "prod-005",
    name: "Custom Designed Recycled Men’s Shirting",
    description: "Tailored men's shirt made from repurposed fabrics, highlighted by exclusive quilted patterns.",
    price: 169.00,
    images: [
      "/products/5/Ikna Catalog.webp",
    ],
    // Shirting -> tops
    categories: ["tops"],
    gender: "men"
  },
  {
    id: "prod-006",
    name: "Custom designed Heart Shirting",
    description: "Limited-edition shirt featuring heart-shaped patchwork, crafted from recycled and upcycled fabric.",
    price: 169.00,
    images: [
      "/products/6/10.webp",
      "/products/6/11.webp",
    ],
    // Shirting/outerwear -> tops
    categories: ["tops"],
    gender: "women",
    new: true,
    featured: true
  },
  {
    id: "prod-007",
    name: "Recycled quilted top",
    description: "Fashion-forward top made from quilted segments of recycled textiles, perfect for eco-conscious style.",
    price: 199.0,
    images: [
      "/products/7/12.webp",
      "/products/7/13.webp",
    ],
    // Top -> tops
    categories: ["tops"],
    gender: "men"
  }
]

export const getProductById = (id: string) => {
  return products.find(product => product.id === id)
}

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured)
}

export const getNewArrivals = () => {
  return products.filter(product => product.new)
}

export function getPriceRange(): [number, number] {
  const prices = products.map(product => product.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return [min, max]; // ✅ Tuple type
}

// Only return tops/bottoms (and only those that exist in the data)
export const getCategories = () => {
  const present = new Set<string>()
  products.forEach(p => p.categories.forEach(c => present.add(c)))
  const allowed = ['tops', 'bottoms']
  return allowed.filter(c => present.has(c))
}