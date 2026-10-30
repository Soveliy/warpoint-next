import BodyPageClass from './BodyPageClass';
import SiteBehaviors from './SiteBehaviors';
import HomeSections from './site/HomeSections';
import BirthdaySections from './site/BirthdaySections';
import CorporateSections from './site/CorporateSections';
import GraduationSections from './site/GraduationSections';
import BookingPanel from './site/BookingPanel';
import LocationModal from './site/LocationModal';

const pages = {
  home: HomeSections,
  birthday: BirthdaySections,
  corporate: CorporateSections,
  graduation: GraduationSections,
};

export default function SitePage({ page, site, event = false }) {
  const Sections = pages[page];
  if (!Sections) throw new Error(`Unknown page: ${page}`);

  return (
    <>
      <BodyPageClass event={event} />
      <Sections site={site} />
      <LocationModal site={site} />
      <BookingPanel site={site} />
      <SiteBehaviors site={site} />
    </>
  );
}
