"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ElegantButton } from "../common/elegant-button";


interface HeroSectionProps {
  brideImage: string;
  groom: string;
  bride: string;
  date: string;
  location?: string;
  coupleNames?: string;
  invitationUrl?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  brideImage,
  groom,
  bride,
  date,
  location = "Lokasi Acara",
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32 lg:pt-40"
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-gold-cream opacity-30 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            className="relative w-full h-screen md:h-[118vh] rounded-3xl overflow-hidden shadow-elegant bg-[#F5F0E8]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <Image
              src={brideImage}
              alt={`${groom} & ${bride}`}
              fill
              className="object-cover"
              priority
              quality={75}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            className="flex flex-col justify-center items-center md:items-start space-y-6 md:space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Decorative Element */}
            <motion.div variants={itemVariants} className="flex gap-3 items-center">
              <div className="w-12 h-0.5 bg-[#D4AF88]" />
              <span className="text-[#D4AF88] font-playfair text-sm md:text-base tracking-widest">
                CERITA CINTA
              </span>
              <div className="w-12 h-0.5 bg-[#D4AF88]" />
            </motion.div>

            {/* Names */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-hero text-center md:text-left">
                <span className="text-[#D4AF88]">{groom}</span>
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="w-8 h-0.5 bg-[#D4AF88]" />
                <span className="text-[#6B5E5E] font-playfair text-lg md:text-2xl">&</span>
                <div className="w-8 h-0.5 bg-[#D4AF88]" />
              </div>
              <h1 className="text-hero text-center md:text-left text-[#8B4F6F]">
                {bride}
              </h1>
            </motion.div>

            {/* Date & Location */}
            <motion.div
              variants={itemVariants}
              className="space-y-3 text-center md:text-left"
            >
              <p className="text-body text-[#3A2F2F]">{date}</p>
              <p className="text-body-sm text-[#6B5E5E]">{location}</p>
            </motion.div>

            {/* Decorative Separator */}
            <motion.div
              variants={itemVariants}
              className="w-16 h-0.5 bg-linear-to-r from-[#D4AF88] to-[#8B4F6F] mx-auto md:mx-0"
            />

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full"
            >
              <ElegantButton variant="gold" size="md">
                Konfirmasi Kehadiran
              </ElegantButton>
              <ElegantButton variant="outline" size="md">
                Bagikan Undangan
              </ElegantButton>
            </motion.div>



            {/* Scroll Indicator */}
            <motion.div
              variants={itemVariants}
              className="mt-8 md:mt-12 hidden md:flex flex-col items-center gap-2 text-[#D4AF88]"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs font-inter uppercase tracking-widest">
                Scroll
              </span>
              <svg
                className="w-4 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Bottom Elements */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#F5F0E8] to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
      />
    </section>
  );
};
