import {formatDate} from '@/src/utils/formatDate';
import {formatRupiah} from '@/src/utils/fromatCurrency';
import {DoctorMedpoint} from '@/src/types/DoctorMedpoint';
import {isArray, isEmpty} from 'lodash';

type GetDoctorMedpoint = {
  keyword: string,
  filterOptions: any,
  data: DoctorMedpoint[],
};

export const mapListDoctor = (data: any[]) => {
  const result = isArray(data) ? data?.map((item: any) => {
    return {
      id: item?.id,
      provider_type: item?.provider || '-',
      indexed_at: new Date(item?.createdAt) || '-',
      item: {
        id: item?.id,
        nama: item?.nama || '-',
        spesialis: item?.spesialis || '-',
        is_banned: item?.status || false,
      },
    };
  }) : [];

  return result;
};

export const mapDetailDoctor = (data: any) => {
  return {
    name: data?.nama || '-',
    id: data?.id || '-',
    photo: data?.foto || '',
    information: {
      noStrDokter: data?.noStrDokter || '-',
      tempatLahir: data?.tempatLahir || '-',
      tanggalLahir: data.tanggalLahir ? formatDate(data.tanggalLahir, ' ', 'MMMM') : '-',
      sex: data?.sex || '-',
      telepon: data?.telepon || '-',
      email: data?.email || '-',
      spesialis: data?.spesialis || '-',
      biografi: data?.biografi || '-',
    },
    document: {
      fotoSip: data?.fotoSip || '',
      fotoStr: data?.fotoStr || '',
    },
  };
};

export const getDoctorMedpoint = ({keyword, filterOptions, data}: GetDoctorMedpoint) => {
  let filteredData = data.filter(({item}) => (item.nama || item.name).toLowerCase().includes(keyword.toLowerCase()));

  if (keyword) {
    filteredData = filteredData.filter((item) => {
      return item.is_banned.toString() === filterOptions;
    });
  }

  return filteredData.map((value) => ({
    has_schedule: value.has_schedule,
    id: value.id,
    indexed_at: value.indexed_at,
    is_available: value.is_available,
    is_banned: value.is_banned,
    item: {
      email: value.item.email,
      foto: value.item.foto,
      fotoSip: value.item.fotoSip,
      fotoStr: value.item.fotoStr,
      id: value.item.id,
      jadwalDokter: value.item.jadwalDokter,
      nama: value.item.nama,
      noIzinPraktek: value.item.noIzinPraktek,
      noStrDokter: value.item.noStrDokter,
      sex: value.item.sex,
      spesialis: value.item.spesialis,
      tanggalLahir: value.item.tanggalLahir,
      telepon: value.item.telepon,
      tempatLahir: value.item.tempatLahir,
      totalAntrian: value.item.totalAntrian,
    },
    item_id: value.item_id,
    item_type: value.item_type,
    provider_id: value.provider_id,
    provider_type: value.provider_type,
    related: value.related,
    schedule: value.schedule,
  })).sort((a: any, b: any) => {
    if (String(a.item?.id) < String(b.item?.id)) return -1;
    if (String(a.item?.id) > String(b.item?.id)) return 1;
    return 0;
  });
};

export const mapDoctorInformation = (data: any) => {
  const translate = (gender) => {
    if (!gender) return '-';
    if (gender === 'male') return 'Pria';
    if (gender === 'female') return 'Perempuan';
    return gender;
  };
  return {
    noStrDokter: data?.item?.noStrDokter || '-',
    tempatLahir: data?.item?.tempatLahir || '-',
    tanggalLahir: data.item?.tanggalLahir ? formatDate(data.item?.tanggalLahir, ' ', 'MMMM') : '-',
    sex: translate(data?.item?.sex),
    telepon: data?.item?.telepon || '-',
    email: data?.item?.email || '-',
    spesialis: data?.item?.spesialis || '-',
    biografi: data?.item?.biografi || '-',
    languages: data?.item?.bahasa || [],
  };
};

export const mapDocumentsDoctor = (data: any) => {
  return {
    fotoSip: data?.item?.fotoSip || '',
    fotoStr: data?.item?.fotoStr || '',
  };
};

export const mapFaskesDoctor = (data: any) => {
  let result;
  if (Array.isArray(data?.item?.jadwalDokter)) {
    result = data.item.jadwalDokter.map((item) => {
      return {
        idJadwal: item.idJadwal,
        clinic: item.clinic,
        startTime: item.jamMulai,
        endTime: item.jamAkhir,
        quotaResevation: item.quotaReservasi,
        quotaLangsung: item.quotaLangsung,
        tglPraktek: item.tglPraktek,
        provider: item?.provider ?? '-',
        noSip: item?.noSip ?? '-',
        service: item?.service ?? '-',
        serviceType: item?.serviceType ?? '-',
        price: item?.price ?? 0,
      };
    });
  } else {
    result = [];
  }

  return result;
};

export const mapScheduleDoctor = (data: any) => {
  return (data && data.length > 0) ? data.map((item: any) => ({
    id: item.id || '',
    faskes: item.faskes || '-',
    provider: item.provider || '-',
    noSip: item.noSip || '-',
    service: item.service || '-',
    serviceType: item.serviceType || '-',
    servicePrice: formatRupiah(item.servicePrice) || 0,
  })) : [];
};

export const getListSpecialist = (data: any) => {
  if (isEmpty(data)) return [];

  const result = data.map((item) => {
    return {
      label: item.specialist_name,
      value: item.specialist_name,
    };
  });

  return result;
};
