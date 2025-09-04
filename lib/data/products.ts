import { Product } from '@/lib/types'

export const products: Product[] = [
  {
    id: "prod-001",
    name: "Recycled Quilted Circle Skirt",
    description: "A stylish, eco-friendly skirt crafted from recycled materials with a quilted circle design.",
    price: 249.00,
    images: [
      "/products/1/1.png",
      "/products/1/2.png",
    ],
    // Skirt -> bottoms
    categories: ["bottoms"],
    gender: "women",
    featured: true,
    externalLink: "https://www.aysegulikna.site/product/recycled-quilted-circle-skirt/OYQVDWMYADEPXDQV6WLMCPAF?cs=true&cst=custom"
  },
  {
    id: "prod-002",
    name: "Custom Designed Recycled Men's Shirting",
    description: "Unique men's shirt made from upcycled fabrics, featuring custom quilted accents for modern flair.",
    price: 169.00,
    images: [
      "/products/2/3.png",
      "/products/2/4.png",
    ],
    // Shirting -> tops
    categories: ["tops"],
    gender: "unisex",
    featured: true,
    externalLink: "https://www.aysegulikna.site/product/custom-designed-recycled-men-s-shirting/ZFQWYDYNWTYJFCQ2V74DWKLN?cs=true&cst=custom"
  },
  {
    id: "prod-003",
    name: "Recycled Quilted Circle Pants",
    description: "Comfortable circle pants with intricate quilting, made entirely from sustainable recycled textiles.",
    price: 229.00,
    images: [
      "/products/3/5.png",
      "/products/3/6.png"
    ],
    // Pants -> bottoms
    categories: ["bottoms"],
    gender: "unisex",
    externalLink: "https://www.aysegulikna.site/product/recycled-quilted-circle-pants/CKUTZXUDOZSTSDX4ZTZCWTI4?cs=true&cst=custom"
  },
  {
    id: "prod-004",
    name: "Recycled Quilted Top",
    description: "Chic quilted top designed with recycled fabric, combining comfort and sustainable fashion.",
    price: 189.00,
    images: [
      "/products/4/7.png",
      "/products/4/8.png",
    ],
    // Top -> tops
    categories: ["tops"],
    gender: "women",
    new: true,
    externalLink: "https://www.aysegulikna.site/product/recycled-quilted-top/ODRBKXTPI6WDAEUGUCKM76CK?cs=true&cst=custom"
  },
  {
    id: "prod-005",
    name: "Custom Designed Recycled Men's Shirting",
    description: "Tailored men's shirt made from repurposed fabrics, highlighted by exclusive quilted patterns.",
    price: 169.00,
    images: [
      "/products/5/Ikna Catalog.png",
    ],
    // Shirting -> tops
    categories: ["tops"],
    gender: "men",
    externalLink: "https://www.aysegulikna.site/product/custom-designed-recycled-men-s-shirting/T4ZUYAXEDUP5TCME5RW4FDMB?cs=true&cst=custom"
  },
  {
    id: "prod-006",
    name: "Custom designed Heart Shirting",
    description: "Limited-edition shirt featuring heart-shaped patchwork, crafted from recycled and upcycled fabric.",
    price: 169.00,
    images: [
      "/products/6/10.png",
      "/products/6/11.png",
    ],
    // Shirting/outerwear -> tops
    categories: ["tops"],
    gender: "women",
    new: true,
    featured: true,
    externalLink: "https://www.aysegulikna.site/product/custom-designed-heart-shirting/ZLGOVLKQC5NAFY6HYB4YQAJI?cs=true&cst=custom"
  },
  {
    id: "prod-007",
    name: "Recycled quilted top",
    description: "Fashion-forward top made from quilted segments of recycled textiles, perfect for eco-conscious style.",
    price: 199.0,
    images: [
      "/products/7/12.png",
      "/products/7/13.png",
    ],
    // Top -> tops
    categories: ["tops"],
    gender: "men",
    externalLink: "https://www.aysegulikna.site/product/recycled-quilted-top/QSJRH6CBMNYNPPRKELAGZTNC?cs=true&cst=custom"
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