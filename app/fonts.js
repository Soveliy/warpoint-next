import localFont from 'next/font/local';

export const interTight = localFont({
  src: [
    { path: '../public/resources/fonts/InterTight-VariableFont_wght.woff2', weight: '100 900', style: 'normal' },
    { path: '../public/resources/fonts/InterTight-Italic-VariableFont_wght.woff2', weight: '100 900', style: 'italic' },
  ],
  variable: '--font-inter-tight',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial',
});

export const oceanic = localFont({
  src: '../public/resources/fonts/OceanicGroteskCondensed-Extrabold.woff2',
  weight: '800',
  style: 'normal',
  variable: '--font-oceanic',
  // Keep the much wider system fallback out of the first heading paint.
  display: 'block',
  preload: true,
  adjustFontFallback: 'Arial',
});

export const robotoFlex = localFont({
  src: '../public/resources/fonts/RobotoFlex.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-roboto-flex',
  display: 'block',
  preload: true,
  adjustFontFallback: 'Arial',
});
