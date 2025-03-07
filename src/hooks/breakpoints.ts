import { css } from 'styled-components';

export const size = {
  tablet: '768px',
  desktop: '1024px',
};

const from =
  <T extends keyof typeof size>(device: typeof size[T]) =>
  (...args: Parameters<typeof css>) =>
    css`
      @media (min-width: ${device}) {
        ${css(...args)};
      }
    `;

export const desktop = from(size.desktop);
