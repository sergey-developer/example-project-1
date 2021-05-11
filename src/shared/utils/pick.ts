export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const ret: any = {};
  keys.forEach(key => {
    if (obj && obj[key] !== undefined) {
      ret[key] = obj[key];
    }
  });
  return ret;
}
