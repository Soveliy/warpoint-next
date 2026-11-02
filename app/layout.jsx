import Script from 'next/script';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import 'air-datepicker/air-datepicker.css';
import '../styles/main.scss';
import './bridge.css';
import { getSite } from '../lib/site';
import { secondaryFont } from '../lib/typography';
import { interTight, oceanic, robotoFlex } from './fonts';

export const metadata = {
  icons: { icon: '/img/favicon.svg' },
};

export default async function RootLayout({ children }) {
  const site = await getSite();
  return (
    <html lang="ru" className={`${interTight.variable} ${oceanic.variable} ${robotoFlex.variable} is-preloading`} data-secondary-font={secondaryFont} data-city={site?.city} data-country={site?.countryId} data-location={site?.arenas?.length ? 'erp-0' : undefined} data-location-confirmed={site?.arenas?.length ? 'true' : undefined}>
      <body className="page">
        {children}
        <Script id="preloader-fallback" strategy="beforeInteractive">
          {`window.setTimeout(function(){document.documentElement.classList.remove('is-preloading');var preloader=document.querySelector('[data-preloader]');if(preloader)preloader.hidden=true},8000)`}
        </Script>
      </body>
    </html>
  );
}
