import Preloader from './Preloader';
import Header from './Header';
import AdultBirthdayHero from './AdultBirthdayHero';
import CorporateVideoSection from './CorporateVideoSection';
import CorporateAboutGameGroup from './CorporateAboutGameGroup';
import CorporateImmersiveShowcase from './CorporateImmersiveShowcase';
import AdultBirthdayGallery from './AdultBirthdayGallery';
import EventAddons from './EventAddons';
import AdultBirthdayProgram from './AdultBirthdayProgram';
import Zones from './Zones';
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

export default function AdultBirthdaySections({ site }) {
  return (
    <>
      <Preloader site={site} />
      <Header site={site} />
      <main className="main main--adult-birthday">
        <AdultBirthdayHero site={site} />
        <CorporateVideoSection site={site} adult />
        <CorporateAboutGameGroup site={site} adult />
        <CorporateImmersiveShowcase site={site} />
        <AdultBirthdayGallery />
        <EventAddons eventType="adult-birthday" />
        <AdultBirthdayProgram />
        <Zones site={site} />
        <CorporateEventTariffs site={site} title="день рождения" context="adult-birthday" />
        <TariffModal site={site} />
        <GamesGroup site={site} />
        <Reviews site={site} />
        <Faq site={site} />
        <Contacts site={site} />
      </main>
      <Footer site={site} />
      <EventModal site={site} defaultEventType="adult-birthday" />
      <EventRequestModal eventType="adult-birthday" />
      <AuthModal site={site} />
      <MobileActions site={site} />
      <GameModal site={site} />
      <CookieNotice site={site} />
    </>
  );
}
