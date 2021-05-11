import useMedia from 'react-use/lib/useMedia';

import { mediaPoint } from 'styles/media-queries';

type MediaPointKey = keyof typeof mediaPoint;

const useGreaterThan = (point: MediaPointKey) => {
  return useMedia(`(min-width: ${mediaPoint[point]})`);
};

export default useGreaterThan;
