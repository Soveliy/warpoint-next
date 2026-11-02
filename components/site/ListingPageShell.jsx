import Header from './Header';
import Footer from './Footer';
import AuthModal from './AuthModal';
import GameModal from './GameModal';
import CookieNotice from './CookieNotice';
import SiteBehaviors from '../SiteBehaviors';
import BookingPanel from './BookingPanel';
import LocationModal from './LocationModal';

export function ListingHero({ title, accent, description, crumb, className = '', parents = [] }) {
  return <section className={`listing-hero ${className}`} data-header-theme="brand">
    <div className='listing-hero__wrap'>
      <div className="container">
        <nav className="listing-hero__breadcrumbs" aria-label="Навигационная цепочка"><a href="/indexpage/">Главная</a>{parents.map((item) => <span className="listing-hero__parent" key={item.title}><span aria-hidden="true">/</span><a href={item.href}>{item.title}</a></span>)}<span aria-hidden="true">/</span><span aria-current="page">{crumb}</span></nav>
        <h1>{title} <span>{accent}</span></h1>
        <p>{description}</p>
      </div>
    </div>
  </section>;
}

export default function ListingPageShell({ site, children, gameModal = false }) {
  return <>
    <Header site={site} />
    <main className="main listing-page" data-header-theme="brand">{children}</main>
    <Footer site={site} />
    <AuthModal site={site} />
    {gameModal && <GameModal />}
    <CookieNotice site={site} />
    <LocationModal site={site} />
    <BookingPanel site={site} />
    <SiteBehaviors site={site} />
  </>;
}
