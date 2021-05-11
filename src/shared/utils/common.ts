const getCurrentUri = (location: Location): string => {
  return location.pathname + location.search + location.hash;
};

const qs = (obj: Record<string, any>): string => {
  if (!Object.keys(obj).length) return '';

  return `?${new URLSearchParams(obj).toString()}`;
};

const randomString = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

const normalizeNumber = (number: string) => {
  return number.replace(/[^0-9]/g, '');
};

export { getCurrentUri, qs, randomString, normalizeNumber };
