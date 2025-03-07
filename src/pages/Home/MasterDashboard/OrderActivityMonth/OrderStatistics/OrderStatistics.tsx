import React, {lazy, useEffect} from 'react';
import cx from 'classnames';
import {Breadcrumb, ButtonBack, SelectBox, Typography} from '@/src/components';
import {ROUTES_DASHBOARD} from '@/src/constants';

import useDashboard, {OPERATOR_FASKES} from '@/src/pages/Home/MasterDashboard/useDashboardHooks';
import ChartBar from '@/src/components/ChartBar';
import {generateArrayOfYears} from '@/src/utils/formatDate';
import {ChevronDownIcon} from '@/src/assets/images/svg';

const DateFilter = lazy(() => import('@/src/pages/Home/MasterDashboard/components/DateFilter'));

const options = generateArrayOfYears(5).map((item) => {
  return {value: item, label: String(item)};
});

const OrderStatistics = () => {
  const {
    data: {
      role,
      chartActivityPharmacy,
      activityProductPrevious,
      activityPharmacyPotential,
      activityPharmacyProductSold,
      activityPharmacyPreviousMonth,
      dataChartActivityTreatmentCompleted,
      dataChartPotentialOrderHealthFacility,
      selectedYearChartActivityHealthFacility,
      dataChartActivityTreatmentCompletedPrevious,
      dataChartPotentialOrderHealthFacilityPrevious,
    },
    method: {
      handleSetYear,
      handleSetMonth,
      handleOpenModal,
      handleValueMonth,
      handleGetChartPharmacy,
      handleGetChartHelathFacility,
      handleChartHealthFacilitySelectedYear,
    },
  } = useDashboard();

  const handleCloseModal = (value) => {
    handleOpenModal(value, false);
  };


  useEffect(() => {
    if (OPERATOR_FASKES.includes(role?.name)) {
      handleGetChartHelathFacility();
    } else {
      handleGetChartPharmacy();
    }
  }, [chartActivityPharmacy.month,
    chartActivityPharmacy.month]);

  return (
    <div>
      {/* Breadcumb */}
      <div className={cx('flex items-center justify-between')}>
        <Breadcrumb />
        <ButtonBack path={ROUTES_DASHBOARD.HOME} />
      </div>
      <div className={cx('flex justify-between items-center')}>
        <Typography variant="h1" color="text-[#5600E8]">
          Aktivitas Pemesanan
        </Typography>
        {OPERATOR_FASKES.includes(role?.name) ? (
          <SelectBox
            name="statistic"
            isSearchable={false}
            defaultValue={options.filter((opt) => opt.value === selectedYearChartActivityHealthFacility)}
            onChange={(e) => handleChartHealthFacilitySelectedYear(e.value)}
            options={options}
            className={cx('w-30')}
          />
        ) : (
          <div className={cx(
              'flex items-center gap-x-4 py-3 px-4 bg-white rounded-lg cursor-pointer relative',
          )}
          onClick={() => handleOpenModal(true, false)}
          >
            <Typography variant="bodyBase" color="">
              {`${handleValueMonth(chartActivityPharmacy?.month)} ${chartActivityPharmacy?.year}`}
            </Typography>
            <ChevronDownIcon color="#0A0A0A" />
          </div>
        )}
      </div>
      {/* sales potential statistics */}
      <div className={cx('w-full h-full bg-white rounded-lg mt-3 p-6')}>
        <Typography variant="h2" color="">
          Statistik Potensi Pemesanan
        </Typography>
        <div className={cx('mt-4')}>
          <ChartBar
            tickCount={15}
            titleTooltip={OPERATOR_FASKES.includes(role?.name) ? 'Potensi Pemesanan' : ''}
            height={500}
            data={OPERATOR_FASKES.includes(role?.name) ?
               dataChartPotentialOrderHealthFacility : activityPharmacyPotential}
            isMultiple={OPERATOR_FASKES.includes(role?.name) ?
              dataChartPotentialOrderHealthFacilityPrevious : activityPharmacyPreviousMonth}
            rupiah
            percentage={OPERATOR_FASKES?.includes(role?.name)}
            totalPercent={'-0'}
            year={selectedYearChartActivityHealthFacility}
          />
        </div>
      </div>
      {/* product statistics sold */}
      <div className={cx('w-full h-full bg-white rounded-lg mt-7 p-6')}>
        <Typography variant="h2" color="">
          Statistik Layanan Selesai Terpesan
        </Typography>
        <div className={cx('mt-4')}>
          <ChartBar
            tickCount={15}
            titleTooltip={OPERATOR_FASKES.includes(role?.name) ? 'Layanan Selesai Terpesan' : ''}
            height={500}
            data={OPERATOR_FASKES?.includes(role?.name) ?
               dataChartActivityTreatmentCompleted : activityPharmacyProductSold}
            isMultiple={OPERATOR_FASKES?.includes(role?.name) ?
              dataChartActivityTreatmentCompletedPrevious : activityProductPrevious}
            percentage={OPERATOR_FASKES?.includes(role?.name)}
            totalPercent={'+0'}
            year={selectedYearChartActivityHealthFacility}
          />
        </div>
      </div>

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
    </div>
  );
};

export default OrderStatistics;
