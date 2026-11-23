---
name: Aerospace HUD
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#bdc8d1'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#87929a'
  outline-variant: '#3e484f'
  surface-tint: '#7bd0ff'
  primary: '#8ed5ff'
  on-primary: '#00354a'
  primary-container: '#38bdf8'
  on-primary-container: '#004965'
  inverse-primary: '#00668a'
  secondary: '#ffc640'
  on-secondary: '#402d00'
  secondary-container: '#e3aa00'
  on-secondary-container: '#5a4100'
  tertiary: '#56e5a9'
  on-tertiary: '#003824'
  tertiary-container: '#30c88f'
  on-tertiary-container: '#004e34'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c4e7ff'
  primary-fixed-dim: '#7bd0ff'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004c69'
  secondary-fixed: '#ffdf9f'
  secondary-fixed-dim: '#f9bd22'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 52px
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  telemetry-lg:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.02em
  telemetry-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  telemetry-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system delivers an authentic aerospace telemetry experience engineered for Grade 10 mathematics students investigating trigonometry, vector decomposition, and kinematic flight physics. The visual language bridges high-end avionics displays (Airbus glass cockpits, modern tactical HUDs) with modern developer-focused interfaces (Linear, Vercel).

The aesthetic targets clarity, precision, and intellectual engagement. The visual tone is structured, technological, and tactical rather than juvenile, instilling pride and seriousness in high-school learners solving real navigation challenges. Interfaces balance deep low-reflectance surfaces with razor-sharp luminous vector overlays, high-density telemetry readouts, and tactile glass panels.

## Colors
The palette is built upon deep non-reflective cockpit tones punctuated by functional avionics emission colors:

- **Deep Cockpit Slate (`#090D16`)**: Canvas background, dampening eye strain during extended simulation runs.
- **Glass Panel Surface (`rgba(15, 23, 42, 0.72)`)**: Translucent backings for telemetry clusters, tool drawers, and physics inspectors.
- **Primary Sky Cyan (`#38BDF8`)**: Dynamic vector trajectories, user aircraft velocity paths, active interactive dials, and primary trigonometric component readouts ($v_x, v_y$).
- **Secondary Amber Gold (`#FBBF24`)**: Crosswind vectors, navigational course warnings, active quest steps, target approach milestones, and throttle threshold tags.
- **Tertiary Emerald (`#10B981`)**: True glide-slope alignment, completed coordinate solutions, nominal speed checks, and runway approach confirmation.
- **Data Neutral (`#F8FAFC`)**: Crisp primary readouts, coordinate values, and formula symbols. Secondary telemetry text steps down to `#94A3B8`.

## Typography
Typographic rhythm enforces operational rigor. Space Grotesk commands display areas and simulation checkpoints, bringing geometric engineering traits to stage introductions. Geist provides distortion-free clarity for contextual math problem prompts, lesson notes, and step descriptions. 

JetBrains Mono is dedicated to all numeric readouts, bearing vectors, trigonometric equations ($\sin, \cos, \tan$), and coordinate positions ($x, y, z$). Use `label-caps` strictly uppercase for avionics labels (`ALT`, `TAS`, `GS`, `WIND HDG`, `DEG`).

## Layout & Spacing
The layout implements a primary 12-column fluid grid dedicated to the simulation viewport and telemetry docks:

- **Desktop (>= 1280px)**: The flight radar canvas occupies the central 8 columns, while the Flight Management Computer (FMC) and Math Quest step rails lock to the left and right 2-column or 4-column glass sidebars. 
- **Tablet (768px - 1279px)**: 8-column layout. The simulation radar dominates with collapsible floating HUD panels positioned over corners.
- **Mobile (< 768px)**: 4-column layout. Viewport scales to full width with a bottom slide-up drawer for coordinate inputs and step execution.

All panels and HUD overlays rely strictly on the `space-*` scale for internal padding. HUD instruments employ compact `space-xs` and `space-sm` spacing to sustain maximum visible canvas area for vector lines.

## Elevation & Depth
Depth is created through optical glass layers rather than drop shadows, mimicking cockpit heads-up glass plates:

