import { DesktopView, MobileView } from './components';

import { useWindowSize } from '@/src/hooks/useWindowSize';

const Notifications = () => {
  const { isMobile } = useWindowSize();

  return isMobile ? <MobileView /> : <DesktopView />;
};

export default Notifications;
