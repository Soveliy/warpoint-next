import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../lib/site';
import ListingPageShell, { ListingHero } from '../../components/site/ListingPageShell';
import QuestionsPage from '../../components/site/QuestionsPage';
import ListingLead from '../../components/site/ListingLead';

export async function generateMetadata() {
  const site = await getSite();
  return site ? metadataFor(site, `Часто задаваемые вопросы — WARPOINT ${site.city}`, 'Ответы на вопросы о VR-играх, записи и праздниках в WARPOINT.', '/faq/') : {};
}

export default async function FaqPage() {
  const site = await getSite();
  if (!site) notFound();
  return <ListingPageShell site={site}>
    <div className="questions-page">
      <ListingHero title="Часто задаваемые" accent="вопросы" crumb="Вопросы и ответы" description={<>Собрали ответы на то, что чаще всего<br />спрашивают перед первым визитом</>} />
      <QuestionsPage />
      <ListingLead site={site} title="Не нашли ответ" accent="на свой вопрос?" description={<>Оставьте заявку, и наш менеджер свяжется<br />с вами для подробной консультации</>} />
    </div>
  </ListingPageShell>;
}
