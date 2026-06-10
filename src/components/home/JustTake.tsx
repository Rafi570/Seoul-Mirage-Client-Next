"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Container from '@/components/shared/Container'
import { Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion' // অ্যানিমেশনের জন্য ইম্পোর্ট করা হলো

// Assets
import person1 from '@/assets/img/p1.jpg'
import person2 from '@/assets/img/p2.jpg'

const testimonials = [
  {
    id: 1,
    name: "Devon Lane",
    image: person1,
    text: "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
    rating: 5
  },
  {
    id: 2,
    name: "Devon Lane",
    image: person2,
    text: "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
    rating: 5
  },
  {
    id: 3,
    name: "Arlene McCoy",
    image: person1,
    text: "Excellent product quality. The formulation is so clean and perfect for sensitive skin types. Highly recommended!",
    rating: 5
  },
  {
    id: 4,
    name: "Albert Flores",
    image: person2,
    text: "The delivery was super fast and the packaging feels extremely premium. Will definitely order again.",
    rating: 5
  },
  {
    id: 5,
    name: "Jane Cooper",
    image: person1,
    text: "This skincare routine completely changed my skin texture within weeks. Absolutely love the innovation.",
    rating: 5
  },
  {
    id: 6,
    name: "Kathryn Murphy",
    image: person2,
    text: "Amazing customer support and pure organic ingredients. My skin feels deeply hydrated and glowing.",
    rating: 5
  }
]

export default function JustTake() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTestimonials = testimonials.slice(indexOfFirstItem, indexOfLastItem);

  const totalDots = Math.ceil(testimonials.length / itemsPerPage);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <Container>
        {/* Header Section */}
        <div className="mb-16 space-y-4">
          <p className="text-center text-sm font-semibold text-[#d4a373] tracking-widest uppercase">
            3940+ Happy Users
          </p>
          <h2 className="section-title">Don't just take our words</h2>
        </div>

        {/* Testimonials Grid - AnimatePresence দিয়ে স্মুথ ট্রানজিশন হ্যান্ডেল করা হয়েছে */}
        <div className="min-h-[266px] md:min-h-[266px] lg:min-h-[266px]"> 
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            >
              {currentTestimonials.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row gap-6 items-center bg-slate-50 p-8 rounded-2xl">
                  {/* Image with exact Figma rounding */}
                  <div className="relative w-[180px] h-[200px] shrink-0 overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="180px"
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-4 text-center md:text-left">
                    <div className="flex justify-center md:justify-start gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#d4a373] text-[#d4a373]" />
                      ))}
                    </div>
                    <p className="testimonial-text text-slate-600">
                      {item.text}
                    </p>
                    <h4 className="font-bold text-lg text-slate-900">{item.name}</h4>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Functional Pagination Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {[...Array(totalDots)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 outline-none ${
                currentPage === index ? "bg-[#d4a373] scale-120" : "bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}