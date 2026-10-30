import Preloader from './Preloader';
import Header from './Header';
import CorporateHeroEvent from './CorporateHeroEvent';
import CorporateVideoSection from './CorporateVideoSection';
import CorporateAboutGameGroup from './CorporateAboutGameGroup';
import CorporateImmersiveShowcase from './CorporateImmersiveShowcase';
import CorporateGallery from './CorporateGallery';
import EventAddons from './EventAddons';
import CorporateEventProgram from './CorporateEventProgram';
import Zones from './Zones';
import CorporateMobileArena from './CorporateMobileArena';
import CorporateEventTariffs from './CorporateEventTariffs';
import TariffModal from './TariffModal';
import GamesGroup from './GamesGroup';
import Reviews from './Reviews';
import Faq from './Faq';
import Contacts from './Contacts';
import Footer from './Footer';
import EventModal from './EventModal';
import EventRequestModal from './EventRequestModal';
import AuthModal from './AuthModal';
import MobileActions from './MobileActions';
import GameModal from './GameModal';
import CookieNotice from './CookieNotice';

export default function CorporateSections({ site }) {
  return (
    <>
      <Preloader site={site} />
      <Header site={site} />
      <main className="main">
        <CorporateHeroEvent site={site} />
        <CorporateVideoSection site={site} />
        <CorporateAboutGameGroup site={site} />
        <CorporateImmersiveShowcase site={site} />
        <CorporateGallery site={site} />
        <EventAddons eventType="corporate" />
        <CorporateEventProgram site={site} />
        <Zones site={site} />
        <CorporateMobileArena site={site} />
        <CorporateEventTariffs site={site} />
        <TariffModal site={site} />
        <GamesGroup site={site} />
        <Reviews site={site} />
        <Faq site={site} />
        <Contacts site={site} />
      </main>
      <Footer site={site} />
      <EventModal site={site} />
      <EventRequestModal eventType="corporate" />
      <AuthModal site={site} />
      <MobileActions site={site} />
      <GameModal site={site} />
      <CookieNotice site={site} />
    </>
  );
}
