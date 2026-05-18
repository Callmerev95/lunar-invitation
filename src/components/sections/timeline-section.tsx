"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineEvent {
  id: number;
  title: string;
  time: string;
  description: string;
  icon: React.ReactNode;
  location?: string;
}

interface TimelineSectionProps {
  events?: TimelineEvent[];
}

const DefaultTimelineEvents: TimelineEvent[] = [
  {
    id: 1,
    title: "Akad Nikah",
    time: "09:00 - 11:00 WIB",
    description: "Ijab Kabul dan pesan sakral",
    location: "Tempat Acara",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Foto Keluarga",
    time: "11:15 - 11:45 WIB",
    description: "Sesi foto bersama keluarga besar",
    location: "Area Acara",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Resepsi Dimulai",
    time: "12:00 WIB",
    description: "Selamat datang dan doa sebelum makan",
    location: "Ruang Resepsi",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Acara Inti",
    time: "12:30 - 14:30 WIB",
    description: "Makan bersama dan hiburan spesial",
    location: "Ruang Resepsi",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Lamaran",
    time: "14:45 - 15:15 WIB",
    description: "Prosesi pertunangan yang istimewa",
    location: "Panggung Utama",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Penutupan",
    time: "15:30 - 16:00 WIB",
    description: "Terima kasih dan doa penutup",
    location: "Ruang Acara",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  events = DefaultTimelineEvents,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        delay: custom * 0.1,
      },
    }),
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
        type: "spring" as const,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1,
        type: "tween" as const,
      },
    },
  };

  return (
    <section
      id="timeline"
      className="relative w-full py-16 md:py-24 bg-linear-to-b from-[#FFFFFF] via-[#FAF7F2] to-[#F5F0E8]"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-5 w-56 h-56 bg-[#D4AF88] rounded-full opacity-3 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#8B4F6F] rounded-full opacity-3 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-600 text-[#3A2F2F] mb-4">
            Alur Acara
          </h2>
          <div className="flex items-center justify-center gap-4">
            <motion.div
              className="w-12 h-0.5 bg-[#D4AF88]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <p className="text-[#6B5E5E] font-inter text-base md:text-lg">
              Perjalanan indah dimulai dari sini
            </p>
            <motion.div
              className="w-12 h-0.5 bg-[#D4AF88]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            />
          </div>
        </motion.div>

        {/* Timeline Container */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Vertical Line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-[#D4AF88] via-[#D4AF88] to-[#8B4F6F] transform -translate-x-1/2"
            variants={lineVariants}
            style={{ originY: 0 }}
          />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-12">
            {events.map((event, index) => (
              <motion.div key={event.id} variants={itemVariants} className="relative">
                <div className={`flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <motion.div
                      className="group bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-[#F5F0E8] hover:shadow-elegant transition-all duration-500"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Time Badge */}
                      <div className="inline-block mb-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#D4AF88] to-[#F5F0E8] text-[#3A2F2F]">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="font-inter font-600 text-sm">
                            {event.time}
                          </span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-playfair font-600 text-[#3A2F2F] mb-3">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[#6B5E5E] font-inter text-sm md:text-base leading-relaxed mb-4">
                        {event.description}
                      </p>

                      {/* Location */}
                      {event.location && (
                        <div className="flex items-center gap-2 text-[#8B4F6F]">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="font-inter text-sm font-500">
                            {event.location}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-full md:w-0 flex justify-center md:absolute md:left-1/2 md:top-12 md:transform md:-translate-x-1/2">
                    <motion.div
                      variants={dotVariants}
                      className="relative"
                    >
                      {/* Outer Ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-linear-to-br from-[#D4AF88] to-[#8B4F6F] opacity-20"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{
                          duration: 2,
                          delay: index * 0.1,
                          repeat: Infinity,
                        }}
                        style={{
                          width: 20,
                          height: 20,
                          left: -10,
                          top: -10,
                        }}
                      />

                      {/* Main Dot */}
                      <div className="relative w-5 h-5 rounded-full bg-linear-to-br from-[#D4AF88] to-[#8B4F6F] border-4 border-white shadow-md flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white opacity-50" />
                      </div>

                      {/* Icon */}
                      <motion.div
                        className="absolute -top-4 -right-12 md:hidden w-8 h-8 rounded-full bg-[#D4AF88] text-white flex items-center justify-center text-sm"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {event.icon}
                      </motion.div>

                      {/* Desktop Icon */}
                      <motion.div
                        className="hidden md:flex absolute -top-3 -left-3 w-10 h-10 rounded-full bg-white border-2 border-[#D4AF88] items-center justify-center text-[#D4AF88] shadow-md"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {event.icon}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing Message */}
        <motion.div
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6B5E5E] font-inter text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Terima kasih telah menjadi bagian dari perjalanan istimewa kami.
            Kehadiran Anda adalah berkah yang luar biasa bagi kami.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;
