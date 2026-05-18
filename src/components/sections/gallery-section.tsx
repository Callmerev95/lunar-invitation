"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "couple" | "prewedding";
}

interface GallerySectionProps {
  images: GalleryImage[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ images }) => {
  const [activeCategory, setActiveCategory] = React.useState<"all" | "couple" | "prewedding">("all");

  const filteredImages = activeCategory === "all"
    ? images
    : images.filter((img) => img.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const categories = [
    { id: "all", label: "Semua" },
    { id: "couple", label: "Couple" },
    { id: "prewedding", label: "Prewedding" },
  ];

  return (
    <section id="galeri" className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#D4AF88] rounded-full opacity-5 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-[#8B4F6F] rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-section-title mb-4">Galeri Momen</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-0.5 bg-[#D4AF88]" />
            <p className="text-[#6B5E5E] font-inter text-base md:text-lg">
              Koleksi kenangan indah kami
            </p>
            <div className="w-12 h-0.5 bg-[#D4AF88]" />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center gap-4 mb-12 md:mb-16 flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as "all" | "couple" | "prewedding")}
              className={`px-6 py-2 rounded-full transition-all duration-500 font-inter font-500 ${activeCategory === cat.id
                  ? "bg-[#D4AF88] text-white shadow-elegant"
                  : "bg-white border border-[#D4AF88] text-[#D4AF88] hover:bg-[#F5F0E8]"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-700 aspect-square bg-[#F5F0E8]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="text-white">
                    <p className="text-sm font-inter uppercase tracking-widest opacity-80 mb-1">
                      {image.category === "couple" ? "Couple" : "Prewedding"}
                    </p>
                    <p className="font-playfair text-lg font-600">{image.alt}</p>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-16 border-b-16 border-l-transparent border-b-[#D4AF88] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#6B5E5E] font-inter text-lg">
              Belum ada foto untuk kategori ini
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
