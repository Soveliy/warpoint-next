import cookies from './legal-cookies.json';
import agreement from './legal-agreement.json';
import certificates from './legal-certificates.json';
import bonuses from './legal-bonuses.json';

export const legalDocuments = {
  cookies: {
    title: 'Политика',
    accent: 'использования файлов cookie',
    name: 'Политика использования файлов cookie',
    description: 'Использование файлов cookie и веб-маяков на сайте WARPOINT.',
    policy: cookies,
  },
  agreement: {
    title: 'Пользовательское',
    accent: 'соглашение',
    name: 'Пользовательское соглашение',
    description: 'Условия использования сайта и услуг WARPOINT.',
    policy: agreement,
  },
  certificates: {
    title: 'Правила использования',
    accent: 'сертификатов',
    name: 'Правила использования подарочных сертификатов WARPOINT',
    description:
      'Приобретение и использование подарочных сертификатов WARPOINT. Редакция от 01.01.2026.',
    policy: certificates,
  },
  bonuses: {
    title: 'Правила бонусной',
    accent: 'программы',
    name: 'Правила бонусной программы WARPOINT',
    description:
      'Условия участия в бонусной программе WARPOINT на территории Российской Федерации.',
    policy: bonuses,
  },
};
