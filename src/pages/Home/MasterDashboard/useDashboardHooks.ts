import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import {
  ROLES_NAME,
  ROUTES,
  ROUTES_TRANSACTION,
  TRANSACTION_STATUS_RESPONSE,
} from '@/src/constants';
import {
  resolvCurrentMonthActivityProvider,
  resolvCurrentMonthIncomeProvider,
  resolveActivityChartPharmacy,
  resolveChartActivityHealthFacility,
  resolveChartAgeComparison,
  resolveChartGenderComparison,
  resolveCurrentMonthActivityHealthFacility,
  resolveCurrentMonthEstimationExpense,
  resolveFunnelTransactions,
  resolveGetActiveUserProduct,
  resolveGetChartActiveUser,
  resolveGetChartPerformanceYear,
  resolveGetChartPurchaseUser,
  resolveGetDataActiveUser,
  resolveGetDataActivityUser,
  resolveGetDataDeviceUsed,
  resolveGetDataMostReadArticle,
  resolveGetDataMostUsedFeature,
  resolveGetDataMostVisitedFeature,
  resolveGetVoucherCashback,
  resolveGetVoucherFreeDelivery,
  resolveMonthActivityPharmacy,
  resolvePurchaseCurrentMonth,
  resolvePurchaseValueMonth,
  resolveSaleTransactionCategory,
  resolveStatisticCurrentMonth,
  resolveTodayActivityHealthFacility,
  resolveTodayActivityPharmacy,
  resolvGetDataMap,
  setCurrentMonthEstimationExpense,
  setDataUserLocation,
  setFilterStatisticPharmacy,
  setParams,
  setParamsChartPerformance,
  setSelectedFunnelProvider,
  setSelectedProviderType,
  setSelectedYear,
  setSelectedYearChartHealthFacility,
} from '@/store/dashboard/dashboard.reducer';
import {
  mapChartActivityPotentialOrder,
  mapChartActivityTreatmentCompleted,
  mapChartAge,
  mapChartCumulativePerformanceYear,
  mapChartCumulativePurchaseUser,
  mapChartGender,
  mapChartPerformanceYear,
  mapChartPurchaseUser,
  mapCurrentMonthActivityProvider,
  mapCurrentMonthIncomeProvider,
  mapDataChartActiveUser,
  mapDataChartCumulativeActiveUser,
  mapDataMostReadArticle,
  mapDataMostUsedFeature,
  mapDataMostVisitedFeature,
  mapDataPurchasePerMonth,
  mapDataUserActive,
  mapDataUserActiveConversion,
  mapDataUserActivity,
  mapDeviceUsed,
  mapEstimationExpenseProvider,
  mapPurchaseCurrentMonth,
  mapStatisticCurrentMonth,
  mapStatisticPotentialSale,
  mapStatisticProductSold,
  mapTodayActivityHealthFacility,
  mapTodayActivityPharmacy,
  mapTransactionFunnel,
  mapTransactionSale,
  mapVoucher,
} from '@/src/mappers/dashboard';
import { resolveClaimPrescription } from '@/src/store/ePrescription/ePrescription.reducer';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import { orderStatusText } from '@/src/utils/orderStatus';
import { outletDocumentId } from '@/src/utils/getDocumentId';
import useBus from '@/src/hooks/useBus';
import useQuery from '@/src/hooks/useQuery';
import cookieUtils from '@/src/utils/cookieUtils';

import { isEmpty } from 'lodash';

const { role } = (await cookieUtils.getPermission()) || {
  role: {},
};

export const MEDIVERSE_ROLE = [
  ROLES_NAME.SUPER_ADMIN,
  ROLES_NAME.ADMINISTRATOR_MEDIVERSE,
  ROLES_NAME.SUPER_ADMIN_VIEW_ONLY,
  ROLES_NAME.ADMINISTRATOR_MEDIVERSE_VIEW_ONLY,
];

export const MEDIVERSE_FINANCE_ROLE = [ROLES_NAME.ADMINISTRATOR_FINANCE];

export const APOTEK_ROLE = [
  ROLES_NAME.ADMIN_APOTEK,
  ROLES_NAME.MARKETING_APOTEK,
  ROLES_NAME.OPERATOR_APOTEK,
];

