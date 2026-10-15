export const CHART_WIDTH = 1280;
export const MAX_CHART_ZOOM = 200;

const midpoint = points => ({ x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 });
const distance = points => Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);

export function startPinch(points, { width, scrollLeft, scrollTop }) {
  const separation = distance(points);
  if (!separation || !width) return null;
  const center = midpoint(points);
  return { separation, width, anchorX: (scrollLeft + center.x) / width, anchorY: (scrollTop + center.y) / width };
}

export function updatePinch(start, points, viewportWidth, { baseWidth = CHART_WIDTH, minZoom = 50, maxZoom = MAX_CHART_ZOOM } = {}) {
  const center = midpoint(points);
  const minimum = Math.min(minZoom, viewportWidth / baseWidth * 100);
  const zoom = Math.max(minimum, Math.min(maxZoom, start.width * distance(points) / start.separation / baseWidth * 100));
  const width = baseWidth * zoom / 100;
  return { zoom, width, scrollLeft: start.anchorX * width - center.x, scrollTop: start.anchorY * width - center.y };
}
