import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NProgress from 'nprogress';

import { USER_ROLES } from '@/src/constants';
import Callback from '@/pages/Auth/callback';
import DoctorRoute from '@/src/routes/doctor';
import ProtectRoute from './protect';
import routes from '@/home/home.routes';
import cookieUtils from '@/src/utils/cookieUtils';

// Routes Auth
const Login = lazy(() => import('@/pages/Auth/Login'));
const Home = lazy(() => import('@/pages/Home'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Routes Master Doctors
const MedpointDoctors = lazy(() => import('@/src/pages/Doctors'));
const DetailMedpointDoctor = lazy(
  () => import('@/src/pages/Doctors/DetailDoctor')
);
const LoginDoctor = lazy(() => import('@/src/pages/Doctors/LoginDoctor'));

// Routes Master Transactions
const Queue = lazy(() => import('@/home/MasterTransactionV2/Queue'));
const Register = lazy(
  () => import('@/home/MasterTransactionV2/Queue/register')
);
// Clinic/Outpatient
const ClinicOutpatient = lazy(
  () => import('@/home/MasterTransactionV2/ClinicOutpatient')
);
const PatientExamination = lazy(
  () =>
    import(
      '@/home/MasterTransactionV2/ClinicOutpatient/patient-examination/PatientExamination'
    )
);
const PatientTreatment = lazy(
  () =>
    import(
      '@/home/MasterTransactionV2/ClinicOutpatient/patient-treatment/PatientTreatment'
    )
);
// Vaccination
const Vaccinations = lazy(
  () => import('@/home/MasterTransactionV2/Vaccination')
);
const VaccinationCheckup = lazy(
  () => import('@/home/MasterTransactionV2/Vaccination/checkup/Checkup')
);
const VaccinationProcedure = lazy(
  () => import('@/home/MasterTransactionV2/Vaccination/treatment/Treatment')
);
// Laboratory
const Laboratoriums = lazy(
  () => import('@/home/MasterTransactionV2/Laboratorium')
);
// Payment
const Payment = lazy(
  () => import('@/home/MasterTransactionV2/Payment/payments')
);
const DetailPayment = lazy(
  () => import('@/home/MasterTransactionV2/Payment/DetailPayment')
);

// Routes Master Users
const Patients = lazy(() => import('@/home/MasterUserV2/PatientData'));
const DetailPatient = lazy(
  () => import('@/home/MasterUserV2/PatientData/PatientDataDetail')
);

const pages = {
  dashboard: Home,
  queue: Queue,
  register: Register,
  payment: Payment,
  'detail-payment': DetailPayment,
  'clinic-outpatients': ClinicOutpatient,
  'clinic-outpatient-examination': PatientExamination,
  'clinic-outpatient-treatment': PatientTreatment,
  vaccinations: Vaccinations,
  'vaccination-checkup': VaccinationCheckup,
  'vaccination-procedure': VaccinationProcedure,
  laboratoriums: Laboratoriums,
  patients: Patients,
  'detail-patient': DetailPatient,
};

const AppRoute = () => {
  const LazyLoad = () => {
    useEffect(() => {
      NProgress.start();

      return () => {
        NProgress.done();
      };
    }, []);

    return <></>;
  };

  return (
    <Routes>
      <Route
        path='/login'
        element={
          <Suspense fallback={<LazyLoad />}>
            <Login />
          </Suspense>
        }
      />
      <Route path='/callback' element={<Callback />} />
      <Route element={<ProtectRoute />}>
        {routes.map((route, idx) => {
          const pageName = route.name.toLocaleLowerCase();
          const Page = pages[pageName];
          if (route.routes !== '#' && route.isAuthenticated && Page) {
            return <Route key={idx} path={route.routes} element={<Page />} />;
          } else {
            <Route element={<NotFound />} />;
          }
        })}
        ;
        <Route path='*' element={<NotFound />} />
      </Route>
      <Route element={<DoctorRoute />}>
        {cookieUtils.getPermission()?.role.name.toLowerCase() ===
        USER_ROLES.DOKTER.toLowerCase() ? (
          <Route>
            <Route path='/login-doctors' element={<LoginDoctor />} />
            <Route path='/doctors' element={<MedpointDoctors />} />
            <Route path='/doctor/:id' element={<DetailMedpointDoctor />} />
          </Route>
        ) : (
          <Route element={<NotFound />} />
        )}
      </Route>
    </Routes>
  );
};

export default AppRoute;
