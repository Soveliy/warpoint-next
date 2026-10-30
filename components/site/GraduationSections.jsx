import Preloader from './Preloader';
import Header from './Header';
import GraduationHeroEvent from './GraduationHeroEvent';
import GraduationVideoSection from './GraduationVideoSection';
import GraduationAboutGameGroup from './GraduationAboutGameGroup';
import GraduationGallery from './GraduationGallery';
import EventAddons from './EventAddons';
import GraduationEventProgram from './GraduationEventProgram';
import Zones from './Zones';
import ProgramPicker from './ProgramPicker';
import GraduationEventTariffs from './GraduationEventTariffs';
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

export default function GraduationSections({ site }) {
  return (
    <>
      <Preloader site={site} />
      <Header site={site} />
      <main className="main">
        <GraduationHeroEvent site={site} />
        <GraduationVideoSection site={site} />
        <GraduationAboutGameGroup site={site} />
        <GraduationGallery site={site} />
        <EventAddons eventType="graduation" />
        <GraduationEventProgram site={site} />
        <Zones site={site} />
        <ProgramPicker site={site} />
        <GraduationEventTariffs site={site} />
        <TariffModal site={site} />
        <GamesGroup site={site} />
        <Reviews site={site} />
        <Faq site={site} />
        <Contacts site={site} />
      </main>
      <Footer site={site} />
      <EventModal site={site} />
      <EventRequestModal eventType="graduation" />
      <AuthModal site={site} />
      <MobileActions site={site} />
      <GameModal site={site} />
      <CookieNotice site={site} />
    </>
  );
}
