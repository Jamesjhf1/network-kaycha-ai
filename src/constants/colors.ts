/** Shared color palette used across all views and components */
export const C = {
  warning: '#f59e0b',
  purple: '#a78bfa',
  pink: '#f472b6',
  green100g: '#34d399',
  cyan10g: '#38bdf8',
  accent: '#00d4ff',
  red: '#ef4444',
  blue: '#60a5fa',
  coloGreen: '#10b981',
  webPurple: '#8b5cf6',
  textDim: '#94a3b8',
  textBright: '#e2e8f0',
  panel: '#111827',
  border: '#1e293b',
  bg: '#0a0e17',
  orange: '#fb923c',
  teal: '#2dd4bf',
} as const

export type ColorKey = keyof typeof C
