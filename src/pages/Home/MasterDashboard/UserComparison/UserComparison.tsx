import React, {lazy} from 'react';
import cx from 'classnames';
const GenderPieChart = lazy(() => import('./components/GenderPieChart'));
const SectionTitle = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionTitle'));
const SectionCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionCard'));
const AgeChart = lazy(() => import('./components/AgeChart'));

interface Props {
  dataAge: any
  dataGender: any
}

const UserComparison = ({dataAge, dataGender}: Props) => {
  return (
    <div className={cx('flex justify-between gap-x-6')}>
      <div className={cx('w-1/2')}>
        <div className={cx('mt-4')}>
          <SectionTitle
            title='Gender Comparison'
            subTitle='Perbandingan jenis kelamin aktif user Mediverse'
          />
        </div>
        <SectionCard>
          <div className={cx('flex')}>
            <GenderPieChart data={dataGender} />
          </div>
        </SectionCard>
      </div>
      <div className={cx('w-1/2')}>
        <div className={cx('mt-4')}>
          <SectionTitle
            title='Age Range'
            subTitle='Informasi umur rata-rata aktif user Mediverse'
          />
        </div>
        <SectionCard>
          <div className={cx('flex')}>
            <AgeChart dataAge={dataAge} />
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default UserComparison;
