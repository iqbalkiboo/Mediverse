// Format Language in Master Provider

export const formatTextHealthFacilityType = (healthFacilityType: string) => {
  switch (healthFacilityType) {
    case 'clinic':
    case 'Clinic':
      return 'Klinik';
    case 'immunization':
    case 'Immunization':
      return 'Imunisasi';
    case 'laboratory':
    case 'Laboratory':
      return 'Laboratorium';
    default:
      return healthFacilityType;
  }
};
