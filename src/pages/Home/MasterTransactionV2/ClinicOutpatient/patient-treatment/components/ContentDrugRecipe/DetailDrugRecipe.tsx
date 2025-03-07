import { useState } from 'react';

import { Button, TableV2, Typography } from '@/src/components';
import { DownloadIcon, PencilUpdateIcon } from '@/assets/images/svg';
import ModalDownloadDrugRecipe from './ModalDownloadDrugRecipe';
import usePatientTreatment from '../../usePatientTreatment';

interface DetailDrugRecipeProps {
  onEditClick: () => void;
}

const DetailDrugRecipe: React.FC<DetailDrugRecipeProps> = ({ onEditClick }) => {
  const [openDocument, setOpenDocument] = useState(false);

  const {
    data: { dataClinicOutpatient, formDrugRecipe },
  } = usePatientTreatment();

  const columnNames = [
    {
      Header: 'Detail obat',
      id: 'itemName',
      accessor: 'itemName',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      Cell: ({ row, value }) => {
        return (
          <div>
            <Typography variant='bodySmall' color=''>
              {value}
            </Typography>
            {!row.original.isConcoction && (
              <Typography variant='bodySmall' color='text-grayTertiary'>
                Stok: {row.original.stock || '-'}
              </Typography>
            )}

            {row.original.isConcoction &&
              row.original.concoctionItems?.length > 0 && (
                <div className='mt-4 ml-6'>
                  {row.original.concoctionItems?.map((item) => (
                    <div className='mb-2'>
                      <Typography variant='bodySmall' color=''>
                        {item?.itemName}
                      </Typography>
                      <Typography variant='bodySmall' color='text-grayTertiary'>
                        Stok: {item?.stock || '-'}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
          </div>
        );
      },
    },
    {
      Header: 'Jumlah',
      id: 'quantity',
      accessor: 'quantity',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
    },
    {
      Header: 'Satuan',
      id: 'unit',
      accessor: 'unit',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
    },
    {
      Header: 'Petunjuk Pemakaian',
      id: 'instruction',
      accessor: 'instruction',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
    },
  ];

  return (
    <>
      <ModalDownloadDrugRecipe
        isOpen={openDocument}
        onCancel={() => setOpenDocument(false)}
      />

      <div className='flex flex-col gap-4 mt-4'>
        <div className='flex justify-between'>
          <div className='w-[300px] mt-2'>
            {formDrugRecipe.drug?.length > 0 && (
              <Button
                size='md'
                class='outline'
                text='Unduh Resep'
                iconButton={() => <DownloadIcon color='#5600E8' />}
                onClick={() => setOpenDocument(true)}
              />
            )}
          </div>
          {dataClinicOutpatient?.service_transaction_status !== 'Selesai' && (
            <div className='w-[300px] mt-2'>
              <Button
                size='md'
                class='outline'
                text='Edit Obat'
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
              data={formDrugRecipe.drug || []}
              initialSortBy={[]}
              onSort={() => {}}
              textNotFound='Tidak ada Resep Obat'
              removeBgStyling
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailDrugRecipe;
