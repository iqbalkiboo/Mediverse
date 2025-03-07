import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import cx from 'classnames';

import { ROUTES, ROUTES_TRANSACTION, USER_ROLES } from '@/src/constants';
import { ModalError, SpinnerScreen } from '@/src/commons';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import { useNotifications } from '@/src/hooks/useNotifications';
import { getFirebaseToken } from '@/src/utils/firebase/firebase';
import { orderStatusText } from '@/src/utils/orderStatus';
import { isValidJSON } from '@/src/utils/text';
import { resolveClaimPrescription } from '@/src/store/ePrescription/ePrescription.reducer';
import Sidebar from '@/pages/Home/BaseLayout/Sidebar';
import Navbar from '@/pages/Home/BaseLayout/Navbar';
import Drawer from '@/pages/Home/BaseLayout/Drawer';
import ErrorBoundary from '@/src/hoc/ErrorBoundary';
import cookieUtils from '@/src/utils/cookieUtils';

import { isEmpty } from 'lodash';
import { object } from 'prop-types';

const BaseLayout = ({ children }) => {
  const { id } = useParams();
  const { isMobile } = useWindowSize();
  const { role } = cookieUtils.getPermission();
  const detailUser = cookieUtils.getUser();

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCollapse, setIsCollapse] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const {
    data: {
      chatNotif,
      ePrescription: { claim },
    },
    method: { playAudio, stopAudio, handleCloseModalClaim, handleChatNotif },
  } = useNotifications();

  const isMobileDashboard = isMobile && location.pathname === '/';

  // path epress detail
  const isMobileEpress =
    isMobile && location.pathname === `/transactions/eprescription-order/${id}`;

  const showSideBar = () => {
    return !(
      role.name.toLowerCase() === USER_ROLES.ADMIN_PASIEN.toLowerCase() ||
      role.name.toLowerCase() === USER_ROLES.DOKTER.toLowerCase()
    );
  };

  const handleClaimPrescription = (id: string) => {
    const payload = {
      params: { id, action: 'claim' },
      body: {
        outlet_id: String(detailUser?.outlet_id),
        outlet_name: detailUser?.outlet_name,
      },
    };
    dispatch(resolveClaimPrescription(payload));
  };

  useEffect(() => {
    if (
      !isEmpty(import.meta.env.VITE_APP_API_KEY) &&
      !isEmpty(import.meta.env.VITE_APP_APP_ID) &&
      cookieUtils.getUser()?.type
    ) {
      getFirebaseToken();
    }

    const fcmChannel = new BroadcastChannel('fcm-channel');
    fcmChannel.onmessage = (message) => {
      const data = [message.data?.data];
      // const parentId = outletDocumentId(detailUser?.provider_id, detailUser?.outlet_id);

      const isMyProvider = JSON.parse(message.data?.data?.Audiences).find(
        (audien) =>
          audien.type === 'provider' &&
          audien.type_id === detailUser?.provider_id
      );

      const filterOutlet = data.find((item) =>
        JSON.parse(item?.CustomData)
          .map((item) => item.type_id)
          .includes(detailUser?.outlet_id)
      );

      const type = filterOutlet?.Type;
      const idOrderEpress = isValidJSON(filterOutlet?.CustomData)
        ? JSON.parse(filterOutlet?.CustomData)[0]?.id
        : '';
      const idOrderMedpharm = isValidJSON(filterOutlet?.CustomData)
        ? JSON.parse(JSON.parse(filterOutlet?.CustomData)[0].metadata)
            .transaction_type_id
        : '';
      const notificationStatus = JSON.parse(
        filterOutlet?.NotificationTemplate
      )?.status;
      const notificationSubTitle = JSON.parse(
        filterOutlet?.NotificationTemplate
      )?.sub_title;

      if (type === 'chats') handleChatNotif(true);

      playAudio();
      if (!isMobile && !isEmpty(isMyProvider)) {
        const notification = new Notification(
          orderStatusText(notificationStatus),
          {
            body: notificationSubTitle,
            icon: '/icon-192x192.png',
          }
        );

        notification.onclick = (event) => {
          event.preventDefault();
          stopAudio();
          if (type === 'chats') {
            handleChatNotif(false);
            navigate(`${ROUTES.CHAT}`);
          } else if (type !== 'medpharm') {
            handleClaimPrescription(idOrderEpress);
          } else {
            navigate(`${ROUTES_TRANSACTION.MEDPHARM_ORDER}/${idOrderMedpharm}`);
          }
        };
      }
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/chat') handleChatNotif(false);
  }, [location.pathname]);

  const isShowSidebar = showSideBar();

  return (
    <div>
      {/* laoding screen claim epress */}
      <SpinnerScreen open={claim.isLoading} />

      <Navbar
        isOpenDrawer={isOpenDrawer}
        setIsOpenDrawer={setIsOpenDrawer}
        isCollapse={isShowSidebar ? isCollapse : true}
      />
      {isOpenDrawer && <Drawer setIsOpenDrawer={setIsOpenDrawer} />}
      {isShowSidebar && !isMobile ? (
        <Sidebar
          isCollapse={isCollapse}
          setIsCollapse={setIsCollapse}
          showChatNotif={chatNotif}
        >
          {children}
        </Sidebar>
      ) : (
        <div
          className={cx('pt-4 px-6 pb-4', {
            'bg-white': isMobile,
            'bg-grayBg min-h-screen': !isMobile,
            'bg-[#F9F8FF]': isMobileDashboard,
            // disable padding-x in chat epress
            'px-1': isMobileEpress,
          })}
        >
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      )}

      {/* modal error claim epress */}
      <ModalError
        isOpen={claim.isError}
        description={'Pesanan sudah di konfirmasi apotik lain'}
        onCancel={() => handleCloseModalClaim(false)}
      />
    </div>
  );
};

BaseLayout.propTypes = {
  children: object,
};

export default BaseLayout;
