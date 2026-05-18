"use client";

import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { MusicPlayer } from "@/components/common/music-player";
import { HeroSection } from "@/components/sections/hero-section";
import { CountdownSection } from "@/components/sections/countdown-section";
import { EventDetails } from "@/components/sections/event-details";
import { TimelineSection } from "@/components/sections/timeline-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { RSVPSection } from "@/components/sections/rsvp-section";
import { QRSection } from "@/components/sections/qr-section";

export default function Home() {
  // Sample event data
  const events = [
    {
      type: "Akad Nikah" as const,
      time: "09:00 - 10:30",
      location: "Masjid Al-Ikhlas",
      address: "Jl. Kebon Sirih No. 123, Jakarta Pusat",
      dresscode: "Formal Islami",
      notes: "Mohon hadir 15 menit sebelum acara dimulai",
    },
    {
      type: "Resepsi" as const,
      time: "12:00 - 16:00",
      location: "Ballroom Grand Hyatt Jakarta",
      address: "Jl. M.H. Thamrin, Jakarta Pusat",
      dresscode: "Formal / Semi Formal",
      notes: "Menu sesuai preferensi yang telah dikonfirmasi",
    },
  ];

  // Sample gallery data
  const galleryImages = [
    {
      id: "1",
      src: "/images/couples/placeholder-1.jpg",
      alt: "Moment Bahagia",
      category: "couple" as const,
    },
    {
      id: "2",
      src: "/images/couples/placeholder-2.jpg",
      alt: "Senyuman Termanis",
      category: "couple" as const,
    },
    {
      id: "3",
      src: "/images/prewedding/placeholder-1.jpg",
      alt: "Prewedding di Pantai",
      category: "prewedding" as const,
    },
    {
      id: "4",
      src: "/images/prewedding/placeholder-2.jpg",
      alt: "Momen Romantis",
      category: "prewedding" as const,
    },
    {
      id: "5",
      src: "/images/couples/placeholder-3.jpg",
      alt: "Kebersamaan",
      category: "couple" as const,
    },
    {
      id: "6",
      src: "/images/prewedding/placeholder-3.jpg",
      alt: "Sunset Moment",
      category: "prewedding" as const,
    },
  ];

  return (
    <main className="w-full bg-[#FAF7F2]">
      <Navbar />

      {/* Hero Section - Template 1: Golden Hour */}
      <HeroSection
        brideImage="/images/couples/couple-placeholder.jpg"
        groom="Muhammad Reynard"
        bride="Putri Amanda"
        date="Minggu, 15 Juni 2025"
        location="Ballroom Grand Hyatt Jakarta"
      />

      {/* Countdown Section */}
      <CountdownSection
        targetDate="2025-06-15"
        eventName="Hari Istimewa Kami"
      />

      {/* Event Details Section */}
      <EventDetails events={events} />

      {/* Timeline Section */}
      <TimelineSection />

      {/* Gallery Section */}
      <GallerySection images={galleryImages} />

      {/* RSVP Section */}
      <RSVPSection 
        weddingDate="2025-06-15"
        googleFormUrl="https://docs.google.com/forms/d/e/1FAIpQLSc_placeholder/viewform?usp=send_form"
      />

      {/* QR Code Section */}
      <QRSection
        coupleNames="Muhammad Reynard & Putri Amanda"
        weddingDate="15 Juni 2025"
      />

      {/* Music Player */}
      <MusicPlayer
        title="Romantic Evening"
        artist="Composed by Lunaria"
        src="/music/default.mp3"
      />

      <Footer />
    </main>
  );
}
