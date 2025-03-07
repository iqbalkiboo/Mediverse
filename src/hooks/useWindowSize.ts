import { useEffect, useState } from 'react';

import { size } from '@/src/hooks/breakpoints';

export const useWindowSize = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const isMobile = window.innerWidth < parseInt(size.tablet, 10);
  const isTablet =
    window.innerWidth > parseInt(size.tablet, 10) &&
    window.innerWidth < parseInt(size.desktop, 10);
  const isDesktopWidth = window.innerWidth >= parseInt(size.desktop, 10);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    // Handler to call on window resize
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { width, height, isMobile, isDesktopWidth, isTablet };
};
