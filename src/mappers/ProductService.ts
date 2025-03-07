import {ProductService} from '@/src/types/ProductService';
import {isArray} from 'lodash';

type GetProductService = {
  keyword: string;
  filterOptions: any;
  data: ProductService[];
};

export const mapListTreatment = (data: any[]) => {
  const result = isArray(data) ? data?.map((item: any) => {
    return {
      id: item?.id,
      item_id: item?.id,
      service_name: item?.name || '-',
      service_group: item?.configs || '-',
      provider: item?.provider_type || '-',
      mediverse_price: item?.price || 0,
      status: item?.is_banned || false,
    };
  }) : [];

  return result;
};

export const mapDetailTreatment = (data: any) => {
  return {
    id: data?.id,
    item_id: data?.id || 0,
    name: data?.name || '-',
    status: data?.is_banned || false,
    provider_id: data?.provider_id || 0,
    type: data?.type || '-',
    information: {
      type: data?.configs?.type || '-',
      healthFacility: data?.configs?.['health-facility']?.name || '-',
      serviceGroup: data?.configs?.['service-group']?.name || '-',
      poli: data?.configs?.['poli']?.name || '-',
      price: data?.price || 0,
      sellingFactor: data?.sellingFactor || 0,
      mediversePrice: data?.price || 0,
      doctor: data?.configs?.['doctor']?.name || '-',
      createdDate: data?.createdAt || 0,
    },
    detail: {
      detail: data?.description || '-',
      preparation: data?.preparation || '-',
    },
    criteria: {
      maxAge: data?.configs?.['max-age']?.value || '-',
      minAge: data?.configs?.['min-age']?.value || '-',
      durationPerService: data?.configs?.['slot-duration']?.value || '-',
      maxParticipant: data?.configs?.['max-participant']?.value || '-',
      preOrderSetting: data?.configs?.['setting_preorder']?.value || '-',
      participantPerVial: data?.configs?.['number-participant-per-vial']?.value || '-',
    },
    related: data?.related || [],
  };
};

export const mapListProductService = ({
  keyword,
  filterOptions,
  data,
}: GetProductService) => {
  let filteredData = data.filter(
      (item: any) =>
        item?.item?.name?.toLowerCase()?.includes(keyword?.toLowerCase()) ||
      item?.item_id?.toLowerCase()?.includes(keyword?.toLowerCase()),
  );

  if (filterOptions.status !== 'all' && filterOptions.status !== '') {
    filteredData = filteredData.filter(
        (item) => !item.is_banned === filterOptions.status,
    );
  }

  if (
    filterOptions.serviceGroup !== 'all' &&
    filterOptions.serviceGroup !== ''
  ) {
    filteredData = filteredData.filter(
        (item) =>
          !item?.item?.treatmentType?.name?.toLowerCase() ===
        filterOptions.serviceGroup,
    );
  }

  if (filterOptions.provider !== 'all' && filterOptions.provider !== '') {
    filteredData = filteredData.filter(
        (item) =>
          !item?.item?.provider_type?.toLowerCase() === filterOptions.provider,
    );
  }

  return filteredData.map((item: any) => {
    return {
      id: item.id,
      item_id: item.item_id,
      service_name: item.item?.treatmentType?.configs?.type === 'reservation-consultation' ?
        `${item.item?.treatmentType?.name} ${item.item?.treatmentType?.configs?.doctor?.name}` :
        item.item?.treatmentType?.name,
      service_group: item.item?.treatmentType?.configs || null,
      provider: item.provider_type || '-',
      mediverse_price: item.item?.treatmentType?.price || 0,
      status: item.is_banned || false,
    };
  });
};

export const mapDetailProductService = (data: any) => {
  return {
    id: data?.id,
    item_id: data?.item_id,
    name: data.item?.treatmentType?.configs?.type === 'reservation-consultation' ?
      `${data.item?.treatmentType?.name} ${data.item?.treatmentType?.configs?.doctor?.name}` :
      data?.item?.treatmentType?.name,
    status: data?.is_banned,
    provider_id: data?.provider_id,
    type: data?.item?.treatmentType?.type || data?.item?.treatmentType?.configs?.type || '-',
    information: {
      type: data?.provider_type || '-',
      healthFacility: data?.item?.treatmentType?.configs?.['health-facility']?.name || '-',
      serviceGroup: data?.item?.treatmentType?.configs?.['service-group']?.name || '-',
      poli: data?.item?.treatmentType?.configs?.poli.name || '-',
      price: data?.item?.treatmentType?.price || 0,
      sellingFactor: data?.item?.treatmentType?.sellingFactor || 0,
      mediversePrice: data?.item?.treatmentType?.price || 0,
      doctor: data?.item?.doctor || '-',
      createdDate: data?.indexed_at || 0,
    },
    detail: {
      detail: data?.item?.treatmentType?.description || '-',
      preparation: data?.item?.treatmentType?.preparation || '-',
    },
    criteria: {
      maxAge: data?.item?.treatmentType?.configs?.['max-age']?.value || '-',
      minAge: data?.item?.treatmentType?.configs?.['min-age']?.value || '-',
      durationPerService: data?.item?.treatmentType?.configs?.['slot-duration']?.value || '-',
      maxParticipant: data?.item?.treatmentType?.configs?.['max-participant']?.value || '-',
      preOrderSetting: data?.item?.treatmentType?.configs?.['setting_preorder']?.value || '-',
      participantPerVial: data?.item?.treatmentType?.configs?.['number-participant-per-vial']?.value || '-',
    },
    related: data?.related || [],
  };
};