export const PROVIDER_MEDPHARM_ROLE = [
  ROLES_NAME.ADMINISTRATOR_PROVIDER_MEDPHARM,
  ROLES_NAME.ADMINISTRATOR_PROVIDER,
  ROLES_NAME.ADMIN_PROVIDER,
];

export const PROVIDER_MEDPOINT_ROLE = [
  ROLES_NAME.ADMINISTRATOR_PROVIDER_MEDPOINT,
  ROLES_NAME.ADMINISTRATOR_PROVIDER,
  ROLES_NAME.ADMIN_PROVIDER,
  ROLES_NAME.MARKETING_FASKES,
  ROLES_NAME.FINANCE_FASKES,
];

export const OPERATOR_MEDPOINT_ROLE = [
  ROLES_NAME.ADMINISTRATOR_FASYANKES,
  ROLES_NAME.ADMIN_FASYANKES,
  ROLES_NAME.OPERATOR_FASYANKES,
  ROLES_NAME.ADMIN_FASKES,
  ROLES_NAME.FINANCE_FASKES,
  ROLES_NAME.FINANCE_DOKTER,
  ROLES_NAME.MARKETING_FASKES,
  ROLES_NAME.MARKETING_DOKTER,
  ROLES_NAME.ADMINISTRATOR_PROVIDER_MEDPOINT,
];

export const ADMIN_MARKETING_ROLE = [
  ROLES_NAME.ADMINISTRATOR_MARKETING,
  ROLES_NAME.OPERATOR_MARKETING,
  ROLES_NAME.ADMIN_MARKETING,
];

export const ADMIN_FINANCE_MEDPHARM = [
  ROLES_NAME.ADMINISTRATOR_FINANCE,
  ROLES_NAME.ADMIN_FINANCE,
  ROLES_NAME.FINANCE_APOTEK,
  ROLES_NAME.MARKETING_APOTEK,
  ROLES_NAME.FINANCE_PROVIDER,
];

export const ADMIN_FINANCE_PROVIDER = [
  ROLES_NAME.FINANCE_APOTEK,
  ROLES_NAME.FINANCE_PROVIDER,
];

export const OPERATOR_FASKES = [ROLES_NAME.OPERATOR_FASKES];

const month = [
  { label: 'January', value: 1 },
  { label: 'Februari', value: 2 },
  { label: 'Maret', value: 3 },
  { label: 'April', value: 4 },
  { label: 'Mei', value: 5 },
  { label: 'Juni', value: 6 },
  { label: 'Juli', value: 7 },
  { label: 'Agustus', value: 8 },
  { label: 'September', value: 9 },
  { label: 'Oktober', value: 10 },
  { label: 'November', value: 11 },
  { label: 'Desember', value: 12 },
];

const optionProduct = [
  { label: 'All Product', value: '' },
  { label: 'Medevo', value: 'medevo' },
  { label: 'Medpoint', value: 'medpoint' },
  { label: 'Medpharm', value: 'medpharm' },
];

