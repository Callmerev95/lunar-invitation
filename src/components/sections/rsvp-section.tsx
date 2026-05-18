"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ElegantButton } from "../common/elegant-button";

// Form Validation Schema
const rsvpSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter").max(50, "Nama maksimal 50 karakter"),
  guestCount: z.number().min(1, "Jumlah tamu minimal 1").max(10, "Jumlah tamu maksimal 10"),
  attendanceStatus: z.enum(["yes", "no"]).optional(),
  message: z.string().max(200, "Pesan maksimal 200 karakter").optional().or(z.literal("")),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

interface RSVPSectionProps {
  weddingDate?: string;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({
  weddingDate = "2025-06-15"
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState<string | undefined>(
    undefined
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: "",
      guestCount: 1,
      attendanceStatus: undefined,
      message: "",
    },
  });

  // Update local state when form value changes to avoid React Compiler memoization issues
  React.useEffect(() => {
    const subscription = watch((value) => {
      setAttendanceStatus(value.attendanceStatus);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: RSVPFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("RSVP Data:", data);

      // Show success message
      setIsSubmitted(true);
      reset();

      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
      id="rsvp"
      className="relative w-full py-16 md:py-24 bg-linear-to-b from-[#FFFFFF] to-[#FAF7F2] overflow-hidden"
    >
      {/* Background Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF88] rounded-full opacity-5 blur-3xl" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#A8B5A2] rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-section-title mb-4">Konfirmasi Kehadiran</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-0.5 bg-[#D4AF88]" />
            <p className="text-[#6B5E5E] font-inter text-base md:text-lg">
              Kami tunggu kepastian Anda untuk merayakan hari istimewa ini
            </p>
            <div className="w-12 h-0.5 bg-[#D4AF88]" />
          </div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          className="bg-white rounded-3xl shadow-elegant overflow-hidden border border-[#F5F0E8]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="relative h-32 bg-linear-to-r from-[#D4AF88] via-[#F5F0E8] to-[#8B4F6F]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white font-playfair text-2xl md:text-3xl font-600">
                  Mari Rayakan Bersama
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                // Success Message
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12"
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF88] mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="text-[#3A2F2F] font-playfair text-2xl font-600 mb-2">
                    Terima Kasih!
                  </h3>
                  <p className="text-[#6B5E5E] font-inter text-base leading-relaxed mb-2">
                    Konfirmasi Anda telah kami terima dengan baik.
                  </p>
                  <p className="text-[#A8B5A2] font-inter text-sm">
                    Kami tunggu kehadiran Anda pada acara istimewa kami.
                  </p>
                </motion.div>
              ) : (
                // Form
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {/* Name Field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-[#3A2F2F] font-playfair font-600 mb-3">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan nama Anda"
                      {...register("name")}
                      className={`w-full px-6 py-3 rounded-2xl font-inter text-base bg-[#FAF7F2] border-2 transition-all duration-300 focus:outline-none ${errors.name
                          ? "border-red-400 focus:border-red-500"
                          : "border-[#F5F0E8] focus:border-[#D4AF88]"
                        }`}
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 font-inter text-sm mt-2"
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Guest Count Field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-[#3A2F2F] font-playfair font-600 mb-3">
                      Jumlah Tamu
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      placeholder="1"
                      {...register("guestCount", { valueAsNumber: true })}
                      className={`w-full px-6 py-3 rounded-2xl font-inter text-base bg-[#FAF7F2] border-2 transition-all duration-300 focus:outline-none ${errors.guestCount
                          ? "border-red-400 focus:border-red-500"
                          : "border-[#F5F0E8] focus:border-[#D4AF88]"
                        }`}
                    />
                    {errors.guestCount && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 font-inter text-sm mt-2"
                      >
                        {errors.guestCount.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Attendance Status Field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-[#3A2F2F] font-playfair font-600 mb-3">
                      Konfirmasi Kehadiran
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: "yes", label: "Ya, Saya Datang" },
                        { value: "no", label: "Maaf, Tidak Bisa" },
                      ].map((option) => (
                        <motion.label
                          key={option.value}
                          className={`relative flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${attendanceStatus === option.value
                              ? "border-[#D4AF88] bg-[#FFF9F0]"
                              : "border-[#F5F0E8] bg-[#FAF7F2] hover:border-[#D4AF88] hover:bg-[#FFF9F0]"
                            }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            type="radio"
                            value={option.value}
                            {...register("attendanceStatus")}
                            className="sr-only"
                          />
                          <div
                            className={`w-4 h-4 rounded-full border-2 mr-3 transition-all duration-300 ${attendanceStatus === option.value
                                ? "border-[#D4AF88] bg-[#D4AF88]"
                                : "border-[#D4AF88]"
                              }`}
                          />
                          <span className="font-inter text-base font-500 text-[#3A2F2F]">
                            {option.label}
                          </span>
                        </motion.label>
                      ))}
                    </div>
                    {errors.attendanceStatus && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 font-inter text-sm mt-2"
                      >
                        {errors.attendanceStatus.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Optional Message */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-[#3A2F2F] font-playfair font-600 mb-3">
                      Pesan (Opsional)
                    </label>
                    <textarea
                      placeholder="Tinggalkan pesan atau ucapan bahagia untuk kami..."
                      rows={4}
                      {...register("message")}
                      className={`w-full px-6 py-3 rounded-2xl font-inter text-base bg-[#FAF7F2] border-2 transition-all duration-300 focus:outline-none resize-none ${errors.message
                          ? "border-red-400 focus:border-red-500"
                          : "border-[#F5F0E8] focus:border-[#D4AF88]"
                        }`}
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 font-inter text-sm mt-2"
                      >
                        {errors.message.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={itemVariants} className="pt-6">
                    <ElegantButton
                      type="submit"
                      variant="gold"
                      size="lg"
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Mengirim...</span>
                        </div>
                      ) : (
                        "Konfirmasi Sekarang"
                      )}
                    </ElegantButton>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div
          className="mt-8 md:mt-10 p-6 md:p-8 bg-[#F5F0E8] rounded-2xl border border-[#D4AF88] border-opacity-30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-4 items-start">
            <div className="shrink-0">
              <svg
                className="w-6 h-6 text-[#D4AF88] mt-1"
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
            <div>
              <p className="text-[#3A2F2F] font-playfair font-600 mb-1">Informasi Penting</p>
              <p className="text-[#6B5E5E] font-inter text-sm leading-relaxed">
                Mohon lakukan konfirmasi sebelum {new Date(weddingDate).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}. Kepastian kehadiran Anda sangat berarti bagi kami.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
