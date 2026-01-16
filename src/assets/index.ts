// Glob import all flags and shapes by state code
const flagModules = import.meta.glob('./flags/*.svg', { eager: true, query: '?url', import: 'default' });
const shapeModules = import.meta.glob('./shapes/*.svg', { eager: true, query: '?url', import: 'default' });

// Convert glob results to simple code -> url maps
export const flags: Record<string, string> = {};
export const shapes: Record<string, string> = {};

for (const path in flagModules) {
  const code = path.match(/\/([A-Z]{2})\.svg$/)?.[1];
  if (code) flags[code] = flagModules[path];
}

for (const path in shapeModules) {
  const code = path.match(/\/([A-Z]{2})\.svg$/)?.[1];
  if (code) shapes[code] = shapeModules[path];
}
