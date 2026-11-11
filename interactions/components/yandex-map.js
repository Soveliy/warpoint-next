import { mapView } from '../../lib/map-view';
const instances = new WeakMap();
const fallbackObservers = new WeakMap();
const requests = new WeakMap();

// New map components can use their own BEM block; existing home/event maps
// keep their original classes and behavior.
const mapClasses = (map) => {
  const block = map.dataset.mapBlock;
  return {
    frame: block ? block + '__frame' : 'contacts__map-frame',
    pin: block ? block + '__pin' : 'contacts__map-pin',
    canvas: block ? block + '__canvas' : 'contacts__map-canvas',
    loaded: block ? block + '--loaded' : 'is-loaded',
    api: block ? block + '--api' : 'is-api-map',
  };
};
const mapPoints = (map) => {
  try {
    const points = JSON.parse(map.dataset.mapPoints || '[]');
    const valid = points.filter(
      (point) => point.coordinates?.length === 2 && point.coordinates.every(Number.isFinite),
    );
    if (valid.length) return valid;
  } catch {
    /* Use the individual location below. */
  }
  return [
    { coordinates: map.dataset.mapCoordinates.split(',').map(Number), title: map.dataset.mapTitle },
  ];
};

const renderPins = (ymaps, instance, map) => {
  instance.geoObjects.removeAll();
  const points = mapPoints(map);
  points.forEach((point) =>
    instance.geoObjects.add(
      new ymaps.Placemark(
        point.coordinates,
        { hintContent: point.title },
        {
          iconLayout: 'default#image',
          iconImageHref: new URL('/img/map-pin.svg', window.location.origin).href,
          iconImageSize: [80, 104],
          iconImageOffset: [-40, -97],
          hasBalloon: false,
          openBalloonOnClick: false,
        },
      ),
    ),
  );
  if (points.length > 1)
    instance.setBounds(instance.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin: 80 });
  else instance.setCenter(points[0].coordinates, 16);
};

let apiPromise;

const loadYandexApi = () => {
  if (apiPromise) return apiPromise;
  const key = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY?.trim();
  if (!key) return Promise.reject(new Error('Yandex Maps API key is not configured'));

  apiPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const timeout = window.setTimeout(() => reject(new Error('Yandex Maps API timeout')), 15000);
    const finish = (error) => {
      window.clearTimeout(timeout);
      if (error) reject(error);
      else resolve(window.ymaps);
    };
    script.async = true;
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=' + encodeURIComponent(key);
    script.onload = () => {
      if (window.ymaps) window.ymaps.ready(() => finish(), finish);
      else finish(new Error('Yandex Maps API is unavailable'));
    };
    script.onerror = () => finish(new Error('Yandex Maps API failed to load'));
    document.head.append(script);
  });
  return apiPromise;
};

const setLoaded = (map) => {
  map.classList.add(mapClasses(map).loaded);
  map.setAttribute('aria-busy', 'false');
  const status = map.querySelector('[data-map-status]');
  if (status) status.textContent = 'Карта загружена';
};

const createMapFrame = (map) => {
  const frame = document.createElement('iframe');
  frame.className = mapClasses(map).frame;
  frame.title = map.dataset.mapTitle || 'Карта проезда';
  frame.loading = 'lazy';
  frame.referrerPolicy = 'no-referrer-when-downgrade';
  frame.allowFullscreen = true;
  frame.addEventListener(
    'load',
    () => {
      if (frame.isConnected) setLoaded(map);
    },
    { once: true },
  );
  const points = mapPoints(map);
  map.dataset.mapMultiple = String(points.length > 1);
  const updateFrame = () => {
    if (!frame.isConnected) return;
    const view = mapView(points, map.clientWidth || 640, map.clientHeight || 480);
    const url = new URL('https://yandex.ru/map-widget/v1/');
    url.search = new URLSearchParams({
      ll: view.center[1] + ',' + view.center[0],
      z: String(view.zoom),
    });
    if (frame.src !== url.href) frame.src = url.href;
    map.querySelectorAll('[data-map-fallback-pin]').forEach((pin) => pin.remove());
    if (points.length > 1)
      view.pins.forEach((position, index) => {
        const pin = document.createElement('span');
        pin.className = mapClasses(map).pin;
        pin.dataset.mapFallbackPin = '';
        pin.setAttribute('aria-hidden', 'true');
        pin.title = points[index].title;
        pin.style.left = position.left + 'px';
        pin.style.top = position.top + 'px';
        map.append(pin);
      });
  };
  map.append(frame);
  updateFrame();
  fallbackObservers.get(map)?.disconnect();
  const observer = new ResizeObserver(updateFrame);
  observer.observe(map);
  fallbackObservers.set(map, observer);
};

