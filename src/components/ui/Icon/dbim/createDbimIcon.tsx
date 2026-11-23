import type { ComponentType } from 'react';

/**
 * Wraps a DBIM Toolkit SVG (already optimised, colour = currentColor) as a component the
 * <Icon> wrapper can size and colour. The markup is our own build output, never user input.
 */
export function createDbimIcon(name: string, viewBox: string, body: string): ComponentType {
  function DbimIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        fill="currentColor"
        focusable="false"
        aria-hidden
        dangerouslySetInnerHTML={{ __html: body }}
      />
    );
  }
  DbimIcon.displayName = name;
  return DbimIcon;
}
