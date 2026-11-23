/**
 * Links to other websites open in a new tab (with a screen-reader note). Placeholder links
 * ("#", until the real URLs are supplied) and on-site links stay in the same tab — otherwise
 * a placeholder would open a second copy of this site in a new tab.
 */
export const isExternalUrl = (href: string) => /^https?:\/\//i.test(href);

export const newTabProps = (href: string) =>
  isExternalUrl(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
