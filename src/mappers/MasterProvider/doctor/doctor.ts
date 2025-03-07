import dayjs from 'dayjs';

import { ROLES } from '@/src/constants';
import {
  dateDifference,
  formatDate,
  formatDateEng,
} from '@/src/utils/formatDate';

import { isArray } from 'lodash';

export const mapListDoctor = ({ keyword, filterOptions, data, role }) => {
  if (
    [
      ROLES.ADMINISTRATOR_MEDIVERSE,
      ROLES.ADMINISTRATOR_MEDIVERSE_VIEW_ONLY,
      ROLES.SUPER_ADMIN,
      ROLES.SUPER_ADMIN_VIEW_ONLY,
    ].includes(role?.id)
  ) {
    let filteredData = data?.filter(({ item }) =>
      (item?.nama || item?.name || '')
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );
    filteredData = filteredData.filter((item) => item?.item_type === 'doctor');

    if (keyword) {
      filteredData = filteredData.filter(
        (item) => item.is_banned === filterOptions
      );
    }

    return filteredData
      .map((item) => ({
        id: item.id || '-',
        itemId: item?.item_id || '-',
        indexedAt: item?.indexed_at || '-',
        isBanned: !item?.is_banned,
        providerType: item?.provider_type || '-',
        providerId: item?.provider_id,
        name: item?.item?.nama || '-',
        specialist: item?.item?.spesialis || '-',
        practitionerType: item?.item?.practitionerType || '-',
      }))
      .sort((a: any, b: any) => {
        if (String(a.item?.id) < String(b.item?.id)) return -1;
        if (String(a.item?.id) > String(b.item?.id)) return 1;
        return 0;
      });
  } else {
    return isArray(data)
      ? data?.map((item: any) => {
          return {
            id: item?.id || '-',
            itemId: item?.id || '-',
            providerType: item?.provider || '-',
            indexedAt: dayjs.unix(item?.createdAt) || '-',
            isBanned: item?.status || false,
            providerId: item?.provider_id,
            name: item?.nama || '-',
            specialist: item?.spesialis || '-',
            practitionerType: item?.practitionerType || '-',
          };
        })
      : [];
  }
};

export const mapDetailDoctor = ({ data, role }) => {
  if (
    [
      ROLES.ADMINISTRATOR_MEDIVERSE,
      ROLES.ADMINISTRATOR_MEDIVERSE_VIEW_ONLY,
      ROLES.SUPER_ADMIN,
      ROLES.SUPER_ADMIN_VIEW_ONLY,
    ].includes(role?.id)
  ) {
    const translate = (gender) => {
      if (!gender) return '-';
      if (gender === 'male') return 'Pria';
      if (gender === 'female') return 'Perempuan';
      return gender;
    };

    return {
      name: data?.item?.nama || '-',
      id: data?.item?.id || '-',
      itemId: data?.item_id || '-',
      icon: data?.item?.foto || '-',
      isBanned: data?.is_banned,
      photo: data?.item?.foto || '',
      providerSource: data.provider_source_type,
      information: {
        noStrDoctor: data?.item?.noStrDokter || '-',
        birthPlace: data?.item?.tempatLahir || '-',
        birthDate: data.item?.tanggalLahir
          ? formatDate(data.item?.tanggalLahir, ' ', 'MMMM')
          : '-',
        sex: translate(data?.item?.sex),
        phoneNumber: data?.item?.telepon || '-',
        email: data?.item?.email || '-',
        specialist: data?.item?.spesialis || '-',
        languages: data?.item?.bahasa || [],
        biography: data?.item?.biografi || '-',
        experience:
          data?.pengalaman ||
          dateDifference(data?.item?.tanggalRegistrasiStr, new Date()) ||
          '-',
        practitionerType: data?.practitionerType || '-',
      },
      document: {
        photoSip: data?.item?.fotoSip || '',
        photoStr: data?.item?.fotoStr || '',
        photoSignature: data?.item?.fotoTandaTangan || '',
      },
    };
  } else {
    return {
      name: data?.nama || '-',
      id: data?.id || '-',
      itemId: data?.id || '-',
      photo: data?.foto || '',
      providerSource: data.provider_source_type,
      information: {
        noStrDoctor: data?.noStrDokter || '-',
        birthPlace: data?.tempatLahir || '-',
        birthDate: data?.tanggalLahir
          ? formatDate(data.tanggalLahir, ' ', 'MMMM')
          : '-',
        sex: data?.sex || '-',
        phoneNumber: data?.telepon || '-',
        email: data?.email || '-',
        specialist: data?.spesialis || '-',
        languages: data?.bahasa || [],
        biography: data?.biografi || '-',
        experience: data.pengalaman || '-',
        practitionerType: data?.practitionerType || '-',
      },
      document: {
        photoSip: data?.fotoSip || '',
        photoStr: data?.fotoStr || '',
        photoSignature: data?.fotoTandaTangan || '',
      },
    };
  }
};

export const mapFormOptions = (
  data: any,
  type = 'default',
  label: string = ''
) => {
  switch (type) {
    case 'default':
      return data?.map((item: any) => ({
        label: item[label] || item.name,
        value: item.id || item.name,
      }));

    case 'async':
      return data?.map((item: any) => ({
        title: item[label] || item.name,
        value: item.id || item.name,
      }));
  }
};

export const mapFormDoctor = (data) => {
  return {
    nama: data.tabInformation.fullName,
    tempatLahir: data.tabInformation.birthPlace,
    tanggalLahir: data.tabInformation.birthDay,
    telepon: data.tabInformation.phoneNumber,
    email: data.tabInformation.email,
    spesialis: data.tabInformation.specialist,
    sex: data.tabInformation.gender,
    noStrDokter: data.tabInformation.noStr,
    bahasa: data.tabInformation.languages,
    biografi: data.tabInformation.biografi,
    tanggalRegistrasiStr: data.tabInformation.strRegistrationDate
      ? formatDateEng(data.tabInformation.strRegistrationDate)
      : '',
    foto: data.tabDocument.photo,
    fotoStr: data.tabDocument.photoStr,
    fotoSip: data.tabDocument.photoSip,
    fotoTandaTangan: data.tabDocument.photoSignature,
    practitionerType: 'doctor',
  };
};

export const mapListSelectProvider = (data) => {
  return isArray(data)
    ? data.map((item: any) => {
        return {
          title: item?.name || '',
          value: {
            id: item?.id,
            name: item?.name,
          },
        };
      })
    : [];
};
