import { useState } from 'react';

import { Button, Card, TableV2, Typography } from '@/src/components';
import { DownloadIcon, PencilUpdateIcon } from '@/assets/images/svg';
import { formatDate } from '@/utils/formatDate';
import { handleDownloadFile } from '@/utils/files';
import ModalDownloadMedicalCertificate from './ModalDownloadMedicalCertificate';
import ModalDownloadRecommendationLetter from './ModalDownloadRecommendationLetter';
import usePatientTreatment from '../../usePatientTreatment';

interface DetailRecommendationLetterProps {
  onEditClick: () => void;
}

const DetailRecommendationLetter: React.FC<DetailRecommendationLetterProps> = ({
  onEditClick,
}) => {
  const [openRecommendationLetter, setOpenRecommendationLetter] =
    useState(false);
  const [openMedicalCertificate, setOpenMedicalCertificate] = useState(false);

  const {
    data: { dataClinicOutpatient, formRecommendationLetter },
  } = usePatientTreatment();

  const columnNamesReferOut = [
    {
      Header: 'Jenis Fasilitas Kesehatan',
      id: 'facility',
      accessor: 'facility',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      width: 'w-1/4',
      Cell: ({ value }) => {
        return <p>{value ? value : '-'}</p>;
      },
    },
    {
      Header: 'Nama Faskes Rujukan',
      id: 'hospital',
      accessor: 'hospital',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      width: 'w-1/4',
      Cell: ({ value }) => {
        return (
          <p>
            {value?.health_facility_name ? value?.health_facility_name : '-'}
          </p>
        );
      },
    },
    {
      Header: 'Tipe Rujukan',
      id: 'reference',
      accessor: 'reference',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      width: 'w-[13px]',
      Cell: ({ value }) => {
        return <p>{value ? value : '-'}</p>;
      },
    },
    {
      Header: '',
      id: 'action',
      accessor: 'action',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      width: 'w-1/4',
      Cell: ({ row }) => {
        return (
          <>
            {row.original.hasDetailRefer === 'yes' && (
              <div className='w-full'>
                <div className='w-2/3 mx-auto'>
                  <Button
                    size='md'
                    class='outline'
                    text='Unduh'
                    iconButton={() => <DownloadIcon color='#5600E8' />}
                    onClick={() => setOpenRecommendationLetter(true)}
                  />
                </div>
              </div>
            )}
          </>
        );
      },
    },
  ];

  const columnNamesCertificate = [
    {
      Header: 'Mulai Dari',
      id: 'startDate',
      accessor: 'startDate',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      width: 'w-1/4',
      Cell: ({ value }) => {
        return <p>{value ? formatDate(value, '/', 'MM', false) : '-'}</p>;
      },
    },
    {
      Header: 'Sampai Dengan',
      id: 'endDate',
      accessor: 'endDate',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      width: 'w-1/4',
      Cell: ({ value }) => {
        return <p>{value ? formatDate(value, '/', 'MM', false) : '-'}</p>;
      },
    },
    {
      Header: 'Selama',
      id: 'period',
      accessor: 'period',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      width: 'w-1/4',
      Cell: ({ value }) => {
        return <p>{value ? value + ' Hari' : '-'}</p>;
      },
    },
    {
      Header: '',
      id: 'action',
      accessor: 'action',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      width: 'w-1/4',
      Cell: ({ row }) => {
        return (
          <>
            {row.original.hasDetailCertificate === 'yes' && (
              <div className='w-full'>
                <div className='w-2/3 mx-auto'>
                  <Button
                    size='md'
                    class='outline'
                    text='Unduh'
                    iconButton={() => <DownloadIcon color='#5600E8' />}
                    onClick={() => setOpenMedicalCertificate(true)}
                  />
                </div>
              </div>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <ModalDownloadRecommendationLetter
        isOpen={openRecommendationLetter}
        onCancel={() => setOpenRecommendationLetter(false)}
      />
      <ModalDownloadMedicalCertificate
        isOpen={openMedicalCertificate}
        onCancel={() => setOpenMedicalCertificate(false)}
      />

      <div className='flex flex-col gap-4 mt-4'>
        {dataClinicOutpatient?.service_transaction_status !== 'Selesai' && (
          <div className='w-[300px] flex mt-2 ml-auto mr-0'>
            <Button
              size='md'
              class='outline'
              text='Edit Surat Rekomendasi'
              iconButton={() => <PencilUpdateIcon color='#5600E8' />}
              onClick={onEditClick}
            />
          </div>
        )}

        <div className='flex flex-col gap-4'>
          <div className='gap-4'>
            <Typography variant='h4' color='' customClass='mb-2'>
              RUJUK KELUAR
            </Typography>
            <Card padding='p-6' customClassName='border-1'>
              <div>
                <TableV2
                  columns={columnNamesReferOut}
                  data={[formRecommendationLetter.detailRefer]}
                  initialSortBy={[]}
                  onSort={() => {}}
                  showNotFound={false}
                  removeBgStyling
                />
              </div>
            </Card>
          </div>

          <div className='gap-4'>
            <Typography variant='h4' color='' customClass='mb-2'>
              SURAT KETERANGAN DOKTER
            </Typography>
            <Card padding='p-6' customClassName='border-1'>
              <div>
                <TableV2
                  columns={columnNamesCertificate}
                  data={[formRecommendationLetter.detailCertificate]}
                  initialSortBy={[]}
                  onSort={() => {}}
                  showNotFound={false}
                  removeBgStyling
                />
              </div>
            </Card>
          </div>

          <div className='gap-4'>
            <Typography variant='h4' color='' customClass='mb-2'>
              DOKUMEN PENUNJANG LAIN
            </Typography>
            <Card padding='p-3' customClassName='border-1 pb-4'>
              {formRecommendationLetter.docname &&
              formRecommendationLetter.documents.length > 0 ? (
                <div className='flex flex-col gap-2'>
                  {formRecommendationLetter.documents.map((document, index) => (
                    <div
                      key={index}
                      className='w-full bg-[#F6F8FA] rounded-lg border py-5 px-7'
                    >
                      <div className='w-full flex justify-between'>
                        <div className='my-auto'>{document.file_name}</div>
                        <div className='w-1/6 my-auto'>
                          <Button
                            size='md'
                            class='outline'
                            text='Unduh'
                            iconButton={() => <DownloadIcon color='#5600E8' />}
                            onClick={() =>
                              handleDownloadFile(
                                document.file_url,
                                document.file_name
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Typography variant='h4' color=''>
                  Tidak ada dokumen penunjang lain
                </Typography>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailRecommendationLetter;
