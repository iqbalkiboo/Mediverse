import React, {lazy, useEffect} from 'react';
import useDashboard, {
  ADMIN_FINANCE_MEDPHARM,
  ADMIN_FINANCE_PROVIDER,
  ADMIN_MARKETING_ROLE,
  APOTEK_ROLE,
  MEDIVERSE_ROLE,
  OPERATOR_FASKES,
  OPERATOR_MEDPOINT_ROLE,
  PROVIDER_MEDPHARM_ROLE,
} from './useDashboardHooks';
import cx from 'classnames';
import {useNavigate} from 'react-router';
import {
  CutPaymentIcon,
  DateSquareIcon,
  PaymentIcon,
  PriceTagIcon,
  SalesPotentialIcon,
  SoldIcon,
  StethoscopeSquareIcon,
} from '@/src/assets/images/svg';
import {useWindowSize} from '@/src/hooks/useWindowSize';
import {Typography} from '@/src/components';
import {ROUTES_DASHBOARD} from '@/src/constants';
import FeatureBar from '@/src/pages/Home/MasterDashboard/FeatureBar';

const PurchaseMonth = lazy(() => import('./PurchaseMonth'));
const SaleTransactions = lazy(() => import('./SaleTransactions'));
const TransactionPerCategory = lazy(() => import('./TransactionsPerCategory'));
const FunnelGraph = lazy(() => import('./FunnelGraph'));
const ProductSales = lazy(() => import('./ProductSales'));

const TodayActivity = lazy(() => import('@/src/pages/Home/MasterDashboard/TodayActivity'));
const SalesActivityMonth = lazy(() => import('@/src/pages/Home/MasterDashboard/SalesActivityMonth'));
const OrderActivityMonth = lazy(() => import('@/src/pages/Home/MasterDashboard/OrderActivityMonth'));
const IncomeMonth = lazy(() => import('@/src/pages/Home/MasterDashboard/IncomeMonth'));
const MediverseIncomeMonth = lazy(() => import('@/src/pages/Home/MasterDashboard/MediverseIncomeMonth'));
const IncomeHistories = lazy(() => import('@/src/pages/Home/MasterDashboard/IncomeHistories'));
const EstimationExpense = lazy(() => import('@/src/pages/Home/MasterDashboard/MedpharmDashboard/EstimationExpense'));
const IncomeMonthProvid = lazy(() => import('@/src/pages/Home/MasterDashboard/IncomeMonthProvid'));
const VoucherInformation = lazy(() => import('@/src/pages/Home/MasterDashboard/VoucherInformation'));
const PushNotification = lazy(() => import('@/src/pages/Home/MasterDashboard/components/PushNotification'));
const UserActivity = lazy(() => import('@/src/pages/Home/MasterDashboard/UserActivity'));
const DeviceUsed = lazy(() => import('@/src/pages/Home/MasterDashboard/DeviceUsed'));
const PurchaseValuePerMonth = lazy(() => import('@/src/pages/Home/MasterDashboard/PurchaseValuePerMonth'));
const UserComparison = lazy(() => import('@/src/pages/Home/MasterDashboard/UserComparison'));
const PerformanceChart = lazy(() => import('@/src/pages/Home/MasterDashboard/PerformanceChart'));
const ActiveUserslocation = lazy(() => import('@/src/pages/Home/MasterDashboard/ActiveUsersLocation'));

