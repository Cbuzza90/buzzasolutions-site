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

export function updatePinch(start, points, viewportWidth) {
  const center = midpoint(points);
  const minimum = Math.min(50, viewportWidth / CHART_WIDTH * 100);
  const zoom = Math.max(minimum, Math.min(MAX_CHART_ZOOM, start.width * distance(points) / start.separation / CHART_WIDTH * 100));
  const width = CHART_WIDTH * zoom / 100;
  return { zoom, width, scrollLeft: start.anchorX * width - center.x, scrollTop: start.anchorY * width - center.y };
}
