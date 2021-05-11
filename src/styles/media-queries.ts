import { generateMedia } from 'styled-media-query';

export const mediaPoint = {
  xl: '1200px',
  lg: '960px',
  md: '720px',
  sm: '540px'
};

export const mediaQueries = generateMedia(mediaPoint);

export default mediaQueries;
