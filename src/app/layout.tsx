import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import CustomCursor from '@/components/layout/CustomCursor';
import PageTransition from '@/components/layout/PageTransition';
import ScrollProgress from '@/components/ui/ScrollProgress';
import WhatsAppFAB from '@/components/ui/WhatsAppFAB';
import BookingFAB from '@/components/ui/BookingFAB';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const viewport: Viewport = {
  themeColor: '#D4AF37',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Rich Look Beauty Studio | Premium Salon & Makeup Services',
  description: 'Rich Look Beauty Studio - Where Elegance Meets Perfection. Book your bridal makeup, hair styling, nail art, and facial treatments. Premium beauty services in Surat.',
  keywords: 'beauty studio, bridal makeup, hair styling, nail art, facial, salon, surat, rich look',
  authors: [{ name: 'Rich Look Beauty Studio' }],
  creator: 'Rich Look Beauty Studio',
  metadataBase: new URL('https://richlook18.in'),
  openGraph: {
    title: 'Rich Look Beauty Studio | Premium Salon',
    description: 'Where Elegance Meets Perfection. Book your appointment today.',
    url: 'https://richlook18.in',
    siteName: 'Rich Look Beauty Studio',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rich Look Beauty Studio',
    description: 'Premium Beauty & Makeup Studio - Book Your Session Today',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={cn(inter.variable, playfair.variable, 'antialiased bg-background text-foreground overflow-x-hidden custom-scrollbar')}>
        <CustomCursor />
        <ScrollProgress />
        <WhatsAppFAB />
        <BookingFAB />
        <div className="fixed inset-0 bg-[#0f0f0f] -z-50 pointer-events-none" />
        <div className="relative z-10">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </body>
    </html>
  );
}
