import useMedia from 'react-use/lib/useMedia';

import { mediaPoint } from 'styles/media-queries';

type LessPoint = keyof typeof mediaPoint;
export function useLessThan(point: LessPoint) {
  return useMedia(`(max-width: ${mediaPoint[point]} )`);
}