const useDashboard = () => {
  const { isMobile } = useWindowSize();
  const dispatch = useDispatch();
  const search = useLocation().search;
  const queryTab = useQuery().get('tab') || 'marketing-dashboard';
  const type = new URLSearchParams(search).get('t') || 'gross';
  const navigate = useNavigate();
  const detailUser = cookieUtils.getUser();

  const [pushNotification, setPushNotification] = useState<any>([]);
  const [pushNotificationmobile, setPushMobile] = useState<any>([]);

  const {
    map,
    funnel,
    purchase,
    deviceUsed,
    activeUser,
    activityUser,
    voucherCashback,
    chartComparison,
    transactionSale,
    mostReadArticle,
    mostUsedFeature,
    chartPerformance,
    purchaseValueMonth,
    userActiveLocation,
    mostVisitedFeature,
    voucherFreeDelivery,
    activeUserTransaction,
    todayActivityPharmacy,
    monthActivityPharmacy,
    selectedFunnelProvider,
    statisticCurrentMonth,
    chartActivityPharmacy,
    currentMonthIncomeProvider,
    todayActivityHealthFacility,
    chartActivityHealthFacility,
    currentMonthActivityProvider,
    currentMonthEstimationExpense,
    currentMonthActivityHealthFacility,
  } = useSelector((state: RootStateOrAny) => state.dashboard);

  const { notification } = useSelector(
    (state: RootStateOrAny) => state.notification
  );

  const { ePrescription } = useSelector(
    (state: RootStateOrAny) => state.ePrescription
  );

  const getDataMapByCoordinates = (coordinates: number[][]) => {
    dispatch(
      resolvGetDataMap({
        coordinates: coordinates,
      })
    );
  };

  // Handle set month activity user
  const handleSetMonthActivityUser = (value) => {
    dispatch(setParams({ state: 'activityUser', name: 'month', value }));
    dispatch(
      resolveGetDataActivityUser({
        month: value,
      })
    );
  };

  // Handle set month active user
  const handleSetMonthActiveUser = (value) => {
    dispatch(setParams({ state: 'activeUser', name: 'month', value }));
    dispatch(
      resolveGetDataActiveUser({
        month: value,
        product: activeUser.params.product,
      })
    );
  };

  // Handle set product active user
  const handleSetProductActiveUserTransaction = (value) => {
    dispatch(
      setParams({ state: 'activeUserTransaction', name: 'product', value })
    );
    dispatch(
      resolveGetActiveUserProduct({
        month: activeUserTransaction.params.month,
        product: value,
      })
    );
  };

  const handleSetMonthActiveUserTransaction = (value) => {
    dispatch(
      setParams({ state: 'activeUserTransaction', name: 'month', value })
    );
  };

  // Handle set month most visited feature
  const handleSetMonthMostVisitedFeature = (value) => {
    dispatch(setParams({ state: 'mostVisitedFeature', name: 'month', value }));
    dispatch(
      resolveGetDataMostVisitedFeature({
        month: value,
      })
    );
  };

  // Handle set month most read article
  const handleSetMonthMostReadArticle = (value) => {
    dispatch(setParams({ state: 'mostReadArticle', name: 'month', value }));
    dispatch(
      resolveGetDataMostReadArticle({
        month: value,
      })
    );
  };

  // Handle set month most used feature
  const handleSetMonthMostUsedFeature = (value) => {
    dispatch(setParams({ state: 'mostUsedFeature', name: 'month', value }));
    dispatch(
      resolveGetDataMostUsedFeature({
        month: value,
      })
    );
  };

  // get chart all year performance
  const handleGetChartPerformanceYear = () => {
    const payload = {
      year: chartPerformance.allYearPerformance.params.year,
    };
    dispatch(resolveGetChartPerformanceYear(payload));
  };

  // get chart montly active user
  const handleGetChartActiveUser = () => {
    const payload = {
      year: chartPerformance.monthlyActiveUser.params.year,
    };
    dispatch(resolveGetChartActiveUser(payload));
  };

  // get chart purchase user performance
  const handlGetChartPurchaseUser = () => {
    const payload = {
      year: chartPerformance.purchaseUser.params.year,
    };
    dispatch(resolveGetChartPurchaseUser(payload));
  };

  // Handle get data in tab marketing dashboard
  const handleGetTabMarketingDashboard = () => {
    dispatch(resolveGetDataDeviceUsed());
    dispatch(
      resolveGetDataActivityUser({
        month: activityUser?.params?.month,
      })
    );
    handleGetChartPerformanceYear();
    handleGetChartComparison();
  };

  // handle get data in tab actived user overview
  const handleGetTabActivedUserOverview = () => {
    dispatch(resolveGetDataDeviceUsed());
    dispatch(
      resolveGetDataActiveUser({
        month: activeUser?.params?.month,
      })
    );
    dispatch(
      resolveGetDataMostReadArticle({
        month: mostReadArticle?.params?.month,
      })
    );
    dispatch(
      resolveGetDataMostVisitedFeature({
        month: mostVisitedFeature?.params?.month,
      })
    );
    handleGetChartActiveUser();
  };

  // handle get data in tab conversion dashboard
  const handleGetTabConversionDashboard = () => {
    dispatch(
      resolveGetActiveUserProduct({
        month: activeUserTransaction?.params?.month,
        product: activeUserTransaction?.params?.product,
      })
    );
    dispatch(
      resolveGetDataActiveUser({
        month: activeUser?.params?.month,
      })
    );
    dispatch(
      resolveGetDataMostUsedFeature({
        month: mostUsedFeature?.params?.month,
      })
    );
    handlGetChartPurchaseUser();
    handleGetPurchaseValue();
  };

  // get  purchase value per month
  const handleGetPurchaseValue = () => {
    const payload = {
      month: purchaseValueMonth?.params?.month,
    };
    dispatch(resolvePurchaseValueMonth(payload));
  };

  // get chart comparison
  const handleGetChartComparison = () => {
    dispatch(resolveChartAgeComparison());
    dispatch(resolveChartGenderComparison());
  };

  const handleSetMonthPurchase = (value) => {
    dispatch(setParams({ state: 'purchaseValueMonth', name: 'month', value }));
    const payload = {
      month: value,
      product: purchaseValueMonth.params.product,
    };
    dispatch(resolvePurchaseValueMonth(payload));
  };

  const handleSetYearChartActiveUser = (value) => {
    dispatch(
      setParamsChartPerformance({
        name: 'monthlyActiveUser',
        state: 'year',
        value,
      })
    );
    const payload = {
      year: value,
    };
    dispatch(resolveGetChartActiveUser(payload));
  };

  const handleSetProductPurchase = (value) => {
    dispatch(
      setParams({ state: 'purchaseValueMonth', name: 'product', value })
    );
    const payload = {
      month: purchaseValueMonth.params.month,
      product: value,
    };
    dispatch(resolvePurchaseValueMonth(payload));
  };

  const handleFetchDataSuperAdmin = () => {
    if (MEDIVERSE_ROLE.includes(role?.name)) {
      dispatch(resolvePurchaseCurrentMonth());
      dispatch(resolveSaleTransactionCategory());
      dispatch(
        resolveFunnelTransactions({
          provider: selectedFunnelProvider.value,
        })
      );
      handleGetChartComparison();
    }
  };

  const handleGetDataDashboardPharmacy = () => {
    if (APOTEK_ROLE.includes(role?.name)) {
      dispatch(resolveTodayActivityPharmacy());
      dispatch(resolveMonthActivityPharmacy());
    }
  };

  // to params current Expense month
  const yearMonth = `${currentMonthEstimationExpense.year}-${currentMonthEstimationExpense.month}`;

  const handleGetDataDashboardMedpharm = () => {
    if (PROVIDER_MEDPHARM_ROLE.includes(role?.name)) {
      dispatch(resolveTodayActivityPharmacy());
      dispatch(resolvCurrentMonthIncomeProvider());
      dispatch(resolvCurrentMonthActivityProvider());
      dispatch(resolveCurrentMonthEstimationExpense(yearMonth));
    }
  };

  const handleGetDataDashboardMedpoint = () => {
    if (PROVIDER_MEDPOINT_ROLE.includes(role?.name)) {
      dispatch(resolveTodayActivityHealthFacility());
      dispatch(resolvCurrentMonthIncomeProvider());
      dispatch(resolvCurrentMonthActivityProvider());
      dispatch(resolveCurrentMonthEstimationExpense(yearMonth));
    }
  };

  const handleGetChartPharmacy = () => {
    const payload = {
      year: chartActivityPharmacy.year,
      month: chartActivityPharmacy.month,
      previousMonth: true,
    };
    dispatch(resolveActivityChartPharmacy(payload));
  };

  // get data chart order revenue
  const handleGetChartOrderRevenue = () => {
    const payload = {
      year: chartActivityPharmacy.year,
      previousYear: true,
      isComplete: true,
    };
    dispatch(resolveActivityChartPharmacy(payload));
  };

  const handleFetchChartOrderRevenue = (year: number) => {
    const payload = {
      year,
      previousYear: true,
      isComplete: true,
    };
    dispatch(resolveActivityChartPharmacy(payload));
  };

  const handleFetchStatisticCurrentMonth = (
    year: number,
    type: string,
    provider = ''
  ) => {
    dispatch(
      resolveStatisticCurrentMonth({
        year: year,
        type: type,
        provider: provider,
      })
    );
  };

  const handleSelectedFunnelProvider = (provider: {
    label: string;
    value: string;
  }) => {
    dispatch(setSelectedFunnelProvider(provider));
    dispatch(
      resolveFunnelTransactions({
        provider: provider.value,
      })
    );
  };

  const handleFetchDataAdminMarketing = () => {
    if (ADMIN_MARKETING_ROLE.includes(role?.name)) {
      dispatch(resolveGetVoucherCashback());
      dispatch(resolveGetVoucherFreeDelivery());
      dispatch(
        resolveFunnelTransactions({
          provider: selectedFunnelProvider.value,
        })
      );
    }
  };

  const handleSelectedYearOrderRevenue = (year: number) => {
    dispatch(setSelectedYear(year));
    handleFetchChartOrderRevenue(year);
  };

  const handleStatisticSelectedYear = (year: number) => {
    dispatch(setSelectedYear(year));
    handleFetchStatisticCurrentMonth(year, type);
  };

  const handleSelectedProviderType = (type) => {
    dispatch(setSelectedProviderType(type));
  };

  const handleOpenModal = (value, isMobile) => {
    if (isMobile) {
      dispatch(setFilterStatisticPharmacy({ name: 'openModal', value }));
    } else {
      dispatch(setFilterStatisticPharmacy({ name: 'isOpen', value }));
    }
  };

  const handleSetMonth = (value) => {
    dispatch(setFilterStatisticPharmacy({ name: 'month', value }));
  };

  const handleSetYear = (value) => {
    dispatch(setFilterStatisticPharmacy({ name: 'year', value }));
  };

  const handleValueMonth = (value) => {
    if (value) {
      dispatch(
        resolveGetDataActiveUser({
          month: activeUser?.params?.month,
        })
      );
      return month.find((item) => item.value === value)?.label;
    }
    return '-';
  };

  // handle modal filter expense
  const handleModalExpense = (name, value) => {
    dispatch(setCurrentMonthEstimationExpense({ name, value }));
  };

  const handleSetMonthExpense = (value) => {
    dispatch(setCurrentMonthEstimationExpense({ name: 'month', value }));
  };

  const handleSetYearExpense = (value) => {
    dispatch(setCurrentMonthEstimationExpense({ name: 'year', value }));
  };

  // get current month expense
  const getCurrentMonthExpense = () => {
    dispatch(resolveCurrentMonthEstimationExpense(yearMonth));
  };

  const handleFetchTodayActivityHealthFacility = () => {
    if (OPERATOR_FASKES.includes(role?.name)) {
      dispatch(resolveTodayActivityHealthFacility());
      dispatch(resolveCurrentMonthActivityHealthFacility());
    }
  };

  const handleGetChartHelathFacility = () => {
    if (OPERATOR_FASKES.includes(role?.name)) {
      dispatch(
        resolveChartActivityHealthFacility({
          year: chartActivityHealthFacility?.selectedYear,
        })
      );
    }
  };

  const handleChartHealthFacilitySelectedYear = (year: number) => {
    dispatch(setSelectedYearChartHealthFacility(year));
    dispatch(
      resolveChartActivityHealthFacility({
        year: year,
      })
    );
  };

  const handleSetYearPerformance = (value) => {
    dispatch(
      setParamsChartPerformance({
        name: 'allYearPerformance',
        state: 'year',
        value,
      })
    );
    const payload = {
      year: value,
    };
    dispatch(resolveGetChartPerformanceYear(payload));
  };

  const handleSetMonthUserActive = (value) => {
    dispatch(setParams({ state: 'userActiveLocation', name: 'month', value }));
  };

  const handleSetYearPurchaseUser = (value) => {
    dispatch(
      setParamsChartPerformance({ name: 'purchaseUser', state: 'year', value })
    );
    const payload = {
      year: value,
    };
    dispatch(resolveGetChartPurchaseUser(payload));
  };

  const handleSetDataUserLocation = (name, value) => {
    dispatch(setDataUserLocation({ name, value }));
  };

  const playAudio = () => {
    notification.audio.play();
    notification.audio.loop = true;
  };

  // Listener notification
  const getDataNotification = () => {
    useBus.on('pushNotification', (data) => {
      const arrayData = Object.keys(data).map((key) => data[key]);
      const isMyProvider = JSON.parse(data.notification.Audiences).find(
        (audien) => {
          return (
            audien.type === 'provider' &&
            audien.type_id === detailUser?.provider_id
          );
        }
      );

      const filterOutlet = arrayData.find((item) =>
        JSON.parse(item?.CustomData)
          .map((item) => item.type_id)
          .includes(detailUser?.outlet_id)
      );

      if (
        arrayData.map(
          (item) =>
            JSON.parse(item?.CustomData)[0]?.type_id === detailUser?.outlet_id
        )[0] &&
        data?.notification?.Type === 'medpharm'
      ) {
        if (!isEmpty(isMyProvider))
          setPushNotification((datas) => [...datas, filterOutlet]);
      } else if (data?.notification?.Type === 'e-prescription') {
        if (
          JSON.parse(data?.notification?.CustomData)
            .map((item) => item.type_id)
            .includes(detailUser?.outlet_id)
        ) {
          setPushNotification((datas) => [...datas, data?.notification]);
          playAudio();
        }
      }
    });
  };

  // claim epress order
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

  // direct epress to detail order
  const handleNavigateDetailPrescription = ({ id, status, showChat }) => {
    if (status !== TRANSACTION_STATUS_RESPONSE.NEW) {
      showChat
        ? navigate(`${ROUTES_TRANSACTION.PRESCRIPTION_ORDER}/${id}?chat=true`)
        : navigate(`${ROUTES_TRANSACTION.PRESCRIPTION_ORDER}/${id}`);
    } else {
      handleClaimPrescription(id);
    }
  };

  // browser notification
  const showNotification = () => {
    if (!isMobile) {
      pushNotification.map((item) => {
        const metadata = item?.CustomData
          ? JSON.parse(JSON.parse(item?.CustomData)[0]?.metadata)
          : null;
        const notificationTemplate = item?.NotificationTemplate
          ? JSON.parse(item?.NotificationTemplate)
          : null;

        const idOrderEpress = metadata
          ? metadata?.transaction_prescription_id
          : 0;
        const idOrderMedpharm = metadata ? metadata?.transaction_type_id : 0;
        const notificationTitle = notificationTemplate
          ? notificationTemplate?.status
          : 'Pesanan E-prescription';
        const notificationSubtitle = notificationTemplate
          ? notificationTemplate?.sub_title
          : 'chat dari customer';
        const status = notificationTemplate ? notificationTemplate?.status : '';
        const showChat = item?.type === 'chat';

        const notification = new Notification(
          orderStatusText(notificationTitle),
          {
            body: notificationSubtitle,
            icon: '/icon-192x192.png',
          }
        );
        notification.onclick = (event) => {
          event.preventDefault();
          if (item.Type === 'chats') {
            navigate(`${ROUTES.CHAT}`);
          } else if (item.Type !== 'medpharm') {
            handleNavigateDetailPrescription({
              id: idOrderEpress,
              status,
              showChat,
            });
          } else {
            navigate(`${ROUTES_TRANSACTION.MEDPHARM_ORDER}/${idOrderMedpharm}`);
          }
        };
      });
    }
  };

  // get data notification from service worker
  useEffect(() => {
    if (isMobile) {
      const parentId = outletDocumentId(
        detailUser?.provider_id,
        detailUser?.outlet_id
      );

      const mobileChannel = new BroadcastChannel('mobile-channel');
      mobileChannel.addEventListener('message', (message) => {
        const data = [message.data.data];
        const type = data[0].Type;
        const dataFilter = data.find(
          (item) => JSON.parse(item?.CustomData)[0]?.type_id === parentId
        );
        if (
          data.map(
            (item) => JSON.parse(item?.CustomData)[0]?.type_id === parentId
          )[0] &&
          type === 'medpharm'
        ) {
          setPushMobile((datas) => [...datas, dataFilter]);
        } else if (type === 'e-prescription') {
          if (
            JSON.parse(message.data.data?.CustomData)
              .map((item) => item.type_id)
              .includes(detailUser?.outlet_id)
          ) {
            setPushMobile((datas) => [...datas, data[0]]);
          }
        }
      });
    }
  }, []);

  const dataTodayActivityHealthFacility = mapTodayActivityHealthFacility(
    todayActivityHealthFacility?.data
  );
  const dataCurrentMonthActivityHealthFacility =
    mapCurrentMonthActivityProvider(currentMonthActivityHealthFacility?.data);
  const dataChartPotentialOrderHealthFacility = mapChartActivityPotentialOrder(
    chartActivityHealthFacility?.data?.month,
    chartActivityHealthFacility?.selectedYear
  );
  const dataChartPotentialOrderHealthFacilityPrevious =
    mapChartActivityPotentialOrder(
      chartActivityHealthFacility?.data?.previous_month,
      chartActivityHealthFacility?.selectedYear
    );
  const dataChartSalesRevenue = mapChartActivityPotentialOrder(
    chartActivityPharmacy.data?.month,
    statisticCurrentMonth.selectedYear
  );
  const dataChartSalesRevenuePrevious = mapChartActivityPotentialOrder(
    chartActivityPharmacy.data?.previous_month,
    statisticCurrentMonth.selectedYear
  );
  const dataChartActivityTreatmentCompleted =
    mapChartActivityTreatmentCompleted(
      chartActivityHealthFacility?.data?.month,
      chartActivityHealthFacility?.selectedYear
    );
  const dataChartActivityTreatmentCompletedPrevious =
    mapChartActivityTreatmentCompleted(
      chartActivityHealthFacility?.data?.previous_month,
      chartActivityHealthFacility?.selectedYear
    );
  const selectedYearChartActivityHealthFacility =
    chartActivityHealthFacility?.selectedYear;

  const dataDeviceUsed = mapDeviceUsed(deviceUsed?.data);
  const dataChartAge = mapChartAge(chartComparison.age.data);
  const dataChartGender = mapChartGender(chartComparison.gender.data);
  const dataMostReadArticle = mapDataMostReadArticle(mostReadArticle.data);
  const dataMostUsedFeature = mapDataMostUsedFeature(mostUsedFeature.data);
  const dataPurchasePerMonth = mapDataPurchasePerMonth(purchaseValueMonth.data);
  const dataMostVisitedFeature = mapDataMostVisitedFeature(
    mostVisitedFeature.data
  );
  const dataUserActive = mapDataUserActive(
    activeUser?.data,
    activeUser?.params?.month
  );
  const dataChartPurchaseUser = mapChartPurchaseUser(
    chartPerformance.purchaseUser.data
  );
  const dataChartActiveUser = mapDataChartActiveUser(
    chartPerformance.monthlyActiveUser.data
  );
  const dataUserActivity = mapDataUserActivity(
    activityUser?.data,
    activityUser?.params?.month
  );
  const dataChartPerformanceYear = mapChartPerformanceYear(
    chartPerformance.allYearPerformance.data
  );
  const dataChartCumulative = mapChartCumulativePerformanceYear(
    chartPerformance.allYearPerformance.data
  );
  const dataChartCumulativePurchaseUser = mapChartCumulativePurchaseUser(
    chartPerformance.purchaseUser.data
  );
  const dataChartCumulativeActiveUser = mapDataChartCumulativeActiveUser(
    chartPerformance.monthlyActiveUser.data
  );
  const dataUserActiveConversion = mapDataUserActiveConversion(
    activeUserTransaction?.data,
    activeUser?.data,
    activeUserTransaction?.params?.month
  );

  return {
    data: {
      role,
      map,
      month,
      queryTab,
      activeUser,
      dataChartAge,
      activityUser,
      notification,
      ePrescription,
      optionProduct,
      dataDeviceUsed,
      dataUserActive,
      dataChartGender,
      mostReadArticle,
      mostUsedFeature,
      dataUserActivity,
      chartPerformance,
      userActiveLocation,
      purchaseValueMonth,
      mostVisitedFeature,
      dataChartActiveUser,
      dataMostReadArticle,
      dataMostUsedFeature,
      dataChartCumulative,
      dataPurchasePerMonth,
      dataChartPurchaseUser,
      activeUserTransaction,
      dataChartSalesRevenue,
      pushNotificationmobile,
      dataMostVisitedFeature,
      dataChartPerformanceYear,
      dataUserActiveConversion,
      dataChartSalesRevenuePrevious,
      dataChartCumulativeActiveUser,
      dataChartCumulativePurchaseUser,
      pushNotification: pushNotification.reverse(),
      voucherCashback: mapVoucher(voucherCashback.data),
      voucherFreeDelivery: mapVoucher(voucherFreeDelivery.data),
      transactionSale: mapTransactionSale(transactionSale.data),
      chartActivityPharmacy,
      todayActivityPharmacy: mapTodayActivityPharmacy(
        todayActivityPharmacy.data
      ),
      monthActivityPharmacy: mapCurrentMonthActivityProvider(
        monthActivityPharmacy.data
      ),
      funnel: mapTransactionFunnel(funnel.data),
      isLoadingFunnel: funnel.isLoading,
      selectedFunnelProvider,
      purchase: mapPurchaseCurrentMonth(purchase.data),
      statisticCurrentMonthValue: mapStatisticCurrentMonth(
        statisticCurrentMonth.data,
        statisticCurrentMonth.selectedYear
      ),
      statisticCurrentMonth,
      statisticCurrentMonthYear: statisticCurrentMonth.selectedYear,
      activityPharmacyProductSold: mapStatisticProductSold(
        chartActivityPharmacy?.data?.month,
        chartActivityPharmacy?.month,
        chartActivityPharmacy.year
      ),
      activityPharmacyPotential: mapStatisticPotentialSale(
        chartActivityPharmacy?.data?.month,
        chartActivityPharmacy?.month,
        chartActivityPharmacy.year
      ),
      activityProductPrevious: mapStatisticProductSold(
        chartActivityPharmacy?.data?.previous_month,
        chartActivityPharmacy?.month,
        chartActivityPharmacy.year
      ),
      activityPharmacyPreviousMonth: mapStatisticPotentialSale(
        chartActivityPharmacy?.data?.previous_month,
        chartActivityPharmacy?.month,
        chartActivityPharmacy.year
      ),
      currentMonthIncomeProvider: mapCurrentMonthIncomeProvider(
        currentMonthIncomeProvider.data
      ),
      currentMonthActivityProvider: mapCurrentMonthActivityProvider(
        currentMonthActivityProvider.data
      ),
      dataTodayActivityHealthFacility,
      currentMonthEstimationExpense,
      dataCurrentMonthActivityHealthFacility,
      dataChartPotentialOrderHealthFacility,
      dataChartActivityTreatmentCompleted,
      selectedYearChartActivityHealthFacility,
      dataChartActivityTreatmentCompletedPrevious,
      dataChartPotentialOrderHealthFacilityPrevious,
      isOpenModalEstimate: currentMonthEstimationExpense.isOpenModal,
      currentMonthEstimationExpenseData: mapEstimationExpenseProvider(
        currentMonthEstimationExpense.data
      ),
    },
    method: {
      handleSetYear,
      handleSetMonth,
      handleOpenModal,
      showNotification,
      handleValueMonth,
      handleModalExpense,
      getDataNotification,
      setPushNotification,
      handleSetYearExpense,
      handleSetMonthExpense,
      handleSetMonthPurchase,
      getCurrentMonthExpense,
      handleGetChartPharmacy,
      handleClaimPrescription,
      getDataMapByCoordinates,
      handleSetMonthUserActive,
      handleSetMonthActiveUser,
      handleSetYearPerformance,
      handleSetProductPurchase,
      handleSetYearPurchaseUser,
      handleSetDataUserLocation,
      handleFetchDataSuperAdmin,
      handleSetMonthActivityUser,
      handleGetChartOrderRevenue,
      handleSelectedProviderType,
      handleStatisticSelectedYear,
      handleSetYearChartActiveUser,
      handleSelectedFunnelProvider,
      handleGetChartHelathFacility,
      handleSetMonthMostReadArticle,
      handleSetMonthMostUsedFeature,
      handleFetchDataAdminMarketing,
      handleGetTabMarketingDashboard,
      handleGetDataDashboardMedpoint,
      handleGetDataDashboardMedpharm,
      handleGetDataDashboardPharmacy,
      handleSelectedYearOrderRevenue,
      handleGetTabActivedUserOverview,
      handleGetTabConversionDashboard,
      handleFetchStatisticCurrentMonth,
      handleSetMonthMostVisitedFeature,
      handleNavigateDetailPrescription,
      handleSetMonthActiveUserTransaction,
      handleSetProductActiveUserTransaction,
      handleChartHealthFacilitySelectedYear,
      handleFetchTodayActivityHealthFacility,
    },
  };
};

export default useDashboard;
