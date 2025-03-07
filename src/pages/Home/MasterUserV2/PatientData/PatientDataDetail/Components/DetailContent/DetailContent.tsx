import { useEffect } from 'react';
import { useParams } from 'react-router';

import { TabNavigation, Typography } from '@/src/components';
import { Address, Profile, MedicalRecord, IntegratedNotes } from './components';
import { ROUTES_USER } from '@/src/constants';
import { profilePlaceholder } from '@/assets/images';
import usePatientData from '../../../usePatientData';

import styles from './patientUser.module.css';

const DetailContent = () => {
  const { id } = useParams();

  const {
    data: { detailPatientData },
    method: { handleGetDetailPatient, handleClearPatient },
  } = usePatientData();

  useEffect(() => {
    return () => {
      handleClearPatient();
    };
  }, []);

  useEffect(() => {
    if (id) handleGetDetailPatient(id);
  }, [id]);

  const tabs = [
    {
      id: 'information',
      path: `${ROUTES_USER.DATA_USER_DETAIL}/${id}?tab=information`,
      label: 'Profil',
      component: <Profile patientId={detailPatientData.name} />,
    },
    {
      id: 'address',
      path: `${ROUTES_USER.DATA_USER_DETAIL}/${id}?tab=address`,
      label: 'Alamat',
      component: <Address />,
    },
    {
      id: 'medical',
      path: `${ROUTES_USER.DATA_USER_DETAIL}/${id}?tab=medical`,
      label: 'Rekam Medis',
      component: <MedicalRecord patientId={detailPatientData.name} />,
    },
    {
      id: 'notes',
      path: `${ROUTES_USER.DATA_USER_DETAIL}/${id}?tab=notes`,
      label: 'Catatan Terintegrasi',
      component: <IntegratedNotes patientId={detailPatientData.name} />,
    },
  ];

  return (
    <div className='p-2'>
      <div className='flex justify-between items-center mb-6'>
        <div className='flex items-center gap-x-3'>
          <div className={styles.profile__image}>
            <img
              src={detailPatientData?.profilePhoto || profilePlaceholder}
              alt='profil-picture'
              className='w-14 h-14'
            />
          </div>

          <div>
            <Typography variant='subtitle1' customClass='mb-1'>
              {detailPatientData?.patient_name}
            </Typography>
            <div className='flex gap-x-4'>
              <Typography variant={'bodySmall'} color='text-grayTertiary'>
                {`ID: ${detailPatientData?.name ?? '-'}`}
              </Typography>
            </div>
          </div>
        </div>

        <div></div>
      </div>

      <TabNavigation data={tabs} />
    </div>
  );
};

export default DetailContent;
