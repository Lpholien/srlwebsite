# Design Transfer Artifact

## 1. Color Palette

### Primary Backgrounds
- **Midnight (Main BG):** `#020617` (Tailwind: `slate-950`)
- **Deep Blue (Panels/Sections):** `#152033` (Tailwind: `slate-850`)

### Accents & Gradients
- **Electric Cyan (Primary Accent):** `#0bdef0` (Tailwind: `cyan-450`) / `#22d3ee` (Tailwind: `cyan-400`)
- **Action Blue:** `#3b82f6` (Tailwind: `blue-500`)
- **Primary Gradient:** `linear-gradient(to right, #22d3ee, #3b82f6)` (Cyan-400 to Blue-500)

### Text Colors
- **Headings (White):** `#ffffff` (Tailwind: `white`)
- **Body/Muted:** `#94a3b8` (Tailwind: `slate-400`)
- **Labels/Technical:** `#475569` (Tailwind: `slate-600`)

---

## 2. Typography

### Font Families
- **Primary (Sans):** `Inter`, system-ui, sans-serif
- **Technical/Code (Mono):** `JetBrains Mono`, monospace

### Typography Rules
- **Hero Headings:** 
  - Weight: `font-black` (900)
  - Tracking: `tracking-tighter` (-0.05em)
  - Line Height: `leading-[0.9]`
  - Size: `text-5xl` to `text-8xl`
- **Technical Labels (Mono or Sans):**
  - Size: `text-xs` or `text-[10px]`
  - Weight: `font-bold` (700)
  - Case: `uppercase`
  - Tracking: `tracking-widest` (0.1em) or `tracking-[0.2em]`

---

## 3. Component Styling

### Glassmorphism ("Glass Panel")
- **Background:** `rgba(15, 23, 42, 0.6)`
- **Blur:** `backdrop-filter: blur(12px)`
- **Border:** `1px solid rgba(255, 255, 255, 0.08)`

### Buttons
- **Primary Action (High Visibility):**
  - Shape: `rounded-2xl`
  - Fill: `bg-cyan-500` hover `bg-cyan-400`
  - Text: `text-slate-950`
  - Weight: `font-black`
  - Interaction: `hover:-translate-y-1 active:scale-95`
  - Shadow: `shadow-2xl shadow-cyan-500/20`
- **Secondary Action (Subtle):**
  - Shape: `rounded-2xl`
  - Border: `border border-slate-800` hover `border-slate-600`
  - Effect: `backdrop-blur-sm` hover `bg-white/5`

### Grids & Texture
- **Background Grid:** `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`
- **Glow Effects:** `box-shadow: 0 0 20px rgba(6, 182, 212, 0.15)` (Neon Glow)

---

## 4. "The Vibe"

**"Pharma 4.0 Cyber-Professional"**

A sophisticated intersection of high-trust corporate reliability and futuristic technical precision. The aesthetic relies heavily on a "Dark Mode" foundation (`slate-950`) to minimize eye strain while using "Electric Cyan" and "Neon Blue" glows to suggest intelligence, data flow, and modernization.

Key visual attributes:
- **Depth:** Achieved through layered glassmorphism and subtle radial gradient glows behind objects.
- **Precision:** Indicated by monospaced technical labels, tight letter spacing on headings, and thin 1px borders.
- **Fluidity:** Smooth hover transitions and floating/pulsing animations on data elements.
