"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownSectionProps {
  targetDate: string; // Format: "2025-06-15" or ISO string
  eventName?: string;
}

interface TimeUnit {
  label: string;
  value: number;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  targetDate,
  eventName = "Hari Istimewa Kami",
}) => {
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([
    { label: "Hari", value: 0 },
    { label: "Jam", value: 0 },
    { label: "Menit", value: 0 },
    { label: "Detik", value: 0 },
  ]);

  useEffect(() => {
    const calculateCountdown = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeUnits([
          { label: "Hari", value: days },
          { label: "Jam", value: hours },
          { label: "Menit", value: minutes },
          { label: "Detik", value: seconds },
        ]);
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="countdown" className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF88] rounded-full opacity-5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#8B4F6F] rounded-full opacity-5 blur-3xl" />
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
          <h2 className="text-section-title mb-4">{eventName}</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-0.5 bg-[#D4AF88]" />
            <p className="text-[#6B5E5E] font-inter text-base md:text-lg">
              Penghitung hari menuju momen spesial
            </p>
            <div className="w-12 h-0.5 bg-[#D4AF88]" />
          </div>
        </motion.div>

        {/* Countdown Boxes */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {timeUnits.map((unit) => (
            <motion.div
              key={unit.label}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-500 overflow-hidden border border-[#F5F0E8]">
                {/* Top Accent Bar */}
                <div className="h-1 bg-linear-to-r from-[#D4AF88] to-[#8B4F6F]" />

                {/* Content */}
                <div className="p-6 md:p-8 text-center">
                  {/* Number with animation */}
                  <motion.div
                    className="text-4xl md:text-5xl font-playfair font-700 text-[#D4AF88] mb-2 leading-none"
                    key={unit.value}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {String(unit.value).padStart(2, "0")}
                  </motion.div>

                  {/* Label */}
                  <p className="text-[#3A2F2F] font-inter text-sm md:text-base font-500 tracking-wide">
                    {unit.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          className="h-0.5 w-24 bg-linear-to-r from-[#D4AF88] to-transparent mx-auto"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        />
      </div>
    </section>
  );
};