export const dataReview = (data: any) => {
  const comments = Array.isArray(data?.comments) ? data.comments.map((item) => {
    return {
      name: item?.name || '-',
      rating: item?.rating || '-',
      createdAt: item?.created_at || '',
      comment: item?.comment || '-',
    };
  }) : [];

  return {
    name: data?.name || '-',
    imageUrl: data?.image_url || '',
    service: data?.srvice_name || '-',
    ratingAvg: data?.rating_avg || 0,
    totalReview: data?.total_review || 0,
    comments: comments,
  };
};

export const mapListSelectProvider = (data) => {
  const listSelectProvider = data.map((item: any) => {
    return {
      title: item?.name || '',
      value: {
        id: item?.id,
        name: item?.name,
      },
    };
  });

  return listSelectProvider;
};

export const mapListSelectHealthFacility = (data) => {
  const listSelectHealthFacility = data.map((item: any) => {
    return {
      title: item?.name || '-',
      value: {
        id: item?.id,
        name: item?.name || '',
        image: item?.image || '',
      },
    };
  });

  return listSelectHealthFacility;
};

export const mapListSearchHealthFacility = (data) => {
  const filteredData = data.filter((item: any) => item.item_type === 'clinic');

  const listSearchHealthFacility = filteredData.map((item: any) => {
    return {
      title: item?.item?.name || '-',
      value: {
        channelId: item?.provider_id,
        itemId: String(item?.item?.id),
        id: item?.id,
        name: item?.item?.name,
        image: item?.item?.image,
      },
    };
  });

  return listSearchHealthFacility;
};

export const mapListSelectServiceGroup = (data) => {
  const listSelectServiceGroup = data.map((item: any) => {
    return {
      title: item?.service_name || '-',
      value: {
        id: item?.id,
        name: item?.service_name || '-',
        icon: item?.service_icon,
      },
    };
  });

  return listSelectServiceGroup;
};

export const mapListSelectPoli = (data) => {
  const listSelectPoli = data.map((item: any) => {
    return {
      label: item?.name || '',
      value: {
        id: item?.id,
        name: item?.name,
      },
    };
  });

  return listSelectPoli;
};

export const mapPayloadProductService = (data: any, id?: string | number ) => {
  return {
    benefit: '',
    code: id ? data.code : String(Math.floor(100000 + Math.random() * 900000)),
    codeConfig: '',
    description: data?.detail?.detail,
    imageUrl: '',
    name: data?.information?.type === 'reservation-consultation' ? 'Konsultasi Reservasi' : data?.information?.name,
    preparation: data?.detail?.preparation,
    price: parseFloat(data?.information?.price),
    procedure: '',
    type: data?.information?.type,
    configs: {
      'provider': {
        id: data?.information?.provider?.id,
        name: data?.information?.provider?.name,
      },
      'health-facility': {
        id: data?.information?.healthFacility?.id,
        name: data?.information?.healthFacility?.name,
        image: data?.information?.healthFacility?.image,
      },
      'service-group': {
        id: data?.information?.serviceGroup?.id,
        name: data?.information?.serviceGroup?.name,
        icon: data?.information?.serviceGroup?.icon,
      },
      'poli': {
        id: data?.information?.poli?.id,
        name: data?.information?.poli?.name,
      },
      'max-age': {
        name: 'max-age',
        value: data?.criteria?.maxAge,
        group: null,
      },
      'min-age': {
        name: 'min-age',
        value: data?.criteria?.minAge,
        group: null,
      },
      'slot-duration': {
        name: 'slot-duration',
        value: data?.criteria?.durationPerService,
        group: null,
      },
      'max-participant': {
        name: 'max-participant',
        value: data?.criteria?.maxParticipant,
        group: null,
      },
      'setting_preorder': {
        name: 'setting_preorder',
        value: data?.criteria?.preOrderSetting,
        group: null,
      },
      'number-participant-per-vial': {
        name: 'number-participant-per-vial',
        value: data?.criteria?.participantPerVial,
        group: null,
      },
    },
  };
};
