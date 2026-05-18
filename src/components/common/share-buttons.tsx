"use client";

import React from "react";
import { motion } from "framer-motion";

interface ShareButtonsProps {
  invitationUrl?: string;
  coupleNames?: string;
  weddingDate?: string;
  direction?: "horizontal" | "vertical";
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  invitationUrl = "https://lunar-invitation.vercel.app",
  coupleNames = "Muhammad Reynard & Putri Amanda",
  weddingDate = "15 Juni 2025",
  direction = "horizontal",
}) => {
  const shareMessage = `Kami mengundang Anda untuk merayakan hari istimewa kami. ${coupleNames} - ${weddingDate}. Buka undangan digital kami di: ${invitationUrl}`;

  const shareButtons = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: "💬",
      color: "from-[#25D366] to-[#20BA5C]",
      hoverColor: "hover:shadow-lg hover:shadow-green-400",
      action: () => {
        const text = encodeURIComponent(shareMessage);
        window.open(`https://wa.me/?text=${text}`, "_blank");
      },
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: "📸",
      color: "from-[#E4405F] to-[#F77737]",
      hoverColor: "hover:shadow-lg hover:shadow-pink-400",
      action: () => {
        alert("Buka Instagram dan bagikan undangan kami di Stories atau Feed Anda!");
      },
    },
    {
      id: "email",
      label: "Email",
      icon: "📧",
      color: "from-[#EA4335] to-[#FBBC04]",
      hoverColor: "hover:shadow-lg hover:shadow-red-400",
      action: () => {
        const subject = encodeURIComponent(`Undangan Pernikahan ${coupleNames}`);
        const body = encodeURIComponent(shareMessage);
        window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
      },
    },
    {
      id: "copy",
      label: "Salin Link",
      icon: "🔗",
      color: "from-[#D4AF88] to-[#8B4F6F]",
      hoverColor: "hover:shadow-lg hover:shadow-amber-400",
      action: () => {
        navigator.clipboard.writeText(invitationUrl);
        alert("Link telah disalin ke clipboard!");
      },
    },
  ];

  const containerClass =
    direction === "horizontal"
      ? "flex items-center gap-3 md:gap-4"
      : "flex flex-col gap-3 md:gap-4";

  const buttonClass =
    direction === "horizontal"
      ? "w-12 h-12 md:w-14 md:h-14"
      : "w-full";

  return (
    <motion.div
      className={containerClass}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {shareButtons.map((button, idx) => (
        <motion.button
          key={button.id}
          onClick={button.action}
          className={`${buttonClass} relative group flex items-center justify-center rounded-full font-inter font-600 text-white transition-all duration-300 shadow-soft ${button.hoverColor}`}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true }}
          title={button.label}
        >
          {/* Gradient Background */}
          <div
            className={`absolute inset-0 rounded-full bg-linear-to-br ${button.color} opacity-90 group-hover:opacity-100 transition-all duration-300`}
          />

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center">
            <span className="text-lg md:text-xl">{button.icon}</span>
            {direction === "vertical" && (
              <span className="text-xs md:text-sm mt-1">{button.label}</span>
            )}
          </div>

          {/* Hover Glow Effect */}
          <motion.div
            className={`absolute inset-0 rounded-full bg-linear-to-br ${button.color} opacity-0 blur-md`}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ShareButtons;
