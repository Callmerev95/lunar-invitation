"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";

interface QRSectionProps {
  invitationUrl?: string;
  coupleNames?: string;
  weddingDate?: string;
}

export const QRSection: React.FC<QRSectionProps> = ({
  invitationUrl = "https://lunar-invitation.vercel.app",
  coupleNames = "Muhammad Reynard & Putri Amanda",
  weddingDate = "15 Juni 2025",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, invitationUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: "#3A2F2F",
          light: "#F5F0E8",
        },
        errorCorrectionLevel: "H",
      });
    }
  }, [invitationUrl]);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="qr"
      className="relative w-full py-16 md:py-24 bg-linear-to-b from-[#FAF7F2] via-[#FFFFFF] to-[#F5F0E8]"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-[#D4AF88] rounded-full opacity-3 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#8B4F6F] rounded-full opacity-3 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-600 text-[#3A2F2F] mb-4">
            Undangan Digital
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
              Scan kode di bawah untuk buka undangan dalam format digital
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

        {/* QR Code Card Container */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* QR Code Card */}
          <motion.div variants={itemVariants} className="flex justify-center md:justify-end">
            <motion.div
              className="bg-white rounded-3xl p-8 md:p-10 shadow-elegant border border-[#F5F0E8]"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card Header */}
              <div className="mb-8 text-center">
                <div className="inline-block px-4 py-2 rounded-full bg-linear-to-r from-[#D4AF88] to-[#F5F0E8] mb-4">
                  <p className="text-[#3A2F2F] font-inter text-sm font-600">
                    📱 Buka Undangan
                  </p>
                </div>
              </div>

              {/* QR Code Container */}
              <motion.div
                className="relative bg-linear-to-br from-[#F5F0E8] to-[#FFFFFF] p-6 rounded-2xl border-2 border-[#D4AF88] border-opacity-30 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <canvas
                  ref={canvasRef}
                  className="w-full max-w-xs h-auto rounded-lg"
                />
              </motion.div>

              {/* Card Footer */}
              <div className="mt-8 text-center border-t border-[#F5F0E8] pt-6">
                <p className="text-[#6B5E5E] font-inter text-sm leading-relaxed mb-2">
                  Scan dengan kamera atau aplikasi QR
                </p>
                <p className="text-[#A8B5A2] font-inter text-xs">
                  Untuk membuka undangan digital kami
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Information Section */}
          <motion.div variants={itemVariants} className="md:pl-8">
            <div className="space-y-6">
              {/* Main Text */}
              <div>
                <h3 className="text-2xl md:text-3xl font-playfair font-600 text-[#3A2F2F] mb-3">
                  Terima Kasih
                </h3>
                <p className="text-[#6B5E5E] font-inter text-base leading-relaxed">
                  Atas kehadiran dan dukungan Anda untuk merayakan hari istimewa kami. Undangan digital ini berisi semua informasi lengkap tentang acara.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {[
                  {
                    icon: "✨",
                    title: "Undangan Lengkap",
                    desc: "Semua detail acara dalam satu tempat",
                  },
                  {
                    icon: "📍",
                    title: "Lokasi & Waktu",
                    desc: "Alamat detail dan jadwal acara yang jelas",
                  },
                  {
                    icon: "📸",
                    title: "Galeri Foto",
                    desc: "Momen indah kami bersama Anda",
                  },
                  {
                    icon: "💌",
                    title: "Konfirmasi RSVP",
                    desc: "Mudah mengkonfirmasi kehadiran Anda",
                  },
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-linear-to-r from-[#D4AF88] to-[#D4AF88] bg-opacity-10 border border-[#D4AF88] border-opacity-20"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-2xl shrink-0">{feature.icon}</span>
                    <div>
                      <p className="font-playfair font-600 text-[#3A2F2F] mb-1">
                        {feature.title}
                      </p>
                      <p className="text-[#6B5E5E] font-inter text-sm">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Couple Info */}
              <motion.div
                className="p-6 rounded-2xl border-2 border-[#D4AF88] border-opacity-30 bg-linear-to-br from-[#FFF9F0] to-[#FFFFFF]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <p className="text-[#8B4F6F] font-inter text-sm font-600 mb-2">
                    Undangan dari
                  </p>
                  <p className="text-[#3A2F2F] font-playfair text-lg font-600 mb-3">
                    {coupleNames}
                  </p>
                  <p className="text-[#6B5E5E] font-inter text-sm">
                    {weddingDate}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Closing Message */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6B5E5E] font-inter text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            Kehadiran Anda adalah hadiah terbesar bagi kami. Mari bersama-sama merayakan momen bahagia ini dengan penuh berkah dan kegembiraan.
          </p>
          <div className="flex justify-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-[#D4AF88]"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-[#D4AF88]"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-[#D4AF88]"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QRSection;
