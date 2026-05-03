# TheDailyPulse - Premium Apple News Clone

A full-stack enterprise-level publishing platform frontend, meticulously designed to mirror the Apple News reading experience, injected with a vibrant, modern color palette.

## Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing**: React Router DOM v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Fetching**: Axios

## Color Palette & Theming
All colors are strictly defined in `src/config/constants.js` and injected into the Tailwind `@theme` directive in `index.css`. No hardcoding exists in the components.

- **Orange/Red** (`#E43D12`): Primary brand color, headers, text.
- **Magenta** (`#D6536D`): Category tags, hover states.
- **Light Pink** (`#FFA2B6`): Accents.
- **Gold** (`#EFB11D`): Premium accents, categories in Hero sections.
- **Beige/Off-White** (`#EBE9E1`): Primary application background.
- **Charcoal/Black** (`#111111`): Dark text elements for high contrast.

## Typography
- **Primary Body/UI**: Apple System Fonts (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`). Ensures absolute native feel on all devices.
- **Display Typography**: `"Arial Black", "Impact", sans-serif`. Used for massive, iconic, bold headlines overlaid on hero images.

## Architecture & Data Flow
- **Environment Variables**: `.env` is used to configure `VITE_API_URL`.
- **Zero Hardcoding Policy**: All mock data, fallback image URLs, branding strings, and UI constants are isolated in `constants.js`.
- **Real APIs with Fallbacks**: `api.js` makes actual Axios calls to the backend. If the backend is unreachable or throws a network error, components like `Home.jsx` gracefully catch the error and fallback to rendering `DUMMY_NOTICES` from the constants.
- **Mobile First**: All CSS grids, horizontal scrolling sections, and overlays are built to be flawlessly fluid down to `320px` width.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (already included) with:
```env
VITE_API_URL=http://localhost:5000/api
```

3. Run the development server:
```bash
npm run dev
```

Enjoy reading on TheDailyPulse!
