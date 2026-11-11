import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Scope the gradual cleanup to the new content pages. Existing home/event
// components can use the same root Prettier config when they are edited.
const targets = [
  'app/page.jsx',
  'app/{articles,games,tariffs,faq,promotions,legal,locations,contacts}/**/page.jsx',
  'app/events/page.jsx',
  'lib/legal-*.json',
  'lib/legal-pages.js',
  'components/SiteDirectory.jsx',
  'components/site/useContactLocation.js',
  'interactions/components/yandex-map.js',
  'app/sitemap.xml/route.js',
  'components/site/{Article*,RelatedArticles,BirthdayArticleContent,ArticlesListing,GamesListing,GamesFilters,GameCard,TariffsListing,TariffCard,TariffDetail,TariffPriceBox,PromotionsListing,PromotionCard,PromotionDialog,AnnouncementsListing,AnnouncementCard,AnnouncementDialog,QuestionsPage,QuestionItem,PrivacyPolicy,Listing*,SiteContentDialog,HomePageLinks,ContactIcon,ContactChannels,ContactLocations,ContactLocationCard,ContactBusiness,LocationMap}.jsx',
  'lib/{articles,article-details,article-previews,catalog-data,catalog-filters,promotions,announcements,questions,page-links,contacts-data}.js',
  'styles/main.scss',
  'styles/base/_scrollbar.scss',
  'app/bridge.css',
  'styles/components/_{home-page-links,site-directory,listing-*,games-listing,tariffs-listing,articles-list,article-*,privacy-page,questions-page,contacts-page,contact-*,location-map,promotions,announcements,site-content-dialog}.scss',
  'components/site/{useFormValidation,CallbackForm,FormError,EventRequestFields,BookingPanel,BookingFrame,EventModal,EventRequestModal,ProgramPicker,AuthModal,Faq}.{jsx,js}',
  'lib/{form-validation,phone,booking-widget}.js',
  'interactions/{_components,components/phone-mask}.js',
  'styles/components/_{form-checkbox,form-validation,booking-frame}.scss',
  'styles/mixins/_checkbox.scss',
  'tests/{form-validation,booking-widget}.test.mjs',
  'tests/{site-selection,pagination,map-view}.test.mjs',
  'lib/{location-selection,pagination,map-view}.js',
  'components/site/{SiteLocationProvider,SelectedLocationFields,LocationSelection,Contacts,HomeContacts,EventHeroFooter}.jsx',
  'styles/components/_location-selection.scss',
  'components/site/{AboutGameVisual,BirthdayAboutGameGroup,CorporateAboutGameGroup,GraduationAboutGameGroup}.jsx',
  'lib/event-about-game.js',
  'lib/event-media.js',
  'lib/event-addons.js',
  'lib/games.js',
  'interactions/data/games.js',
  'components/site/{HomeGamesGroup,GamesGroup,GameCarouselCard,GameModal}.jsx',
  'tests/catalog-games.test.mjs',
  'components/site/{EventAddons,BirthdayGallery,CorporateGallery,GraduationGallery,AdultBirthdayGallery,BirthdayVideoSection,CorporateVideoSection,GraduationVideoSection}.jsx',
  'styles/components/_{gallery,event-addons,program-picker,booking-panel,footer,mobile-actions,contact-location-detail,contacts-page}.scss',
  'components/site/{CorporateHeroEvent,CorporateMobileArena,Footer,MobileActions}.jsx',
  'components/site/{ContactParking,ContactLocationDetail}.jsx',
  'styles/components/_{hero-event,adult-birthday,site-notices}.scss',
  'interactions/components/about-game-sequence.js',
  'components/site/{Zones,HomeZones,BirthdayZones,ZoneLocations}.jsx',
  'components/site/{EventHeroPrice,EventTariffLocation,ContactsCityList,ContactsLocationDialog}.jsx',
  'lib/zones.js',
  'styles/components/_zones.scss',
  'tests/zones.test.mjs',
  'lib/{site-content,site-tariffs,erp-sites,erp-site-transport,event-site-content}.js',
  'components/site/{EventApiTariffs,EventPriceValue}.jsx',
  'tests/{site-tariffs,erp-sites,event-site-content}.test.mjs',
  'components/site/{GoodPlaceBadge,ReviewScore}.jsx',
  'tests/site-content.test.mjs',
  'scripts/format-pages.mjs',
];
const mode = process.argv.includes('--check') ? '--check' : '--write';
const prettier = fileURLToPath(
  new URL('../node_modules/prettier/bin/prettier.cjs', import.meta.url),
);
const result = spawnSync(process.execPath, [prettier, mode, ...targets], {
  cwd: fileURLToPath(new URL('..', import.meta.url)),
  stdio: 'inherit',
});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
