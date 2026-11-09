import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  // Captured when this version is built, rather than showing each visitor's date.
  define: {
    'import.meta.env.VITE_STUDY_LAST_UPDATED': JSON.stringify(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())),
  },
  plugins: [react(), cloudflare()],
})
