import React, {lazy} from 'react';
import cx from 'classnames';

import {
  AnvelopeIcon,
  BoxIcon,
  FastDeliveryIcon,
  HealthTestIcon,
  ShippingBoxIcon,
  StethoscopeIconSquare,
  SurgeryIcon,
  SyringeIcon,
  XrayIcon,
} from '@/src/assets/images/svg';
import {Typography} from '@/src/components';
import {formatDate} from '@/src/utils/formatDate';
import {ROLES_NAME, ROUTES_TRANSACTION} from '@/src/constants';
import {useNavigate} from 'react-router';
import {useWindowSize} from '@/src/hooks/useWindowSize';
const DashboardSmallCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/DashboardSmallCard'));

interface Props {
  role?: any
  data?: any
  title: string;
  subTitle: string;
}

const TodayActivity = ({role, data, title, subTitle}: Props) => {
  const navigation = useNavigate();
  const {isMobile} = useWindowSize();

  const dataActivitypharmacy = [
    {
      id: 1,
      title: 'Pesanan Baru E-Press',
      value: data?.newTransactionEprees,
      icon: <HealthTestIcon />,
      bgIcon: 'bg-[#FFE8E8]',
      link: `${ROUTES_TRANSACTION.EPRESCRIPTION_ORDERS}?tab=new`,
    },
    {
      id: 2,
      title: 'Pesanan Baru',
      value: data?.newTransaction,
      icon: <ShippingBoxIcon />,
      bgIcon: 'bg-[#FDE7FF]',
      link: `${ROUTES_TRANSACTION.MEDPHARM_ORDERS}?tab=new`,
    },
    {
      id: 3,
      title: 'Pesanan Siap Kirim',
      value: data?.readyPickUp,
      icon: <FastDeliveryIcon />,
      bgIcon: 'bg-[#E8F5FF]',
      link: `${ROUTES_TRANSACTION.MEDPHARM_ORDERS}?tab=ongoing`,
    },
    {
      id: 4,
      title: 'Pesanan Dikomplain',
      value: `${data?.complaintTransactionAccept}/${data?.complaintTransactionAll}`,
      icon: <AnvelopeIcon />,
      bgIcon: 'bg-[#FAEEFF]',
      suffix: 'Disetujui',
      link: `${ROUTES_TRANSACTION.MEDPHARM_ORDERS}?tab=complain`,
    },
    {
      id: 5,
      title: 'Pesanan Selesai',
      value: data?.completeTransaction,
      icon: <BoxIcon />,
      bgIcon: 'bg-[#EBFFE8]',
      link: `${ROUTES_TRANSACTION.MEDPHARM_ORDERS}?tab=done`,
    },
  ];

  const dataActivityFaskes = [
    {
      id: 1,
      title: 'Reservasi Konsultasi',
      value: data?.reservationConsultation,
      icon: <StethoscopeIconSquare />,
      bgIcon: 'bg-[#EBFFE8]',
      link: `${ROUTES_TRANSACTION.MEDPOINT_ORDERS}`,
    },
    {
      id: 2,
      title: 'Reservasi Tindakan Medis',
      value: data?.reservationMedicalAction,
      icon: <SurgeryIcon />,
      bgIcon: 'bg-[#E8F5FF]',
      link: `${ROUTES_TRANSACTION.MEDPOINT_ORDERS}`,
    },
    {
      id: 3,
      title: 'Reservasi Tes Lab',
      value: data?.reservationLabTest,
      icon: <XrayIcon />,
      bgIcon: 'bg-[#FAEEFF]',
      link: `${ROUTES_TRANSACTION.MEDPOINT_ORDERS}`,
    },
    {
      id: 4,
      title: 'Reservasi Vaksinasi',
      value: data?.reservationVaccination,
      icon: <SyringeIcon />,
      bgIcon: 'bg-[#FFF4D7]',
      link: `${ROUTES_TRANSACTION.MEDPOINT_ORDERS}`,
    },
  ];

  const dataActivity = () => {
    switch (role?.name) {
      case ROLES_NAME.OPERATOR_APOTEK:
        return dataActivitypharmacy;
      case ROLES_NAME.OPERATOR_FASKES:
        return dataActivityFaskes;
      case ROLES_NAME.ADMINISTRATOR_PROVIDER_MEDPOINT:
        return dataActivityFaskes;
      default:
        return dataActivitypharmacy;
    }
  };

  const rowCount = () => {
    switch (role?.name) {
      case ROLES_NAME.OPERATOR_APOTEK:
        return 'grid-cols-5';
      case ROLES_NAME.OPERATOR_FASKES:
        return 'grid-cols-4';
      case ROLES_NAME.ADMINISTRATOR_PROVIDER_MEDPOINT:
        return 'grid-cols-4';
      default:
        return 'grid-cols-5';
    }
  };

  return (
    <div>
      <div className={cx('mt-6 flex justify-between items-center')}>
        <div>
          <Typography variant={isMobile ? 'h4' : 'h2'} color="">
            {title}
          </Typography>
          <Typography variant="xSmallMedium" color="text-[#9E9E9E]">
            {subTitle}
          </Typography>
        </div>
        <div>
          <Typography variant={isMobile ? 'h5':'h3'} color="">
            {formatDate(new Date(), ' ', 'MMMM')}
          </Typography>
        </div>
      </div>
      <div className={cx(
          'mt-3 grid',
          `${rowCount()}`,
          'gap-x-6',
          {
            '!grid-cols-2 !grid-rows-3 grid-flow-row gap-y-3 !mt-4': isMobile,
          },
      )}>
        {dataActivity()?.map((data: any) => (
          <DashboardSmallCard
            key={data.id}
            icon={data.icon}
            title={data.title}
            value={data.value}
            suffix={data.suffix}
            bgIcon={data.bgIcon}
            showButton={true}
            buttonText={role?.name === ROLES_NAME.OPERATOR_FASKES ? 'Lihat Reservasi' : 'Lihat pesanan'}
            customClass={isMobile ? 'shadow-md':'shadow-[0_15px_20px_0_rgba(211, 192, 214, 0.2)]'}
            onButtonClick={() => navigation(data.link)}
            titleVariant={'bodyXSmall'}
          />
        ))}
      </div>
    </div>
  );
};

export default TodayActivity;
