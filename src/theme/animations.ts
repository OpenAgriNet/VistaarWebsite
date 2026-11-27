import { keyframes } from '@mui/material/styles';

/**
 * Endless sideways scroll for tickers/marquees: the track holds its list twice, so moving
 * by half its width loops seamlessly. Used by the announcements bar and the trust logos.
 */
export const marqueeScroll = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(-50%)' },
});
