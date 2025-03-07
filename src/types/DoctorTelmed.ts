export type IDoctorTelmedItem = {
  has_rating: boolean,
  id: string | number,
  indexed_at: string | number,
  is_available: boolean,
  is_banned: boolean,
  is_location: boolean,
  item: {
    alamat_provider: string,
    availability_dokter: string,
    id_dokter: string | number,
    id_provider: string | number,
    id_spesialisasi: number,
    lat_provider: any,
    lng_provider: any,
    nama_dokter: string,
    nama_kota: any,
    nama_provider: string,
    nama_provinsi: any,
    nama_spesialisasi: string,
    ratingcnt_dokter: number,
    ratingval_dokter: any,
    statusKonsultasi: string,
    status_dokter: string,
    url_foto_dokter: any
  },
  item_id: string | number,
  item_type: string,
  location: {},
  provider_type: string,
  related: any[],
  updated_at: string | number
}

export type ISchedulesDoctorTelmed = {
  id_dokter: string,
  nama_dokter: string,
  nama_provider: string,
  id_jadwal_konsul: string,
  hari_jadwal_konsul: string,
  start_jadwal_konsul: string,
  end_jadwal_konsul: string,
}

export type IMapSchedulesDoctorTelmed = {
  doctorId: string,
  doctorName: string,
  providerName: string,
  scheduleId: string,
  scheduleDay: string | undefined,
  scheduleStart: string,
  scheduleEnd: string,
}
