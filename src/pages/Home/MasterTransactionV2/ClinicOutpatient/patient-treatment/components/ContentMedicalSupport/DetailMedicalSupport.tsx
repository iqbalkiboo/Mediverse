import { useState } from 'react';

import { Button, TableV2 } from '@/src/components';
import { DownloadIcon, PencilUpdateIcon } from '@/assets/images/svg';
import ModalDownloadMedicalSupport from './ModalDownloadMedicalSupport';
import usePatientTreatment from '../../usePatientTreatment';

interface DetailMedicalSupportProps {
  onEditClick: () => void;
}

const DetailMedicalSupport: React.FC<DetailMedicalSupportProps> = ({
  onEditClick,
}) => {
  const [openDocument, setOpenDocument] = useState(false);

  const {
    data: { dataClinicOutpatient, formMedicalSupport },
  } = usePatientTreatment();

  const columnNames = [
    {
      Header: 'Detail Penunjang',
      id: 'medicalSupport.item_name',
      accessor: 'medicalSupport.item_name',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
    },
    {
      Header: 'Jumlah',
      id: 'qty',
      accessor: 'qty',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
    },
  ];

  return (
    <>
      <ModalDownloadMedicalSupport
        isOpen={openDocument}
        onCancel={() => setOpenDocument(false)}
      />

      <div className='flex flex-col gap-4 mt-4'>
        <div className='flex justify-between'>
          {formMedicalSupport.medicalSupport?.length > 0 && (
            <div className='w-[300px] mt-2'>
              <Button
                size='md'
                class='outline'
                text='Unduh Rujukan'
                iconButton={() => <DownloadIcon color='#5600E8' />}
                onClick={() => setOpenDocument(true)}
              />
            </div>
          )}
          {dataClinicOutpatient?.service_transaction_status !== 'Selesai' && (
            <div className='w-[300px] flex mt-2 ml-auto mr-0'>
              <Button
                size='md'
                class='outline'
                text='Edit Penunjang Medis'
                iconButton={() => <PencilUpdateIcon color='#5600E8' />}
                onClick={onEditClick}
              />
            </div>
          )}
        </div>

        <div>
          <div className='flex flex-col gap-2'>
            <TableV2
              columns={columnNames}
              data={formMedicalSupport.medicalSupport || []}
              initialSortBy={[]}
              onSort={() => {}}
              textNotFound='Tidak ada Penunjang Medis'
              removeBgStyling
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailMedicalSupport;
