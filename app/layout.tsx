import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { WishlistProvider } from '@/lib/context/WishlistContext';
import { CartProvider } from '@/lib/context/CartContext';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

// Load NanumGothicCoding from local files
const nanumGothicCoding = localFont({
  src: [
    {
      path: '../public/fonts/NanumGothicCoding.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/NanumGothicCoding-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-nanum',
});

// Keep your existing fonts for specific use cases
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AYSEGUL IKNA | Luxury Designer Clothing',
  description: 'Discover the finest in designer fashion at ASEYAGUL IKNA',
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    "google-site-verification": "WEqNp0YIYdxM7fX88RsncOaOfgajeunTvoF_25jBtP4"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={nanumGothicCoding.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${playfair.variable} ${inter.variable} font-mono`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <WishlistProvider>
            <CartProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </CartProvider>
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}