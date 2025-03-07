export const outletDocumentId = (channelId: number, outletId: number) => {
  return `${channelId}outlet${outletId}`;
};

export const clinicDocumentId = (channelId: number, clinicId: number) => {
  return `${channelId}clinic${clinicId}`;
};

export const polyDocumentId = (channelId: number, clinicId: number, polyId: number) => {
  return `${channelId}clinic${clinicId}-${polyId}`;
};

export const treatmentDocumentId = (channelId: number, outletId: number, treatmentId: number) => {
  return `${channelId}treatment${outletId}-${treatmentId}`;
};

export const drugDocumentId = (channelId: number, outletId: number, drugId: number) => {
  return `${channelId}drug${outletId}-${drugId}`;
};


export const doctorDocumentId = (channelId: number, outletId: number, doctorId: number, treatmentId: number) => {
  return `${channelId}doctor${outletId}-${doctorId}-${treatmentId}`;
};
