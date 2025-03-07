import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';

import dashboardReducer from '@/store/dashboard/dashboard.reducer';
import pharmacyReducer from './pharmacy/pharmacy.reducer';
import authReducer from './auth/auth.reducer';
import doctorReducer from './doctor/doctor.reducer';
import vendorReducer from './vendor/vendor.reducer';
import serviceReducer from './service/service.reducer';
import serviceTypes from './serviceTypes/serviceTypes.reducer';
import roleReducer from './role/role.reducer';
import specialistReducer from './specialist/specialist.reducer';
import publicReducer from './public/public.reducer';
import providerReducer from './provider/provider.reducer';
import adminReducer from './admin/admin.reducer';
import poliReducer from './poli/poli.reducer';
import corporateReducer from './corporate/corporate.reducer';
import medicineReducer from './medicine/medicine.reducer';
import businessSchemaReducer from './businessSchema/businessSchema.reducer';
import privacyPolicyReducer from './privacyPolicy/privacyPolicy.reducer';
import productServiceReducer from '@/src/store/productService/productService.reducer';
import platformFeeReducer from '@/src/store/platformFee/platformFee.reducer';
import userReducer from '@/src/store/user/user.reducer';
import symptomReducer from '@/src/store/symptom/symptom.reducer';
import refundReducer from '@/src/store/refund/refund.reducer';
import transactionReducer from '@/src/store/transaction/transaction.reducer';
import transactionReducerCopy from '@/src/store/transaction/transaction.reducerCopy';
import drugCategoryReducer from '@/src/store/drugCategory/drugCategory.reducer';
import drugSubcategoryReducer from '@/src/store/drugSubcategory/drugSubcategory.reducer';
import healthFacilityReducer from '@/src/store/healthFacility/healthFacility.reducer';
import doctorTelmedReducer from '@/src/store/doctorTelmed/doctorTelmed.reducer';
import masterPlatformFeeReducer from '@/src/store/masterPlatformFee/masterPlatformFee.reducer';
import referralCodeReducer from '@/src/store/referralCode/referralCode.reducer';
import profileUserReducer from '@/src/store/profileUser/profileUser.reducer';
import medpointDoctorReducer from '@/src/store/medpointDoctor/medpointDoctor.reducer';
import escrowReducer from '@/src/store/escrow/escrow.reducer';
import searchTagReducer from '@/src/store/searchTag/searchTag.reducer';
import medpointOrderReducer from './medpointOrder/medpointOrder.reducer';
import medpointTreatmentReducer from '@/src/store/medpointTreatment/medpointTreatment.reducer';
import medpharmReducer from '@/src/store/medpharm/medpharm.reducer';
import medevoReducer from '@/src/store/medevo/medevo.reducer';
import ePrescriptionReducer from '@/src/store/ePrescription/ePrescription.reducer';
import discountPackageReducer from '@/src/store/promo/discountPackage.reducer';
import productCouponReducer from '@/src/store/promo/productCoupon.reducer';
import freeDeliveryReducer from '@/src/store/promo/freeDelivery.reducer';
import voucherCashbackReducer from '@/src/store/promo/voucherCashback.reducer';
import cashbackReducer from '@/src/store/promo/cashback.reducer';
import voucherPaketBundlingReducer from '@/src/store/promo/voucherPaketBundling.reducer';
import slotReservationReducer from '@/src/store/slotReservation/slotReservation.reducer';
import drugReducer from '@/src/store/drug/drug.reducer';
import treatmentReducer from '@/src/store/treatment/treatment.reducer';
import treatmentV2Reducer from '@/src/store/treatment/treatmentV2.reducer';
import doctorsReducer from '@/src/store/doctors/doctor.reducer';
import prescriptionReducer from '@/src/store/prescription/prescription.reducer';
import polyReducer from '@/src/store/poly/poly.reducer';
import pharmacyCopyReducer from '@/src/store/pharmacy/pharmacyCopy.reducer';
import drugMasterReducer from '@/src/store/drugMaster/drugMaster.reducer';
import drugStockReducer from '@/src/store/drugStock/drugStock.reducer';
import drugCatalogReducer from '@/src/store/drugCatalog/drugCatalog.reducer';
import transactionV2Reducer from '@/src/store/transaction/transactionsV2.reducer';
import userDoctorReducer from '@/src/store/userDoctor/userDoctor.reducer';
import balanceReducer from '@/src/store/balance/balance.reducer';
import promoReducer from '@/store/promo/promo.reducer';
import generalReducer from '@/src/store/general/general.reducer';
import notificationReducer from '@/src/store/notification/notification.reducer';
import joinPartnerReducer from '@/src/store/joinPartner/joinPartner.reducer';
import questionReducer from '@/src/store/question/question.reducer';
import discountMedpointReducer from '@/src/store/promo/discountMedpoint.reducer';
import discountServiceProductReducer from '@/src/store/promo/discountServiceProduct.reducer';
import bannerReducer from '@/src/store/banner/banner.reducer';
import chatReducer from '@/src/store/chat/chat.reducer';
import productReducer from '@/src/store/product/product.reducer';
import productCatalogReducer from '@/src/store/productCatalog/productCatalog.reducer';
import patientReducer from '@/src/store/patient/patient.reducer';
import locationReducer from '@/src/store/location/location.reducer';
import paymentReducer from '@/src/store/payment/payment.reducer';
import queueReducer from '@/src/store/queue/queue.reducer';
import clinicOutpatientReducer from '@/src/store/clinicOutpatient/clinicOutpatient.reducer';
import vaccinationReducer from '@/src/store/vaccination/vaccination.reducer';
import laboratoriumReducer from '@/src/store/laboratorium/laboratorium.reducer';
import customerReducer from '@/src/store/customer/customer.reducer';

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  pharmacy: pharmacyReducer,
  auth: authReducer,
  doctor: doctorReducer,
  vendor: vendorReducer,
  service: serviceReducer,
  serviceTypes: serviceTypes,
  role: roleReducer,
  specialist: specialistReducer,
  public: publicReducer,
  provider: providerReducer,
  admin: adminReducer,
  poli: poliReducer,
  drug: drugReducer,
  medicine: medicineReducer,
  businessSchema: businessSchemaReducer,
  privacyPolicy: privacyPolicyReducer,
  productService: productServiceReducer,
  corporate: corporateReducer,
  platformFee: platformFeeReducer,
  user: userReducer,
  symptom: symptomReducer,
  refund: refundReducer,
  transaction: transactionReducer,
  transactionCopy: transactionReducerCopy,
  transactionsV2: transactionV2Reducer,
  drugCategory: drugCategoryReducer,
  drugSubcategory: drugSubcategoryReducer,
  healthFacility: healthFacilityReducer,
  doctorTelmed: doctorTelmedReducer,
  masterPlatformFee: masterPlatformFeeReducer,
  referralCode: referralCodeReducer,
  profileUser: profileUserReducer,
  medpointDoctor: medpointDoctorReducer,
  escrow: escrowReducer,
  searchTag: searchTagReducer,
  medpointOrder: medpointOrderReducer,
  medpointTreatment: medpointTreatmentReducer,
  medpharm: medpharmReducer,
  medevo: medevoReducer,
  ePrescription: ePrescriptionReducer,
  discountPackage: discountPackageReducer,
  productCoupon: productCouponReducer,
  freeDelivery: freeDeliveryReducer,
  voucherCashback: voucherCashbackReducer,
  cashback: cashbackReducer,
  discountMedpoint: discountMedpointReducer,
  discountServiceProduct: discountServiceProductReducer,
  slotReservation: slotReservationReducer,
  voucherPaketBundling: voucherPaketBundlingReducer,
  treatment: treatmentReducer,
  treatmentV2: treatmentV2Reducer,
  doctors: doctorsReducer,
  prescription: prescriptionReducer,
  poly: polyReducer,
  pharmacyCopy: pharmacyCopyReducer,
  drugMaster: drugMasterReducer,
  drugStock: drugStockReducer,
  drugCatalog: drugCatalogReducer,
  userDoctor: userDoctorReducer,
  balance: balanceReducer,
  promo: promoReducer,
  general: generalReducer,
  notification: notificationReducer,
  joinPartner: joinPartnerReducer,
  question: questionReducer,
  banner: bannerReducer,
  chat: chatReducer,
  product: productReducer,
  productCatalog: productCatalogReducer,
  patient: patientReducer,
  location: locationReducer,
  payment: paymentReducer,
  queue: queueReducer,
  clinicOutpatient: clinicOutpatientReducer,
  vaccination: vaccinationReducer,
  laboratorium: laboratoriumReducer,
  customer: customerReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof store.getState>;
export default store;
