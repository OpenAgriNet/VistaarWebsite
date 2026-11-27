/**
 * Shared style fragment: a picture that covers the whole section (About Us, Testimonials,
 * At a Glance, State Portals). The picture path comes from content, never from styles.
 */
export const coverBackground = (src: string) => ({
  backgroundImage: `url("${src}")`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});
