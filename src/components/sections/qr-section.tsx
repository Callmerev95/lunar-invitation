"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";

interface QRSectionProps {
  invitationUrl?: string;
  amplopyUrl?: string;
  coupleNames?: string;
  weddingDate?: string;
}

export const QRSection: React.FC<QRSectionProps> = ({
  invitationUrl = "https://lunar-invitation.vercel.app",
  amplopyUrl = "https://payment.placeholder.com/qris",
  coupleNames = "Muhammad Reynard & Putri Amanda",
  weddingDate = "15 Juni 2025",
}) => {
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef1.current) {
      QRCode.toCanvas(canvasRef1.current, invitationUrl, {
        width: 280,
        margin: 2,
        color: {
          dark: "#3A2F2F",
          light: "#F5F0E8",
        },
        errorCorrectionLevel: "H",
      });
    }
  }, [invitationUrl]);

  useEffect(() => {
    if (canvasRef2.current) {
      QRCode.toCanvas(canvasRef2.current, amplopyUrl, {
        width: 280,
        margin: 2,
        color: {
          dark: "#8B4F6F",
          light: "#F5F0E8",
        },
        errorCorrectionLevel: "H",
      });
    }
  }, [amplopyUrl]);

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
    <section
      id="qr"
      className="relative w-full py-16 md:py-24 bg-linear-to-b from-[#FAF7F2] via-[#FFFFFF] to-[#F5F0E8]"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-[#D4AF88] rounded-full opacity-3 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#8B4F6F] rounded-full opacity-3 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-600 text-[#3A2F2F] mb-4">
            Undangan & Amplop Digital
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
              Dua kode untuk pengalaman lengkap
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

        {/* QR Codes Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* QR Code 1: Invitation */}
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <motion.div
              className="w-full bg-white rounded-3xl p-8 md:p-10 shadow-elegant border border-[#F5F0E8]"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card Badge */}
              <div className="mb-6 text-center">
                <div className="inline-block px-4 py-2 rounded-full bg-linear-to-r from-[#D4AF88] to-[#F5F0E8]">
                  <p className="text-[#3A2F2F] font-inter text-sm font-600">
                    📱 Undangan Digital
                  </p>
                </div>
              </div>

              {/* QR Code Display */}
              <motion.div
                className="relative bg-linear-to-br from-[#F5F0E8] to-[#FFFFFF] p-6 rounded-2xl border-2 border-[#D4AF88] border-opacity-30 flex items-center justify-center mb-6"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <canvas ref={canvasRef1} className="w-full max-w-xs h-auto rounded-lg" />
              </motion.div>

              {/* Description */}
              <div className="text-center border-t border-[#F5F0E8] pt-6">
                <p className="text-[#3A2F2F] font-playfair font-600 mb-2">
                  Buka Undangan Lengkap
                </p>
                <p className="text-[#6B5E5E] font-inter text-sm leading-relaxed mb-2">
                  Scan untuk melihat detail acara, galeri foto, dan konfirmasi kehadiran
                </p>
                <p className="text-[#A8B5A2] font-inter text-xs">
                  Undangan interaktif dalam format digital
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* QR Code 2: Digital Envelope (QRIS/Payment) */}
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <motion.div
              className="w-full bg-white rounded-3xl p-8 md:p-10 shadow-elegant border border-[#F5F0E8]"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card Badge */}
              <div className="mb-6 text-center">
                <div className="inline-block px-4 py-2 rounded-full bg-linear-to-r from-[#8B4F6F] to-[#D4AF88]">
                  <p className="text-white font-inter text-sm font-600">
                    💝 Amplop Digital
                  </p>
                </div>
              </div>

              {/* QR Code Display */}
              <motion.div
                className="relative bg-linear-to-br from-[#FFF0F5] to-[#FFFFFF] p-6 rounded-2xl border-2 border-[#8B4F6F] border-opacity-30 flex items-center justify-center mb-6"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                viewport={{ once: true }}
              >
                <canvas ref={canvasRef2} className="w-full max-w-xs h-auto rounded-lg" />
              </motion.div>

              {/* Description */}
              <div className="text-center border-t border-[#F5F0E8] pt-6">
                <p className="text-[#3A2F2F] font-playfair font-600 mb-2">
                  Berikan Hadiah Digital
                </p>
                <p className="text-[#6B5E5E] font-inter text-sm leading-relaxed mb-2">
                  Scan untuk mengirimkan hadiah melalui QRIS atau transfer ke rekening kami
                </p>
                <p className="text-[#A8B5A2] font-inter text-xs">
                  Kehadiran Anda adalah hadiah terbaik bagi kami
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Couple Info Card */}
          <motion.div
            className="p-6 rounded-2xl border-2 border-[#D4AF88] border-opacity-30 bg-linear-to-br from-[#FFF9F0] to-[#FFFFFF]"
            whileHover={{ y: -3 }}
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

          {/* Tips Card */}
          <motion.div
            className="p-6 rounded-2xl border-2 border-[#A8B5A2] border-opacity-30 bg-linear-to-br from-[#F0F5F3] to-[#FFFFFF]"
            whileHover={{ y: -3 }}
          >
            <div>
              <p className="text-[#A8B5A2] font-inter text-sm font-600 mb-3 flex items-center gap-2">
                ✨ Tips Scanning QR Code
              </p>
              <ul className="text-[#6B5E5E] font-inter text-sm space-y-2">
                <li>• Gunakan kamera atau aplikasi QR</li>
                <li>• Pastikan cahaya cukup terang</li>
                <li>• Jangan zoom, fokus ke QR code</li>
                <li>• Tap link yang muncul untuk membuka</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Closing Message */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6B5E5E] font-inter text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            Kehadiran dan dukungan Anda sangat berarti bagi kami. Mari merayakan momen spesial ini bersama dengan penuh berkah dan kegembiraan.
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
