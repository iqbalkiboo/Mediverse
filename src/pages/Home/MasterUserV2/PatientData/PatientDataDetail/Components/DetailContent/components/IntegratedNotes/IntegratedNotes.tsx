import { useEffect } from 'react';

import { TableV2, Typography } from '@/src/components';
import { formatDate, isDate, isoStringToTime } from '@/utils/formatDate';
import usePatientData from '../../../../../usePatientData';

const baseURLFile = import.meta.env.VITE_APP_BASE_URL_FRAPPE_FILE;

interface IntegratedNotesProps {
  patientId: string;
}

const IntegratedNotes: React.FC<IntegratedNotesProps> = ({ patientId }) => {
  const {
    data: { integratedNotes },
    method: { handleGetIntegratedNotes },
  } = usePatientData();

  useEffect(() => {
    if (patientId) handleGetIntegratedNotes(patientId);
  }, [patientId]);

  const columnNames = [
    {
      Header: 'Waktu',
      id: 'time',
      accessor: 'time',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      width: 'w-[15%]',
      Cell: (props: any) => {
        const data = props.row.original;
        if (!data) return '-';
        return (
          <div className='flex flex-col'>
            <Typography variant='bodySmall' customClass='font-semibold'>
              {isDate(data.transaction_detail.creation)
                ? formatDate(
                    data.transaction_detail.creation,
                    ' ',
                    'MMM',
                    false
                  )
                : '-'}
            </Typography>
            <Typography variant='bodyXSmall'>
              <span>
                {isDate(data.transaction_detail.creation)
                  ? isoStringToTime(data.transaction_detail.creation, false)
                  : '-'}
              </span>
            </Typography>
          </div>
        );
      },
    },
    {
      Header: 'Profesi',
      id: 'user_type',
      accessor: 'user_type',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      width: 'w-[20%]',
      Cell: (props: any) => {
        const data = props.row.original;
        if (!data) return '-';
        return (
          <div>
            <Typography variant='bodySmall' customClass='font-semibold'>
              {data.user_type === 'nurse'
                ? data?.nurse_detail?.first_name
                : data.user_type === 'doctor'
                ? data?.doctor_detail?.first_name
                : '-'}
            </Typography>
            <Typography variant='bodyXSmall'>
              <span>
                {data.user_type === 'nurse'
                  ? 'Perawat'
                  : data.user_type === 'doctor'
                  ? 'Dokter'
                  : '-'}
              </span>
            </Typography>
          </div>
        );
      },
    },
    {
      Header: (
        <p className='text-center'>
          hasil asesmen pasien <br /> (Tulis menggunakaan SOAP, DIBERINAMA DAN
          PARAF DI AKHIR)
        </p>
      ),
      classHeader: 'flex justify-center',
      id: 'result',
      accessor: 'result',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      width: 'w-[35%]',
      Cell: (props: any) => {
        const data = props.row.original;
        if (!data) return '-';
        return (
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <Typography variant='bodySmall' customClass='font-semibold'>
                Subjective
              </Typography>
              <Typography variant='bodyXSmall' customClass='flex flex-col'>
                <span>
                  Psikososial-Spiritual= {data?.psychosocial_spiritual || '-'}
                </span>
                <span>
                  Riwayat Kesehatan Pasien={' '}
                  {data?.patient_health_history || '-'}
                </span>
                <span>
                  Riwayat Kesehatan Keluarga={' '}
                  {data?.family_health_history || '-'}
                </span>
                <span>
                  Riwayat Penggunaan Obat= {data?.medication_history || '-'}
                </span>
                <span>Lainnya= {data?.description || '-'}</span>
                <span>
                  Catatan{' '}
                  {data?.user_type === 'doctor'
                    ? 'Dokter'
                    : data?.user_type === 'nurse'
                    ? 'Perawat'
                    : ''}
                  ={' '}
                  {data?.user_type === 'doctor'
                    ? data?.doctors_note || '-'
                    : data?.user_type === 'nurse'
                    ? data?.nurse_note || '-'
                    : '-'}
                </span>
              </Typography>
            </div>
            <div className='flex flex-col'>
              <Typography variant='bodySmall' customClass='font-semibold'>
                Objective
              </Typography>
              <Typography variant='bodyXSmall' customClass='flex flex-col'>
                <span>TB= {data?.height || '-'} Cm</span>
                <span>BB= {data?.weight || '-'} Kg</span>
                <span>BMI= {data?.bmi || '-'}</span>
                <span>Kategori BMI= {data?.bmi_result || '-'}</span>
                <span>Suhu= {data?.temperature || '-'} &deg;C</span>
                <span>Diastolik= {data?.diastolic || '-'} mmHg</span>
                <span>Siastolik= {data?.systolic || '-'} mmHg</span>
                <span>
                  Pernapasan= {data?.respiration_rate || '-'} x / Menit
                </span>
                <span>Nadi= {data?.pulse_rate || '-'} x / Menit</span>
                <span>Detak Jantung= {data?.heart_rate || '-'} x / Menit</span>
              </Typography>
            </div>
            <div className='flex flex-col gap-1'>
              <Typography variant='bodySmall' customClass='font-semibold'>
                Assessment
              </Typography>
              <Typography variant='bodyXSmall' customClass='flex flex-col'>
                {data?.assessment?.map((item, index) => (
                  <span key={index}>
                    - {item?.code} - {item?.display}
                  </span>
                ))}
              </Typography>
            </div>
            <div className='flex flex-col'>
              <Typography variant='bodySmall' customClass='font-semibold'>
                Planning
              </Typography>
              <Typography variant='bodyXSmall' customClass='flex flex-col'>
                <span className='whitespace-pre-line'>
                  {data?.planning_description || '-'}
                </span>
              </Typography>
            </div>
          </div>
        );
      },
    },
    {
      Header: (
        <p className='text-center'>
          Instruksi <br /> PPA
        </p>
      ),
      classHeader: 'flex justify-center',
      id: 'ppa',
      accessor: 'ppa',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      width: 'w-[15%]',
      Cell: (props: any) => {
        const data = props.row.original;
        if (!data) return '-';
        return (
          <>
            {data?.user_type === 'doctor' && (
              <div className='w-[120px] flex flex-col gap-4 m-auto'>
                <img
                  src={baseURLFile + data?.doctor_detail?.image_ttd}
                  alt=''
                />
              </div>
            )}
          </>
        );
      },
    },
    {
      Header: (
        <p className='text-center'>
          Review & <br /> Verifikasi DPJP
        </p>
      ),
      classHeader: 'flex justify-center',
      id: 'dpjp',
      accessor: 'dpjp',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      width: 'w-[15%]',
      Cell: (props: any) => {
        const data = props.row.original;
        if (!data) return '-';
        return (
          <>
            {data?.user_type === 'nurse' && (
              <div className='w-[120px] flex flex-col gap-4 m-auto'>
                <img src={baseURLFile + data?.nurse_detail?.image_ttd} alt='' />
              </div>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className='mt-4'>
        <TableV2
          columns={columnNames}
          data={integratedNotes?.data || []}
          initialSortBy={[]}
          onSort={() => {}}
          isLoading={integratedNotes.isLoading}
          showNotFound
          pageCount={0}
          removeBgStyling
        />
      </div>
    </>
  );
};

export default IntegratedNotes;
