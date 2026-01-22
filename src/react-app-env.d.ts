/// <reference types="react-scripts" />
/// <reference types="w3c-web-usb" />
/// <reference types="web-bluetooth" />

// Type declarations for CSS Modules
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Type declarations for SVG files
declare module '*.svg' {
  import type React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export default src;
}
