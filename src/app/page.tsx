'use client';

import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import About from '@/components/home/About';
import Gallery from '@/components/home/Gallery';
import Testimonials from '@/components/home/Testimonials';
import Contact from '@/components/home/Contact';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Services Highlight */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-playfair font-bold gold-text mb-12"
          >
            Our Premium Services
          </motion.h2>
          <Services />
          <div className="mt-12">
            <Link href="/services" className="px-8 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-black transition-all font-bold uppercase tracking-widest text-sm">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Split Highlight */}
      <About />

      {/* Gallery Preview */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-playfair font-bold gold-text mb-12"
          >
            Masterpiece Gallery
          </motion.h2>
          <Gallery />
          <div className="mt-12">
            <Link href="/gallery" className="px-8 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-black transition-all font-bold uppercase tracking-widest text-sm">
              Explore All Looks
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Contact Highlight */}
      <Contact />

      <Footer />
    </main>
  );
}
