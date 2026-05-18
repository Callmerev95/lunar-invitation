# PROMPT GUIDELINES - Lunar Invitation

Panduan ini harus selalu diikuti oleh AI Agent saat membuat atau mengedit kode.

## 1. Project Philosophy

- Elegan, Minimalis, dan Mewah (Minimalist Luxury)
- Soft, Romantic, dan Sophisticated
- Tidak norak, tidak berlebihan
- Prioritas: **User Experience yang halus & emosional**

## 2. Coding Rules (WAJIB DIKAHIRI)

### General Rules

- Selalu gunakan **TypeScript** (strict mode)
- Gunakan **shadcn/ui** components sebanyak mungkin
- Gunakan **Tailwind CSS** dengan utility-first
- Gunakan **Framer Motion** untuk animasi halus
- Selalu Mobile-First
- Performance harus diutamakan (Next.js best practices)

### Naming Convention

- Component: PascalCase (`HeroSection.tsx`)
- Folder: kebab-case (`hero-section/`)
- File: kebab-case untuk component (`countdown-timer.tsx`)

### Styling Rules

- Gunakan warna dari `DESIGN-SYSTEM.md`
- Gunakan `cn()` utility untuk conditional class
- Hindari inline style sebisa mungkin
- Gunakan `rounded-2xl` atau `rounded-3xl` untuk soft elegant feel
- Shadow: `shadow-xl` atau custom soft shadow

### Animation Rules

- Duration: 0.6s - 1.2s
- Easing: `ease-out` atau `cubic-bezier(0.4, 0, 0.2, 1)`
- Trigger: `whileInView`, hover, dan scroll
- Jangan berlebihan (elegan, bukan flashy)

## 3. Component Creation Rules

- Setiap component harus reusable
- Terima props dengan TypeScript interface
- Gunakan `forwardRef` jika diperlukan
- Berikan varian jika memungkinkan (`variant?: "gold" | "burgundy"`)
- Selalu responsive (mobile, tablet, desktop)

## 4. Folder Structure Rules

- Ikuti `COMPONENT-PLAN.md` dengan ketat
- Jangan buat folder baru tanpa izin
- Semua asset statis harus di `public/`

## 5. Special Instructions for Wedding Site

- Gunakan animasi yang **soft & romantic**
- Typography harus terasa premium
- Spacing harus generous (banyak white space)
- Warna harus soft, jangan terlalu kontras
- Setiap section harus terasa spesial

## 6. Performance Rules

- Gunakan `next/image` untuk semua gambar
- Lazy load section di bawah fold
- Optimasi animasi Framer Motion
- Jangan gunakan library berat kecuali diperlukan
