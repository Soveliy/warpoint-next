import SiteLocationProvider from './SiteLocationProvider';
import Header from './Header';
import Footer from './Footer';
import AuthModal from './AuthModal';
import GameModal from './GameModal';
import CookieNotice from './CookieNotice';
import SiteBehaviors from '../SiteBehaviors';
import BookingPanel from './BookingPanel';
import LocationModal from './LocationModal';

export default function ListingPageShell({ site, children, gameModal = false }) {
  return (
    <SiteLocationProvider site={site}>
      <Header site={site} />
      <main className="main listing-page" data-header-theme="brand">
        {children}
      </main>
      <Footer site={site} />
      <AuthModal site={site} />
      {gameModal && <GameModal />}
      <CookieNotice site={site} />
      <LocationModal site={site} />
      <BookingPanel site={site} />
      <SiteBehaviors site={site} />
    </SiteLocationProvider>
  );
}
