"use client";

import React from "react";
import { motion } from "framer-motion";

interface EventInfo {
  type: "Akad Nikah" | "Resepsi";
  time: string;
  location: string;
  address: string;
  dresscode?: string;
  notes?: string;
}

interface EventDetailsProps {
  events: EventInfo[];
}

export const EventDetails: React.FC<EventDetailsProps> = ({ events }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <section
      id="acara"
      className="relative w-full py-16 md:py-24 bg-linear-to-b from-[#FAF7F2] via-[#FFFFFF] to-[#FAF7F2]"
    >
      {/* Background Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#D4AF88] rounded-full opacity-5 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-[#8B4F6F] rounded-full opacity-5 blur-3xl" />
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
          <h2 className="text-section-title mb-4">Detail Acara</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-0.5 bg-[#D4AF88]" />
            <p className="text-[#6B5E5E] font-inter text-base md:text-lg">
              Informasi lengkap tentang perayaan istimewa kami
            </p>
            <div className="w-12 h-0.5 bg-[#D4AF88]" />
          </div>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {events.map((event) => (
            <motion.div
              key={event.type}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-700 border border-[#F5F0E8]">
                {/* Header with Type Badge */}
                <div className="relative h-24 bg-linear-to-r from-[#D4AF88] to-[#8B4F6F] flex items-center px-8">
                  <div className="flex items-baseline gap-3">
                    <span className="inline-block w-3 h-3 rounded-full bg-white opacity-60" />
                    <h3 className="text-white font-playfair text-2xl md:text-3xl font-600">
                      {event.type}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 space-y-6">
                  {/* Time */}
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#F5F0E8] flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-[#D4AF88]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00-.293.707l-2.829 2.829a1 1 0 101.414 1.414L9 11.414V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#6B5E5E] font-inter text-sm uppercase tracking-widest mb-1">
                        Waktu
                      </p>
                      <p className="text-[#3A2F2F] font-playfair text-lg font-600">
                        {event.time}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#F5F0E8] flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-[#D4AF88]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#6B5E5E] font-inter text-sm uppercase tracking-widest mb-1">
                        Lokasi
                      </p>
                      <p className="text-[#3A2F2F] font-inter text-base font-500 mb-1">
                        {event.location}
                      </p>
                      <p className="text-[#6B5E5E] font-inter text-sm leading-relaxed">
                        {event.address}
                      </p>
                    </div>
                  </div>

                  {/* Dresscode */}
                  {event.dresscode && (
                    <div className="flex items-start gap-4 pt-4 border-t border-[#F5F0E8]">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-[#F5F0E8] flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-[#D4AF88]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5 3a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2h-6a2 2 0 01-2-2V3zM7 5a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[#6B5E5E] font-inter text-sm uppercase tracking-widest mb-1">
                          Dress Code
                        </p>
                        <p className="text-[#3A2F2F] font-inter text-base font-500">
                          {event.dresscode}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {event.notes && (
                    <div className="pt-4 border-t border-[#F5F0E8]">
                      <p className="text-[#6B5E5E] font-inter text-sm italic">
                        {event.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 md:mt-16 p-8 md:p-10 bg-white rounded-2xl border border-[#F5F0E8] shadow-soft"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#F5F0E8]">
                <svg
                  className="w-6 h-6 text-[#D4AF88]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM8 9a1 1 0 100-2 1 1 0 000 2zm5-1a1 1 0 11-2 0 1 1 0 012 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-[#3A2F2F] font-playfair text-lg font-600 mb-2">
                Protokol Kesehatan
              </h3>
              <p className="text-[#6B5E5E] font-inter leading-relaxed">
                Kami berharap semua tamu dalam kondisi sehat. Mohon untuk tidak menghadiri jika sedang sakit atau tidak merasa sehat. Terima kasih atas pengertian dan dukungannya.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
