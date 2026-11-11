const project = ([latitude, longitude]) => {
  const angle = (Math.max(-85.0511, Math.min(85.0511, latitude)) * Math.PI) / 180;
  return [
    (longitude + 180) / 360,
    (1 - Math.log(Math.tan(angle) + 1 / Math.cos(angle)) / Math.PI) / 2,
  ];
};

export function mapView(points, width = 640, height = 480) {
  const projected = points.map((point) => project(point.coordinates));
  if (!projected.length) return null;
  const xs = projected.map((point) => point[0]),
    ys = projected.map((point) => point[1]);
  const minX = Math.min(...xs),
    maxX = Math.max(...xs),
    minY = Math.min(...ys),
    maxY = Math.max(...ys);
  const centerX = (minX + maxX) / 2,
    centerY = (minY + maxY) / 2;
  const zoom =
    projected.length === 1
      ? 16
      : Math.max(
          2,
          Math.min(
            16,
            Math.floor(
              Math.log2(
                Math.min(
                  Math.max(80, width - 160) / (Math.max(maxX - minX, 1e-8) * 256),
                  Math.max(80, height - 180) / (Math.max(maxY - minY, 1e-8) * 256),
                ),
              ),
            ),
          ),
        );
  const scale = 256 * 2 ** zoom;
  return {
    center: [
      (Math.atan(Math.sinh(Math.PI * (1 - 2 * centerY))) * 180) / Math.PI,
      centerX * 360 - 180,
    ],
    zoom,
    pins: projected.map(([x, y]) => ({
      left: width / 2 + (x - centerX) * scale,
      top: height / 2 + (y - centerY) * scale,
    })),
  };
}
