export type DoctorMedpoint = {
  has_schedule: boolean,
  id: string,
  indexed_at: number,
  is_available: boolean,
  is_banned: boolean,
  item: ItemDoctor,
  item_id: number,
  item_type: string,
  provider_id: number,
  provider_type: string,
  related: [],
  schedule: []
};

export type ItemDoctor = {
  email: string,
  foto: string,
  fotoSip: string,
  fotoStr: string,
  id: number,
  jadwalDokter: jadwalDoctor[],
  nama: string,
  noIzinPraktek: string,
  noStrDokter: string,
  sex: string,
  spesialis: string,
  tanggalLahir: string,
  telepon: string,
  tempatLahir: string,
  totalAntrian: number,
  name: string,
}

export type jadwalDoctor = {
  clinic: string,
  idJadwal: number,
  jamAkhir: string,
  jamMulai: string,
  quotaLangsung: number,
  quotaReservasi: number,
  tglPraktek:string,
};
