"use client";

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Facebook", href: "#" },
  ];

  return (
    <footer className="bg-[#3A2F2F] text-[#F5F0E8] pt-16 pb-8 md:pt-20 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl md:text-3xl font-playfair font-600 text-[#D4AF88] mb-2">
              Lunar
            </h3>
            <p className="text-[#A8B5A2] font-inter text-base leading-relaxed">
              Elegant Digital Wedding Invitations for Modern Couples
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-playfair font-600 text-[#D4AF88] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-[#A8B5A2] hover:text-[#D4AF88] transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#A8B5A2] hover:text-[#D4AF88] transition-colors duration-300"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#A8B5A2] hover:text-[#D4AF88] transition-colors duration-300"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-playfair font-600 text-[#D4AF88] mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[#A8B5A2] hover:text-[#D4AF88] transition-colors duration-300"
                  title={link.label}
                >
                  <span className="sr-only">{link.label}</span>
                  <div className="w-6 h-6 rounded-full border border-[#A8B5A2] hover:border-[#D4AF88] flex items-center justify-center text-sm" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#6B5E5E] mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#A8B5A2]">
          <p>&copy; {currentYear} Lunar Invitation. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="hover:text-[#D4AF88] transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="hover:text-[#D4AF88] transition-colors duration-300"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
