import assert from 'node:assert/strict';
import test from 'node:test';
import {
  bookingWidgetLocationIndex,
  bookingWidgetMessage,
  bookingWidgetUrl,
} from '../lib/booking-widget.js';

const origin = 'https://booking.example.com';
const source = {};
const instanceId = 'instance-one';
const context = { origin, source, instanceId };
const payload = {
  preview: true,
  city: 'Екатеринбург',
  countryId: 'ru',
  arena: { index: 0, title: 'Парк', address: 'Улица, 1' },
  format: 'arena',
  tariff: 'open-game',
  date: '2026-11-10',
  time: '14:00',
  participants: 2,
  total: 2000,
  deposit: 200,
  contacts: {
    name: 'Алексей',
    phone: '+7 (912) 345-67-89',
    email: '',
    consent: true,
    agreement: true,
    newsletter: false,
  },
  payment: 'card',
};

const message = (type, value) => ({
  origin,
  source,
  data: { source: 'warpoint-booking', version: 1, instanceId, type, payload: value },
});

test('the iframe URL contains public context only and supports a missing location', () => {
  const url = bookingWidgetUrl(`${origin}/embed/?phone=discarded#fragment`, {
    hostname: 'warpoint.ru',
    locationId: '',
    location: null,
    parentOrigin: 'https://warpoint.ru',
    instanceId,
    phone: 'not-for-the-url',
  });
  assert.equal(url.pathname, '/embed/');
  assert.equal(url.hash, '');
  assert.deepEqual(Object.fromEntries(url.searchParams), {
    site: 'warpoint.ru',
    locationId: '',
    locationTitle: '',
    locationAddress: '',
    parentOrigin: 'https://warpoint.ru',
    instanceId,
  });
});

test('selected location data is URL encoded without adding contact information', () => {
  const url = bookingWidgetUrl('http://localhost:3004/', {
    hostname: 'kursk.warpoint.ru',
    locationId: 'erp-2',
    location: { title: 'ТРЦ «Парк»', address: 'Улица & площадь, 1' },
    parentOrigin: 'http://localhost:3002',
    instanceId,
  });
  assert.equal(url.searchParams.get('locationTitle'), 'ТРЦ «Парк»');
  assert.equal(url.searchParams.get('locationAddress'), 'Улица & площадь, 1');
  assert.equal(url.searchParams.get('locationId'), 'erp-2');
});

test('missing, unsafe, credentialed and mixed-content widget URLs are rejected', () => {
  const data = { hostname: 'warpoint.ru', parentOrigin: 'https://warpoint.ru', instanceId };
  for (const value of [
    '',
    'javascript:alert(1)',
    'https://user:pass@example.com',
    'http://example.com',
  ])
    assert.equal(bookingWidgetUrl(value, data), null);
  assert.equal(
    bookingWidgetUrl(origin, { ...data, parentOrigin: 'https://warpoint.ru/path' }),
    null,
  );
});

test('messages require the exact origin, iframe window, protocol and current instance', () => {
  const event = message('ready');
  assert.equal(bookingWidgetMessage(event, context), event.data);
  for (const change of [
    { origin: 'https://booking.example.com.attacker.test' },
    { origin: 'http://booking.example.com' },
    { source: {} },
    { source: null },
    { data: null },
    { data: [] },
    { data: { ...event.data, source: 'other-widget' } },
    { data: { ...event.data, version: '1' } },
    { data: { ...event.data, instanceId: 'previous-instance' } },
    { data: { ...event.data, type: 'unknown' } },
  ])
    assert.equal(bookingWidgetMessage({ ...event, ...change }, context), null);
});

test('only a complete preview result can become the existing booking event payload', () => {
  assert.equal(bookingWidgetMessage(message('result', payload), context).payload, payload);
  for (const invalid of [
    null,
    [],
    { ...payload, preview: false },
    { ...payload, contacts: null },
    { ...payload, total: Infinity },
    { ...payload, participants: 0 },
    { ...payload, deposit: 2001 },
    { ...payload, time: '25:00' },
    { ...payload, contacts: { ...payload.contacts, agreement: false } },
  ])
    assert.equal(bookingWidgetMessage(message('result', invalid), context), null);
});

test('location changes require a public location shape and an exact host and arena match', () => {
  const site = { hostname: 'warpoint.ru', arenas: [payload.arena] };
  const location = { hostname: site.hostname, title: 'Парк', address: 'Улица, 1' };
  assert.equal(
    bookingWidgetMessage(message('location-change', location), context).payload,
    location,
  );
  assert.equal(bookingWidgetLocationIndex(site, location), 0);
  assert.equal(
    bookingWidgetLocationIndex(site, { ...location, hostname: 'kursk.warpoint.ru' }),
    -1,
  );
  assert.equal(bookingWidgetLocationIndex(site, { ...location, address: 'Другой адрес' }), -1);
  assert.equal(
    bookingWidgetMessage(message('location-change', { hostname: site.hostname }), context),
    null,
  );
});

test('resize accepts only a bounded numeric height while close needs no payload', () => {
  assert.equal(bookingWidgetMessage(message('close'), context).type, 'close');
  assert.equal(bookingWidgetMessage(message('resize', { height: 865 }), context).type, 'resize');
  for (const height of ['865', 0, -1, Infinity, 10001])
    assert.equal(bookingWidgetMessage(message('resize', { height }), context), null);
});

test('stable arena IDs allow missing supplemental addresses and survive name/address changes', () => {
  const source = {};
  const context = { origin: 'https://booking.example', source, instanceId: 'new-api' };
  const data = {
    source: 'warpoint-booking',
    version: 1,
    instanceId: 'new-api',
    type: 'location-change',
    payload: {
      hostname: 'warpoint.ru',
      locationId: 'arena-uuid',
      arenaId: 'arena-uuid',
      title: 'Карнавал',
      address: null,
    },
  };
  const event = { origin: context.origin, source, data };
  assert.equal(bookingWidgetMessage(event, context), data);
  assert.equal(
    bookingWidgetLocationIndex(
      {
        hostname: 'warpoint.ru',
        arenas: [{ id: 'arena-uuid', title: 'Новое название', address: '' }],
      },
      data.payload,
    ),
    0,
  );
  assert.equal(
    bookingWidgetMessage(
      {
        ...event,
        data: { ...data, payload: { ...data.payload, arenaId: null, locationId: null } },
      },
      context,
    ),
    null,
  );
  const url = bookingWidgetUrl('https://booking.example/', {
    hostname: 'warpoint.ru',
    parentOrigin: 'https://site.example',
    instanceId: 'session',
    location: { id: 'arena-uuid', siteId: 'site-uuid' },
  });
  assert.equal(url.searchParams.get('arenaId'), 'arena-uuid');
  assert.equal(url.searchParams.get('siteId'), 'site-uuid');
});
