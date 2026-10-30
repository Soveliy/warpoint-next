import Preloader from './Preloader';
import Header from './Header';
import HomeHero from './HomeHero';
import HomeVideoSection from './HomeVideoSection';
import HomeAboutGameGroup from './HomeAboutGameGroup';
import HomeZones from './HomeZones';
import HomeEvents from './HomeEvents';
import HomeGallery from './HomeGallery';
import HomeGamesGroup from './HomeGamesGroup';
import Reviews from './Reviews';
import HomeBloggers from './HomeBloggers';
import Faq from './Faq';
import HomeExtras from './HomeExtras';
import Contacts from './Contacts';
import Footer from './Footer';
import EventModal from './EventModal';
import AuthModal from './AuthModal';
import MobileActions from './MobileActions';
import GameModal from './GameModal';
import CookieNotice from './CookieNotice';

export default function HomeSections({ site }) {
  return (
    <>
      <Preloader site={site} />
      <Header site={site} />
      <main className="main">
        <HomeHero site={site} />
        <HomeVideoSection site={site} />
        <HomeAboutGameGroup site={site} />
        <HomeZones site={site} />
        <HomeEvents site={site} />
        <HomeGallery site={site} />
        <HomeGamesGroup site={site} />
        <Reviews site={site} />
        <HomeBloggers site={site} />
        <Faq site={site} />
        <HomeExtras site={site} />
        <Contacts site={site} />
      </main>
      <Footer site={site} />
      <EventModal site={site} />
      <AuthModal site={site} />
      <MobileActions site={site} />
      <GameModal site={site} />
      <CookieNotice site={site} />
    </>
  );
}