const Dashboard = () => {
  const navigate = useNavigate();
  const {isMobile} = useWindowSize();
  const iconSize = {
    width: isMobile ? 12 : 20,
    height: isMobile ? 12 : 20,
  };

  const {
    data: {
      role,
      month,
      funnel,
      isLoadingFunnel,
      purchase,
      queryTab,
      activeUser,
      dataChartAge,
      activityUser,
      optionProduct,
      dataUserActive,
      dataDeviceUsed,
      mostReadArticle,
      dataChartGender,
      mostUsedFeature,
      voucherCashback,
      transactionSale,
      dataUserActivity,
      pushNotification,
      mostVisitedFeature,
      dataChartActiveUser,
      dataChartCumulative,
      dataMostUsedFeature,
      dataMostReadArticle,
      voucherFreeDelivery,
      dataPurchasePerMonth,
      activeUserTransaction,
      dataChartPurchaseUser,
      todayActivityPharmacy,
      monthActivityPharmacy,
      selectedFunnelProvider,
      dataMostVisitedFeature,
      pushNotificationmobile,
      dataChartPerformanceYear,
      dataUserActiveConversion,
      currentMonthIncomeProvider,
      currentMonthActivityProvider,
      dataChartCumulativeActiveUser,
      dataTodayActivityHealthFacility,
      dataChartCumulativePurchaseUser,
      currentMonthEstimationExpenseData,
      dataCurrentMonthActivityHealthFacility,
    },
    method: {
      showNotification,
      getDataNotification,
      handleSetMonthPurchase,
      handleSetProductPurchase,
      handleSetMonthActiveUser,
      handleSetMonthUserActive,
      handleSetYearPerformance,
      handleSetYearPurchaseUser,
      handleFetchDataSuperAdmin,
      handleSetMonthActivityUser,
      handleSetYearChartActiveUser,
      handleSelectedFunnelProvider,
      handleFetchDataAdminMarketing,
      handleSetMonthMostUsedFeature,
      handleSetMonthMostReadArticle,
      handleGetDataDashboardMedpoint,
      handleGetDataDashboardPharmacy,
      handleGetDataDashboardMedpharm,
      handleGetTabMarketingDashboard,
      handleGetTabActivedUserOverview,
      handleGetTabConversionDashboard,
      handleSetMonthMostVisitedFeature,
      handleSetMonthActiveUserTransaction,
      handleSetProductActiveUserTransaction,
      handleFetchTodayActivityHealthFacility,
    },
  } = useDashboard();

  useEffect(() => {
    handleFetchDataSuperAdmin();
    handleFetchTodayActivityHealthFacility();
    handleFetchDataAdminMarketing();
    handleGetDataDashboardMedpoint();
    handleGetDataDashboardMedpharm();
    handleGetDataDashboardPharmacy();
    getDataNotification();
  }, []);

  useEffect(() => {
    if (MEDIVERSE_ROLE.includes(role?.name)) {
      switch (queryTab) {
        case 'marketing-dashboard':
          return handleGetTabMarketingDashboard();
        case 'actived-user-overview':
          return handleGetTabActivedUserOverview();
        case 'conversion-dashboard':
          return handleGetTabConversionDashboard();
        default:
          return handleGetTabMarketingDashboard();
      }
    }
  }, [queryTab]);

  // show notification browser
  useEffect(() => {
    showNotification();
  }, [pushNotification]);

  const dashboardRole = [
    ...ADMIN_FINANCE_MEDPHARM,
    ...ADMIN_FINANCE_PROVIDER,
    ...ADMIN_MARKETING_ROLE,
    ...APOTEK_ROLE,
    ...MEDIVERSE_ROLE,
    ...OPERATOR_FASKES,
    ...OPERATOR_MEDPOINT_ROLE,
    ...PROVIDER_MEDPHARM_ROLE,
  ];

  const tabs = [
    {
      id: 'marketing-dashboard',
      path: `${ROUTES_DASHBOARD.HOME}?tab=marketing-dashboard`,
      label: 'Marketing Dashboard',
    },
    {
      id: 'actived-user-overview',
      path: `${ROUTES_DASHBOARD.HOME}?tab=actived-user-overview`,
      label: 'Actived User Overview',
    },
    {
      id: 'conversion-dashboard',
      path: `${ROUTES_DASHBOARD.HOME}?tab=conversion-dashboard`,
      label: 'Conversion Dashboard',
    },
  ];

  const renderTitleUserActivity = () => {
    switch (queryTab) {
      case 'marketing-dashboard':
        return 'Activity User';
      case 'actived-user-overview':
      case 'conversion-dashboard':
        return 'Active User';
      default:
        return 'Activity User';
    }
  };

  const renderDescriptionUserActivity = () => {
    switch (queryTab) {
      case 'marketing-dashboard':
        return 'Informasi aktifitas dari user untuk aplikasi Mediverse';
      case 'actived-user-overview':
      case 'conversion-dashboard':
        return 'Informasi user aktif untuk aplikasi Mediverse';
      default:
        return 'Informasi aktifitas dari user untuk aplikasi Mediverse';
    }
  };

  const renderDataUserActivity = () => {
    switch (queryTab) {
      case 'marketing-dashboard':
        return dataUserActivity;
      case 'actived-user-overview':
        return dataUserActive;
      case 'conversion-dashboard':
        return dataUserActiveConversion;
      default:
        return dataUserActivity;
    }
  };

  const renderDataPerformanceChart = () => {
    switch (queryTab) {
      case 'marketing-dashboard':
        return dataChartPerformanceYear;
      case 'actived-user-overview':
        return dataChartActiveUser;
      case 'conversion-dashboard':
        return dataChartPurchaseUser;
      default:
        return dataChartPerformanceYear;
    }
  };

  const renderDataCumulativePerformanceChart = () => {
    switch (queryTab) {
      case 'marketing-dashboard':
        return dataChartCumulative;
      case 'actived-user-overview':
        return dataChartCumulativeActiveUser;
      case 'conversion-dashboard':
        return dataChartCumulativePurchaseUser;
      default:
        return dataChartCumulative;
    }
  };

  const renderHandleSetYearChart = (value) => {
    switch (queryTab) {
      case 'marketing-dashboard':
        return handleSetYearPerformance(value);
      case 'actived-user-overview':
        return handleSetYearChartActiveUser(value);
      case 'conversion-dashboard':
        return handleSetYearPurchaseUser(value);
      default:
        return handleSetYearPerformance(value);
    }
  };

  const renderValueMonthUserActivity = () => {
    switch (queryTab) {
      case 'marketing-dashboard':
        return month.find((item) => item.value === activityUser?.params?.month);
      case 'actived-user-overview':
        return month.find((item) => item.value === activeUser?.params?.month);
      case 'conversion-dashboard':
        return month.find((item) => item.value === activeUserTransaction?.params?.month);
      default:
        return month.find((item) => item.value === activityUser?.params?.month);
    }
  };

  return (
    <>
      {/* push notification */}
      {APOTEK_ROLE.includes(role?.name) && (
        <div>
          <PushNotification data={isMobile ? pushNotificationmobile : pushNotification}/>
        </div>
      )}

      {MEDIVERSE_ROLE.includes(role?.name) && (
        <>
          <PurchaseMonth data={purchase} />
          <SaleTransactions data={transactionSale} />
          <TransactionPerCategory data={transactionSale} />
          <FunnelGraph
            isLoading={isLoadingFunnel}
            data={funnel}
            selectedProvider={selectedFunnelProvider}
            onChange={handleSelectedFunnelProvider}
          />
          <ProductSales />

          <div className={cx('flex items-center justify-center gap-4 pt-6')}>
            {tabs?.map((tab) => (
              <div
                key={tab?.id}
                onClick={() => navigate(tab?.path)}
                className={cx('w-60 py-4 rounded-lg text-center cursor-pointer', {
                  'bg-[#7859EE]': tab.id === queryTab,
                  'bg-chatSecondary': tab.id !== queryTab,
                })}
              >
                <Typography
                  variant={'bodyXSmall'}
                  color={tab.id === queryTab ? 'text-white' : 'text-[#616161]'}
                  customClass='font-bold'
                >
                  {tab?.label}
                </Typography>
              </div>
            ))}
          </div>

          <PerformanceChart
            onChangeYear={renderHandleSetYearChart}
            data={renderDataPerformanceChart()}
            dataCumulative={renderDataCumulativePerformanceChart()}
          />

          {['conversion-dashboard'].includes(queryTab) && (
            <PurchaseValuePerMonth
              data={dataPurchasePerMonth}
              onHandleSelectMonth={handleSetMonthPurchase}
              onHandleSelectProduct={handleSetProductPurchase}
            />
          )}

          {['actived-user-overview'].includes(queryTab) && (
            <ActiveUserslocation
              onChangeMonth={handleSetMonthUserActive}
            />
          )}

          <UserActivity
            type={queryTab}
            title={renderTitleUserActivity()}
            description={renderDescriptionUserActivity()}
            data={renderDataUserActivity()}
            valueMonth={renderValueMonthUserActivity()}
            optionMonth={month}
            onHandleSelectMonth={(item) => {
              switch (queryTab) {
                case 'marketing-dashboard':
                  return handleSetMonthActivityUser(item.value);
                case 'actived-user-overview':
                  return handleSetMonthActiveUser(item.value);
                case 'conversion-dashboard':
                  return handleSetMonthActiveUserTransaction(item.value);
                default:
                  return handleSetMonthActivityUser(item.value);
              }
            }}
            valueProduct={optionProduct.find((item) => item.value === activeUserTransaction?.params?.product)}
            optionProduct={optionProduct}
            onHandleSelectProduct={(item) => {
              if (queryTab === 'conversion-dashboard') {
                handleSetProductActiveUserTransaction(item.value);
              }
            }}
          />
          {['marketing-dashboard', 'actived-user-overview'].includes(queryTab) && (
            <DeviceUsed data={dataDeviceUsed} />
          )}

          {['actived-user-overview'].includes(queryTab) && (
            <div className={cx('grid grid-cols-2 gap-6')}>
              <FeatureBar
                title='Most Visited Feature'
                description='Informasi fitur yang sering dikunjungi oleh user'
                data={dataMostVisitedFeature}
                valueMonth={month.find((item) => item.value === mostVisitedFeature?.params?.month)}
                optionMonth={month}
                onHandleSelectMonth={(item) => {
                  handleSetMonthMostVisitedFeature(item.value);
                }}
              />
              <FeatureBar
                title='Most Read Article'
                description='Informasi kategori artikel yang populer dibaca user'
                data={dataMostReadArticle}
                valueMonth={month.find((item) => item.value === mostReadArticle?.params?.month)}
                optionMonth={month}
                onHandleSelectMonth={(item) => {
                  handleSetMonthMostReadArticle(item.value);
                }}
              />
            </div>
          )}

          {['conversion-dashboard'].includes(queryTab) && (
            <FeatureBar
              title='Most Used Feature'
              description='Informasi user yang sering menggunakan fitur pada mediverse'
              data={dataMostUsedFeature}
              valueMonth={month.find((item) => item.value === mostUsedFeature?.params?.month)}
              optionMonth={month}
              onHandleSelectMonth={(item) => {
                handleSetMonthMostUsedFeature(item.value);
              }}
            />
          )}
          {['marketing-dashboard'].includes(queryTab) && (
            <UserComparison
              dataAge={dataChartAge}
              dataGender={dataChartGender}
            />
          )}
        </>
      )}

      {/** Operator Apotek */}
      {APOTEK_ROLE.includes(role?.name) && (
        <>
          <TodayActivity
            data={todayActivityPharmacy}
            role={role}
            title="Aktivitas Apotek Hari Ini"
            subTitle="Statistik aktivitas penjualan produk apotek"
          />
          <SalesActivityMonth
            title="Aktivitas Penjualan Bulan Ini"
            subTitle='Informasi statistik penjualan produk yang dijual di Mediverse'
            titleCardPrimary='Potensi Penjualan'
            titleCardSecondary='Produk Terjual'
            data={monthActivityPharmacy}
            icon={<SalesPotentialIcon width={iconSize.width} height={iconSize.height} />}
            iconsold={<SoldIcon width={iconSize.width} height={iconSize.height} color={'#8756EF'} />}
            bgIconSold={'#FAEEFF'}
          />
        </>
      )}

      {/** Admin Provider Medpharm */}
      {PROVIDER_MEDPHARM_ROLE.includes(role?.name) && (
        <>
          <TodayActivity
            data={todayActivityPharmacy}
            role={role}
            title="Aktivitas Apotek Hari Ini"
            subTitle="Statistik aktivitas penjualan produk di semua apotek"
          />
          <IncomeMonth
            data={currentMonthIncomeProvider}
            iconIncome={<PaymentIcon />}
            iconService={<CutPaymentIcon />}
            iconSpending={<PriceTagIcon />}
          />
          <SalesActivityMonth
            data={currentMonthActivityProvider}
            title="Aktivitas Penjualan Bulan Ini"
            subTitle='Informasi statistik penjualan produk yang dijual di Mediverse'
            titleCardPrimary='Potensi Penjualan'
            titleCardSecondary='Produk Terjual'
          />
          <EstimationExpense
            type={'medpharm'}
            data={currentMonthEstimationExpenseData}
          />
        </>
      )}

      {/* Admin Provider Medpoint */}
      {OPERATOR_MEDPOINT_ROLE.includes(role?.name) && (
        <>
          <TodayActivity
            role={role}
            title="Aktivitas Faskes Hari Ini"
            data={dataTodayActivityHealthFacility}
            subTitle="Statistik aktivitas pemesanan layanan faskes"
          />
          <IncomeMonth
            data={currentMonthIncomeProvider}
            iconIncome={<PaymentIcon />}
            iconService={<CutPaymentIcon />}
            iconSpending={<PriceTagIcon />}
          />
          <OrderActivityMonth
            data={currentMonthActivityProvider}
            title="Aktivitas Pemesanan Bulan Ini"
            subTitle='Informasi statistik pemesanan layanan yang tersedia di Mediverse'
            titleCardPrimary='Potensi Pemesanan'
            titleCardSecondary='Layanan Selesai Terpesan'
            role={role}
            icon={<DateSquareIcon />}
            iconsold={<StethoscopeSquareIcon />}
            bgIcon={'#FFEDE1'}
            bgIconSold={'#FAEEFF'}
          />
          <EstimationExpense
            type={'medpoint'}
            data={currentMonthEstimationExpenseData}
          />
        </>
      )}

      {/* Admin Finance */}
      {ADMIN_FINANCE_MEDPHARM.includes(role?.name) && (
        <>
          {
            ADMIN_FINANCE_PROVIDER.includes(role?.name) ? (
              <IncomeMonthProvid />
            ) :
            (
              <MediverseIncomeMonth/>
            )
          }
          <IncomeHistories/>
        </>
      )}
      {/* Operator Faskes */}
      {OPERATOR_FASKES.includes(role?.name) && (
        <>
          <TodayActivity
            role={role}
            data={dataTodayActivityHealthFacility}
            title="Aktivitas Faskes Hari Ini"
            subTitle='Statistik aktivitas pemesanan layanan faskes'
          />
          <OrderActivityMonth
            data={dataCurrentMonthActivityHealthFacility}
            role={role}
            title="Aktivitas Pemesanan Bulan Ini"
            subTitle='Informasi statistik pemesanan layanan yang tersedia di Mediverse'
            titleCardPrimary='Potensi Pemesanan'
            titleCardSecondary='Layanan Selesai Terpesan'
            icon={<DateSquareIcon />}
            iconsold={<StethoscopeSquareIcon />}
            bgIcon={'#FFEDE1'}
            bgIconSold={'#FAEEFF'}
          />
        </>
      )}

      {/* Admin Marketing */}
      {ADMIN_MARKETING_ROLE.includes(role?.name) && (
        <>
          <VoucherInformation
            cashback={voucherCashback}
            freeDelivery={voucherFreeDelivery}
          />
          <FunnelGraph
            data={funnel}
            isLoading={isLoadingFunnel}
            selectedProvider={selectedFunnelProvider}
            onChange={handleSelectedFunnelProvider}
          />
        </>
      )}

      {!dashboardRole.includes(role?.name) && (
        <Typography variant={'h1'} color="text-primary" customClass={cx('mt-2')}>
          Loading...
        </Typography>
      )}
    </>
  );
};

export default Dashboard;
