import React, {lazy, useEffect, useState} from 'react';
import cx from 'classnames';
import {Breadcrumb, Button, ButtonBack, SelectBox, Typography} from '@/src/components';
import {ROUTES_DASHBOARD} from '@/src/constants';
import {
  ChevronDownIcon, DateTimeIcon,
} from '@/src/assets/images/svg';
import {useWindowSize} from '@/src/hooks/useWindowSize';

import useDashboard from '@/src/pages/Home/MasterDashboard/useDashboardHooks';
import ChartBar from '@/src/components/ChartBar';

const DateFilter = lazy(() => import('@/src/pages/Home/MasterDashboard/components/DateFilter'));
const ModalDateFilter = lazy(() => import('@/src/pages/Home/MasterDashboard/components/ModalDateFilter'));

const SalesStatistics = () => {
  const [statisticType, setStatisticType] = useState({
    label: 'Statistik Potensi Penjualan',
    value: 'salesPotency',
  });
  const {
    data: {
      chartActivityPharmacy,
      activityProductPrevious,
      activityPharmacyPotential,
      activityPharmacyProductSold,
      activityPharmacyPreviousMonth,
    },
    method: {
      handleSetMonth,
      handleOpenModal,
      handleValueMonth,
      handleGetChartPharmacy,
      handleSetYear,
    },
  } = useDashboard();

  const {isMobile} = useWindowSize();

  useEffect(() => {
    handleGetChartPharmacy();
  }, [chartActivityPharmacy.month,
    chartActivityPharmacy.year]);

  const handleCloseModal = (value) => {
    handleOpenModal(value, isMobile);
  };

  return (
    <div>
      {/* Breadcumb */}
      <div className={cx('flex items-center justify-between')}>
        <Breadcrumb />
        {
          !isMobile && <ButtonBack path={ROUTES_DASHBOARD.HOME} />
        }
      </div>
      <div className={cx('flex justify-between items-center')}>
        <Typography variant={isMobile ? 'h3':'h1'} color="text-[#5600E8]">
          Aktivitas Penjualan
        </Typography>
        {
          !isMobile &&
          (
            <div
              className={cx(
                  'flex items-center gap-x-4 py-3 px-4 bg-white rounded-lg cursor-pointer relative',
              )}
              onClick={() => handleOpenModal(true, isMobile)}
            >
              <Typography variant="bodyBase" color="">
                {`${handleValueMonth(chartActivityPharmacy?.month)} ${chartActivityPharmacy?.year}`}
              </Typography>
              <ChevronDownIcon color="#0A0A0A" />
            </div>
          )
        }
      </div>
      {
        isMobile &&
        (
          <div className={cx('flex gap-x-2 mt-4')}>
            <div className={cx('flex-1')}>
              <SelectBox
                options={[
                  {label: 'Statistik Potensi Penjualan', value: 'salesPotency'},
                  {label: 'Statistik Produk Terjual', value: 'salesProduct'},
                ]}
                value={statisticType}
                onChange={(value) => setStatisticType(value)}
              />
            </div>
            <Button
              onClick={() => handleOpenModal(true, isMobile)}
              iconButton={DateTimeIcon}
              text=''
              customClassIcon='!mr-0'
              customClassName={'!w-11 !h-11 !bg-white !rounded-md !border-white !flex !item-center !justify-center'}
            />
          </div>
        )
      }
      {/* sales potential statistics */}
      {
        (!isMobile || statisticType.value === 'salesPotency') &&
        (
          <div className={cx('w-full h-full bg-white rounded-lg mt-3',
              {'py-3 px-1 shadow-lg': isMobile, 'p-6': !isMobile})}>
            {
              !isMobile &&
              (
                <Typography variant="h2" color="">
                  Statistik Potensi Penjualan
                </Typography>
              )
            }
            <div className={cx('mt-4 overflow-x-scroll')}>
              <ChartBar
                tickCount={15}
                isMobile={isMobile}
                width={1200}
                titleTooltip="Potensi Penjualan"
                height={isMobile ? 345 : 500}
                data={activityPharmacyPotential}
                isMultiple={activityPharmacyPreviousMonth}
                rupiah
                fixLabelOverlap={isMobile}
                year={chartActivityPharmacy.year}
              />
            </div>
          </div>
        )
      }
      {/* product statistics sold */}
      {
        (!isMobile || statisticType.value === 'salesProduct') &&
        (
          <div className={cx('w-full h-full bg-white rounded-lg mt-7',
              {'py-3 px-1 shadow-lg': isMobile, 'p-6': !isMobile})}>
            {
              !isMobile &&
              (
                <Typography variant="h2" color="">
                  Statistik Produk Terjual
                </Typography>
              )
            }
            <div className={cx('mt-4')}>
              <ChartBar
                tickCount={15}
                isMobile={isMobile}
                width={1200}
                titleTooltip="Produk Tejual"
                height={isMobile ? 345 : 500}
                data={activityPharmacyProductSold}
                isMultiple={activityProductPrevious}
                fixLabelOverlap={isMobile}
                year={chartActivityPharmacy.year}
              />
            </div>
          </div>
        )
      }
      {/* Pop up modal Date */}
      {chartActivityPharmacy.isOpen && (
        <DateFilter
          currentMonth={chartActivityPharmacy.currentMonth}
          month={chartActivityPharmacy.month}
          year={chartActivityPharmacy.year}
          onSetMonth={handleSetMonth}
          onSetYear={handleSetYear}
          onClose={handleCloseModal}
          title='Periode Aktifitas Penjualan'
        />
      )}
      {/* Modal Filter Month*/}
      <ModalDateFilter
        month={chartActivityPharmacy.month}
        year={chartActivityPharmacy.year}
        onSetMonth={handleSetMonth}
        onSetYear={handleSetYear}
        onClose={() => handleCloseModal(false)}
        title=''
        isOpen={chartActivityPharmacy.openModal}
      />
    </div>
  );
};

export default SalesStatistics;