const createMap = async (map) => {
  if (!map.isConnected || map.dataset.mapLoaded === 'true') return;
  map.dataset.mapLoaded = 'true';
  const request = {};
  requests.set(map, request);
  const isCurrent = () => map.isConnected && requests.get(map) === request;
  let canvas;
  let instance;

  try {
    const ymaps = await loadYandexApi();
    if (!isCurrent()) return;
    // Read after API loading: the user may have changed the location meanwhile.
    const coordinates = map.dataset.mapCoordinates.split(',').map(Number);
    canvas = document.createElement('div');
    canvas.className = mapClasses(map).canvas;
    canvas.setAttribute('role', 'region');
    canvas.setAttribute('aria-label', map.dataset.mapTitle);
    map.append(canvas);
    instance = new ymaps.Map(
      canvas,
      {
        center: coordinates,
        zoom: 16,
        controls: ['zoomControl'],
        behaviors: ['drag', 'dblClickZoom', 'multiTouch'],
      },
      {
        yandexMapDisablePoiInteractivity: true,
        suppressMapOpenBlock: true,
      },
    );
    renderPins(ymaps, instance, map);
    instances.set(map, { instance, ymaps, canvas });
    map.classList.add(mapClasses(map).api);
    setLoaded(map);
  } catch {
    if (!isCurrent()) return;
    instance?.destroy();
    canvas?.remove();
    map.classList.remove(mapClasses(map).api);
    if (map.isConnected) createMapFrame(map);
  }
};

export function updateYandexMap(map, { coordinates, title, points }) {
  if (!map || !coordinates) return;
  const pointsJson = JSON.stringify(points || []);
  const changed =
    map.dataset.mapCoordinates !== coordinates.join(',') ||
    (map.dataset.mapPoints || '[]') !== pointsJson;
  map.dataset.mapPoints = pointsJson;
  map.dataset.mapCoordinates = coordinates.join(',');
  map.dataset.mapTitle = title;
  const openLink = map.querySelector('[data-map-open]');
  if (openLink) openLink.setAttribute('aria-label', `Открыть карту: ${title}`);
  const point = coordinates[1] + ',' + coordinates[0];
  // The fallback widget has no native marker; the branded pin is overlaid by CSS.
  const source = new URL('https://yandex.ru/map-widget/v1/');
  source.search = new URLSearchParams({ ll: point, z: '16' });
  map.dataset.mapSrc = source.href;

  const current = instances.get(map);
  if (current) {
    current.canvas.setAttribute('aria-label', title);
    if (changed) {
      renderPins(current.ymaps, current.instance, map);
    }
    return;
  }

  const frame = map.querySelector(':scope > .' + mapClasses(map).frame);
  if (frame) {
    frame.title = title;
    if (changed) {
      map.classList.remove(mapClasses(map).loaded);
      map.setAttribute('aria-busy', 'true');
      const status = map.querySelector('[data-map-status]');
      if (status) status.textContent = 'Карта загружается';
      frame.remove();
      createMapFrame(map);
    }
  }
}

export function destroyYandexMap(map) {
  const current = instances.get(map);
  current?.instance.destroy();
  instances.delete(map);
  fallbackObservers.get(map)?.disconnect();
  fallbackObservers.delete(map);
  map.querySelectorAll('[data-map-fallback-pin]').forEach((pin) => pin.remove());
  requests.delete(map);
  const classes = mapClasses(map);
  map.querySelector(':scope > .' + classes.frame)?.remove();
  map.querySelector(':scope > .' + classes.canvas)?.remove();
  map.classList.remove(classes.loaded, classes.api);
  map.removeAttribute('data-map-loaded');
  map.setAttribute('aria-busy', 'true');
}

export function initYandexMaps(maps = document.querySelectorAll('[data-yandex-map]')) {
  if (!maps.length) return;
  if (!('IntersectionObserver' in window)) {
    maps.forEach(createMap);
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        createMap(entry.target);
      });
    },
    { rootMargin: '300px 0px' },
  );
  maps.forEach((map) => observer.observe(map));
  return () => observer.disconnect();
}
