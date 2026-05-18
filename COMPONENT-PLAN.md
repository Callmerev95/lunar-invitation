# COMPONENT PLAN - Lunar Invitation

## Struktur Folder Project

lumina-invitation/
├── public/
│ ├── images/
│ │ ├── couples/
│ │ ├── prewedding/
│ │ └── templates/
│ ├── music/
│ └── favicon.ico
├── src/
│ ├── app/
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ └── page.tsx ← Landing page dengan template switcher
│ ├── components/
│ │ ├── ui/ ← shadcn components
│ │ ├── common/
│ │ │ ├── Navbar.tsx
│ │ │ ├── Footer.tsx
│ │ │ └── MusicPlayer.tsx
│ │ ├── sections/
│ │ │ ├── HeroSection.tsx
│ │ │ ├── CountdownSection.tsx
│ │ │ ├── EventDetails.tsx
│ │ │ ├── GallerySection.tsx
│ │ │ ├── TimelineSection.tsx
│ │ │ ├── RSVPSection.tsx
│ │ │ └── QRSection.tsx
│ │ └── templates/ ← Template variations
│ └── lib/
│ └── utils.ts
├── content/
│ └── templates/ ← Data untuk setiap template
└── DESIGN-SYSTEM.md

## Daftar Component Utama

### 1. Core Components

- **HeroSection** → Foto besar + nama pasangan + tanggal
- **CountdownTimer** → Hitung mundur hari H
- **EventDetails** → Akad & Resepsi (waktu, tempat, dresscode)
- **GoogleMapsEmbed** → Lokasi + tombol buka maps
- **GallerySection** → Grid foto couple & prewedding
- **TimelineSection** → Alur acara
- **RSVPSection** → Form konfirmasi kehadiran
- **MusicPlayer** → Lagu latar romantis
- **QRCodeSection** → QR untuk undangan digital

### 2. Reusable Components

- ElegantButton
- SectionTitle
- SoftCard
- ScrollProgress
- GuestBook (future)
- ShareButtons

### 3. Template System

- Template1: Minimalist Gold
- Template2: Romantic Burgundy
- Template3: Modern Sage
- Template4: Classic Elegant
- Template5: Soft Pastel

## Component Specifications

**HeroSection Requirements:**

- Full height di mobile
- Parallax effect ringan
- Overlay gradient soft
- Typography besar & elegant

**CountdownTimer:**

- Desain elegan dengan box terpisah
- Animasi flip atau smooth count
- Support multiple events (Akad & Resepsi)

**RSVP Form:**

- Input nama, jumlah tamu, konfirmasi hadir/tidak
- Simpan ke database (Vercel KV atau Supabase nanti)
- Thank you message setelah submit
