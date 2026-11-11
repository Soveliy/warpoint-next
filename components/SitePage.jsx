import SiteLocationProvider from './site/SiteLocationProvider';
import BodyPageClass from './BodyPageClass';
import SiteBehaviors from './SiteBehaviors';
import HomeSections from './site/HomeSections';
import BirthdaySections from './site/BirthdaySections';
import CorporateSections from './site/CorporateSections';
import GraduationSections from './site/GraduationSections';
import AdultBirthdaySections from './site/AdultBirthdaySections';
import BookingPanel from './site/BookingPanel';
import LocationModal from './site/LocationModal';

const pages = {
  home: HomeSections,
  birthday: BirthdaySections,
  corporate: CorporateSections,
  graduation: GraduationSections,
  'adult-birthday': AdultBirthdaySections,
};

export default function SitePage({ page, site, event = false }) {
  const Sections = pages[page];
  if (!Sections) throw new Error(`Unknown page: ${page}`);

  return (
    <SiteLocationProvider site={site}>
      <BodyPageClass event={event} />
      <Sections site={site} />
      <LocationModal site={site} />
      <BookingPanel site={site} />
      <SiteBehaviors site={site} />
    </SiteLocationProvider>
  );
}
