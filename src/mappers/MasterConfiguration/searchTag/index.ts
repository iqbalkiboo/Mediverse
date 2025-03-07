export const mapOptions = (data, providerType, searchType) => {
  let title;
  const result = data.map((item) => {
    switch (providerType) {
      case 'medevo':
        if (searchType === 'doctor') {
          title = item?.item?.nama_dokter;
        } else {
          title = item?.item?.nama_provider;
        }
        break;
      case 'medpharm':
        if (searchType === 'drug') {
          title = item?.item?.item?.name;
        } else {
          title = item?.item?.name;
        }
        break;
      case 'medpoint':
        if (searchType === 'doctor') {
          title = item?.item?.nama;
        } else if (searchType === 'treatment') {
          title = item?.item?.treatmentType?.name;
        } else {
          title = item?.item?.name;
        }
        break;
    }

    return {
      title,
      value: item.id,
    };
  });

  return result.filter((item) => {
    return item.title !== undefined;
  });
};

export const mapOptionsMasterService = (data) => {
  const result = data?.map((item) => {
    return {
      title: item?.service_name,
      value: item?.id,
    };
  });

  return result;
};

export const mapOptionsMasterPoli = (data) => {
  const result = data?.map((item) => {
    return {
      title: item?.poly_name,
      value: item?.id,
    };
  });

  return result;
};

export const mapOptionsMasterSpecialist = (data) => {
  const result = data?.map((item) => {
    return {
      title: item?.specialist_name,
      value: item?.id,
    };
  });

  return result;
};

export const mapOptionsSymptom = (data) => {
  const result = data?.map((item) => {
    return {
      title: item?.symptom_name,
      value: item?.id,
    };
  });

  return result;
};