- **Layer 0 (Canvas)**: Solid `#090D16` radar coordinate grid with faint radial distance rings (`rgba(56, 189, 248, 0.08)`).
- **Layer 1 (Sub-HUD Panels & Flight Controls)**: `rgba(15, 23, 42, 0.72)` with a 1px structural edge border (`rgba(255, 255, 255, 0.12)`) and `backdrop-filter: blur(12px)`.
- **Layer 2 (Overlays & Coordinate Calipers)**: `rgba(30, 41, 59, 0.85)` with cyan-tinted perimeter borders (`rgba(56, 189, 248, 0.35)`), accompanied by a diffused accent glow (`0 0 24px rgba(56, 189, 248, 0.15)`).
- **Active Emissive Vectors**: Direct SVG drop-shadow filter glow on vector needles and flight path polylines (`drop-shadow(0 0 6px currentColor)`).

## Shapes
Shapes express precision engineering with low-radius corners. A base soft radius (`0.25rem` / `4px`) gives instrumentation panels, input fields, and telemetry badges structural firmness without harshness. 

Exceptions are reserved for specific tactical controls:
- **Segmented Mode Pickers & Toggles**: Pill-shaped (`rounded-full`) to clearly signal state toggles (e.g., Switching between `AIRSPEED`, `GROUNDSPEED`, and `WIND CORRECTION`).
- **Telemetry Readout Caps**: Chamfered or cut-corner visual styling applied via 1px border lines to simulate physical avionics bezels.

## Components

### Buttons & Flight Engagements
- **Primary ("Commit Heading" / "Engage Autopilot")**: Filled `#38BDF8` background with `#090D16` bold mono text, crisp 4px radius, and subtle cyan outer glow on hover (`0 0 16px rgba(56, 189, 248, 0.4)`).
- **Secondary / Abort ("Clear Vector" / "Reset")**: Frosted glass plate (`rgba(15, 23, 42, 0.72)`) with a 1px border (`rgba(255, 255, 255, 0.16)`) and `#F8FAFC` text, shifting to Amber border on hover.
- **Flight Stepper Buttons**: Icon-driven square controls (36x36px) with center-aligned monospaced glyphs.

### Segmented Pill Toggles
- Compact horizontal container with `rgba(15, 23, 42, 0.9)` fill and full pill radius (`9999px`).
- Inactive tabs display `#94A3B8` `JetBrains Mono` text.
- Active tab features glowing cyan backing (`rgba(56, 189, 248, 0.18)`), high-contrast `#38BDF8` text, and a 1px border (`rgba(56, 189, 248, 0.4)`).

### Flight Cards & Telemetry Instrument Pods
- Modular containers using glassmorphic fill (`rgba(15, 23, 42, 0.72)`), 1px border (`rgba(255, 255, 255, 0.12)`), and internal 16px (`space-md`) padding.
- Pod headers contain a 10px uppercase `label-caps` tag accompanied by a colored status blip (Sky Cyan for active sensor, Amber for recalculation needed, Emerald for solved).

### Numeric Telemetry Inputs
- Dark-recessed input boxes (`rgba(2, 6, 23, 0.75)`) featuring monospaced numeric values.
- Right-aligned measurement units (`kts`, `deg`, `rad`, `m/s²`) set in `#64748B`.
- Focused state applies an immediate `#38BDF8` 1px border highlight and vector-projected line preview on the flight radar canvas.

### Step Badges & Quest Indicators
- Monospace step indicators (`01/04`, `V_AIR`, `WIND_COMP`).
- Pending state: Muted slate border. Active: Amber Gold (`#FBBF24`) pulse border. Complete: Solid Emerald (`#10B981`) text with checkmark glyph.

### Glowing Vector Calipers (Interactive HUD Component)
- On-canvas handles for dragging resultant flight vectors. 
- Circular touch points (12px outer ring, 4px solid core) matching the vector's semantic role (Cyan for Airspeed, Amber for Wind, Emerald for Ground Track) emitting continuous subtle glow animations.