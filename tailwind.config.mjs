/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Spec requirements:
        // Background: #ffffff / Surface: #f8fafc / Border: #e2e8f0
        // Primary: #2563eb / Heading: #0f172a / Body: #334155
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // Master Brand Color
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        surface: {
          bg: '#ffffff',
          subtle: '#f8fafc', // Auxiliary bg
          card: '#ffffff',
          border: '#e2e8f0', // Card border
          hover: '#f1f5f9',
          muted: '#f8fafc',
          dark: '#0f172a',
        },
        ink: {
          heading: '#0f172a', // Deep heading text
          body: '#334155',    // Body text (contrast > 9.5:1 on #ffffff)
          muted: '#64748b',
          faint: '#94a3b8',
        },
        accent: {
          gold: '#d97706',
          emerald: '#059669',
          rose: '#e11d48',
          cyan: '#0891b2',
          purple: '#7c3aed',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Noto Sans SC"',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      lineHeight: {
        relaxed7: '1.85',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover': '0 10px 25px -5px rgb(0 0 0 / 0.06), 0 8px 10px -6px rgb(0 0 0 / 0.04)',
        'glow-brand': '0 0 20px -3px rgba(37, 99, 235, 0.25)',
      }
    },
  },
  plugins: [],
};
