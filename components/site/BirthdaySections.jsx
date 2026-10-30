import Preloader from './Preloader';
import Header from './Header';
import BirthdayHeroEvent from './BirthdayHeroEvent';
import BirthdayVideoSection from './BirthdayVideoSection';
import BirthdayAboutGameGroup from './BirthdayAboutGameGroup';
import BirthdayGallery from './BirthdayGallery';
import ProgramPicker from './ProgramPicker';
import EventAddons from './EventAddons';
import BirthdayEventProgram from './BirthdayEventProgram';
import BirthdayEventSafety from './BirthdayEventSafety';
import BirthdayZones from './BirthdayZones';
import BirthdayEventTariffs from './BirthdayEventTariffs';
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

export default function BirthdaySections({ site }) {
  return (
    <>
      <Preloader site={site} />
      <Header site={site} />
      <main className="main">
        <BirthdayHeroEvent site={site} />
        <BirthdayVideoSection site={site} />
        <BirthdayAboutGameGroup site={site} />
        <BirthdayGallery site={site} />
        <ProgramPicker site={site} />
        <EventAddons eventType="birthday" />
        <BirthdayEventProgram site={site} />
        <BirthdayEventSafety site={site} />
        <BirthdayZones site={site} />
        <BirthdayEventTariffs site={site} />
        <TariffModal site={site} />
        <GamesGroup site={site} />
        <Reviews site={site} />
        <Faq site={site} />
        <Contacts site={site} />
      </main>
      <Footer site={site} />
      <EventModal site={site} />
      <EventRequestModal eventType="birthday" />
      <AuthModal site={site} />
      <MobileActions site={site} />
      <GameModal site={site} />
      <CookieNotice site={site} />
    </>
  );
}
