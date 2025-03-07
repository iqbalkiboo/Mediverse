const COLORS = {
  PURPLE: '#5600E8',
  GREEN: '#54AE0B',
  RED: '#921919',
  WHITE: '#FFFFFF',
  WHITE2: '#F8F8F8',
  BLACK: '#1B1B28',
  PURPLE2: '#DDCCFA',
  GRAY: '#9E9E9E',
};

const THEME = {
  PRIMARY: COLORS.PURPLE,
  SECONDARY: COLORS.PURPLE2,
};

const TEXT = {
  PRIMARY: COLORS.PURPLE,
  DANGER: COLORS.RED,
  SUCCESS: COLORS.GREEN,
  BLACK: COLORS.BLACK,
  GRAY: COLORS.GRAY,
};

const COOKIES = {
  AUTH: '@mediverse_user_auth',
  PERMISSION: '@mediverse_user_permission',
  TOKEN: '@mediverse_token',
  USER: '@mediverse_user',
  FCM: '@FCM',
  MY_NOTIFICATIONS: '@my_notifications',
  MY_PROVIDERS: '@my_providers',
};

export const REGEX = {
  EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  PASSWORD: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
  NO_TELP:
    /([[(])?(?:(\+62)|62|0)\1? ?-? ?8(?![046])\d(?!0)\d\1? ?-? ?\d{3,4} ?-? ?\d{3,5}(?: ?-? ?\d{3})?\b/,
  // eslint-disable-next-line max-len
  URL: /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w?[a-zA-Z-_%/@]+)*([^/\w?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
  NUMBER: /^\d+$/,
};

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  USER: '/user',
  SERVICES: '/services',
  MARKETING: '/marketing',
  PRIVACY_POLICIES: '/privacy-policies',
  PROVIDERS: '/providers',
  PRODUCT: '/products',
  MEDEVO: '/medevo',
  TRANSACTION: '/transactions',
  PROMO: '/promo',
  PAYOR: '/payor',
  CONFIGURATION: '/configuration',
  MEDNEWS: '/mednews',
  PROFILE: '/profile',
  NOTIFICATIONS: '/notifications',
  LANDING_PAGES: '/landing-pages',
  CHAT: '/chat',
};

export const ROUTES_DASHBOARD = {
  HOME: ROUTES.HOME,
};

export const ROUTES_USERS = {
  MEDIVERSES: `${ROUTES.USERS}/mediverses`,
  MEDIVERSE: `${ROUTES.USERS}/mediverse`,
  PERMISSIONS: `${ROUTES.USERS}/permissions`,
  PERMISSION: `${ROUTES.USERS}/permission`,
};

export const ROUTES_PROVIDER = {
  PHARMACY: `${ROUTES.PROVIDERS}/pharmacy`,
  DOCTOR: `${ROUTES.PROVIDERS}/doctor`,
  DOCTORS: `${ROUTES.PROVIDERS}/practitioners`,
  FACILITY: `${ROUTES.PROVIDERS}/health-facility`,
};

export const ROUTES_TRANSACTION = {
  QUEUE: `${ROUTES.TRANSACTION}/queue`,
  REGISTER: `${ROUTES.TRANSACTION}/register`,
  PAYMENT: `${ROUTES.TRANSACTION}/payment`,
  MEDEVO_ORDERS: `${ROUTES.TRANSACTION}/medevo-orders`,
  MEDEVO_ORDER: `${ROUTES.TRANSACTION}/medevo-order`,
  MEDPOINT_ORDERS: `${ROUTES.TRANSACTION}/medpoint-orders`,
  MEDPOINT_ORDER: `${ROUTES.TRANSACTION}/medpoint-order`,
  MEDPOINT_CHECKUP: `${ROUTES.TRANSACTION}/medpoint-checkup`,
  MEDPOINT_PROCEDURE: `${ROUTES.TRANSACTION}/medpoint-procedure`,
  VACCINATIONS: `${ROUTES.TRANSACTION}/vaccinations`,
  VACCINATION: `${ROUTES.TRANSACTION}/vaccination`,
  VACCINATION_CHECKUP: `${ROUTES.TRANSACTION}/vaccination-checkup`,
  VACCINATION_PROCEDURE: `${ROUTES.TRANSACTION}/vaccination-procedure`,
  MEDPHARM_ORDERS: `${ROUTES.TRANSACTION}/medpharm-orders`,
  MEDPHARM_ORDER: `${ROUTES.TRANSACTION}/medpharm-order`,
  EPRESCRIPTION_ORDERS: `${ROUTES.TRANSACTION}/eprescription-orders`,
  PRESCRIPTION_ORDER: `${ROUTES.TRANSACTION}/eprescription-order`,
  TRANSACTIONS: `${ROUTES.TRANSACTION}`,
  TRANSACTIONS_V2: `${ROUTES.TRANSACTION}/transactions-v2`,
  REFUNDS: `${ROUTES.TRANSACTION}/refunds`,
  LIST_ALL_TRANSACTION: `${ROUTES.TRANSACTION}/list-all-transaction`,
  All_BALANCE_EXPEDITION: `${ROUTES.TRANSACTION}/all-balance-expedition`,
  All_BALANCE_PROVIDER: `${ROUTES.TRANSACTION}/all-balance-provider`,
  EXPEDITION_PROVIDER_PAYMENT: `${ROUTES.TRANSACTION}/expedition-provider-payment`,
  REFUND: `${ROUTES.TRANSACTION}/refund`,
  ESCROW: `${ROUTES.TRANSACTION}/escrow`,
  ESCROW_PAYMENT_PROVIDER: `${ROUTES.TRANSACTION}/escrow-payment-provider`,
  ESCROW_PAYMENT_EXPEDITION: `${ROUTES.TRANSACTION}/escrow-payment-expedition`,
  ESCROW_REFUND: `${ROUTES.TRANSACTION}/escrow-refund`,
  BALANCES: `${ROUTES.TRANSACTION}/balances`,
  CLINIC_OUTPATIENT: `${ROUTES.TRANSACTION}/clinic-outpatient`,
  PATIENT_EXAMINATION: `${ROUTES.TRANSACTION}/clinic-patient-examination`,
  PATIENT_PROCEDURE: `${ROUTES.TRANSACTION}/clinic-patient-procedure`,
  PATIENT_CHECKUP: `${ROUTES.TRANSACTION}/clinic-patient-checkup`,
  //Laboratorium
  LABORATORIUMS: `${ROUTES.TRANSACTION}/laboratoriums`,
  LABORATORIUM: `${ROUTES.TRANSACTION}/laboratorium`,
  //Clinic Outpatient
  CLINIC_OUTPATIENT_EXAMINATION: `${ROUTES.TRANSACTION}/clinic-outpatient-examination`,
  CLINIC_OUTPATIENT_TREATMENT: `${ROUTES.TRANSACTION}/clinic-outpatient-treatment`,
};

export const ROUTES_USER = {
  DATA_USER: `${ROUTES.USER}/patient-data`,
  DATA_USER_DETAIL: `${ROUTES.USER}/patient-detail`,
};

export const ROUTES_PRODUCT = {
  PRODUCTS: `${ROUTES.PRODUCT}/products`,
  PRODUCT: `${ROUTES.PRODUCT}/product`,
  ADD_PRODUCT: `${ROUTES.PRODUCT}/add-product`,
  EDIT_PRODUCT: `${ROUTES.PRODUCT}/edit-product`,
  DRUGS: `${ROUTES.PRODUCT}/drugs`,
  DRUG: `${ROUTES.PRODUCT}/drug`,
  VARIANT: `${ROUTES.PRODUCT}/variant`,
  FORM_DRUG: `${ROUTES.PRODUCT}/drug/add`,
  DRUG_STOCKS: `${ROUTES.PRODUCT}/drug-stocks`,
  DRUG_STOCK: `${ROUTES.PRODUCT}/drug-stock`,
  TREATMENTS: `${ROUTES.PRODUCT}/treatments`,
  TREATMENT: `${ROUTES.PRODUCT}/treatment`,
  FORM_TREATMENT: `${ROUTES.PRODUCT}/treatment/form`,
  FORM_SERVICE: `${ROUTES.PRODUCT}/form`,
  SLOT_RESERVATIONS: `${ROUTES.PRODUCT}/slot-reservations`,
  SLOT_RESERVATION: `${ROUTES.PRODUCT}/slot-reservation`,
  TREATMENTS_V2: `${ROUTES.PRODUCT}/treatments-v2`,
  TREATMENT_V2: `${ROUTES.PRODUCT}/treatment-v2`,
  MEDICINES: `${ROUTES.PRODUCT}/medicines`,
  MEDICINE: `${ROUTES.PRODUCT}medicine`,
};

export const ROUTES_PROFILE = {
  PROFILE_USER: `${ROUTES.PROFILE}`,
};

export const ROUTES_NOTIFICATION = {
  LIST_NOTIFICATION: `${ROUTES.NOTIFICATIONS}`,
};

const STATUS = {
  ACTIVE: true,
  INACTIVE: false,
};

export const ALL_MODULES = {
  DASHBOARD: 'DASHBOARD',
  PROVIDER_LIST: 'PROVIDER LIST',
  PROVIDER_DOKTER: 'PROVIDER DOKTER',
  PROVIDER_FASKES: 'PROVIDER FASKES',
  PROVIDER_APOTEK: 'PROVIDER APOTEK',
  PROVIDER_SCHEMA_BISNIS: 'PROVIDER SKEMA BISNIS',
  PROVIDER_PLATFORM_FEE: 'PROVIDER PLATFORM FEE',
  PROVIDER_DRUG_CATALOG: 'KATALOG OBAT',
  PROVIDER_TREATMENT_CATALOG: 'KAATALOG LAYANAN',
  PRODUK_OBAT: 'PRODUK OBAT',
  PRODUK_LAYANAN: 'PRODUK LAYANAN',
  PRODUCT_DRUG_STOCK: 'STOCK OBAT',
  PRODUK_SLOT_RESERVATION: 'PRODUK SLOT RESERVASI',
  MEDEVO_DOKTER_TELMED: 'MEDEVO DOKTER TELMED',
  MEDEVO_TARIF_DOKTER: 'MEDEVO TARIF DOKTER',
  TRANSACTION_MEDEVO_ORDER: 'TRANSAKSI MEDEVO ORDER',
  TRANSACTION_MEDPOINT_ORDER: 'TRANSAKSI MEDPOINT ORDER',
  TRANSACTION_MEDPHARM_ORDER: 'TRANSAKSI MEDPHARM ORDER',
  TRANSACTION_CLINIC_OUTPATIENT: 'KLINIK / RAWAT JALAN',
  TRANSACTION: 'TRANSAKSI',
  TRANSACTION_EPRESCRIPTION_ORDER: 'E-PRESCRIPTION',
  TRANSACTION_REFUND: 'TRANSAKSI REFUND',
  TRANSACTION_ESCROW: 'TRANSAKSI ESCROW',
  TRANSACTION_SALDO: 'SALDO',
  PENGGUNA_MEDIVERSE_USER: 'PENGGUNA MEDIVERSE USER',
  PENGGUNA_DAFTAR_ADMIN: 'PENGGUNA DAFTAR ADMIN',
  PROMO: 'PROMO',
  PROMO_BALANCE_MARKETING: 'PROMO SALDO MARKETING',
  REFERRAL_CODE: 'PROMO REFERRAL',
  LANDING_PAGE_BANNER: 'LANDING PAGE BANNER',
  LANDING_PAGE_QUESTION: 'LANDING PAGE PERTANYAAN',
  LANDING_PAGE_JOIN_PARTNER: 'LANDING PAGE GABUNG MITRA',
  MEDNEWS_VENDOR_LIST: 'MEDNEWS VENDOR LIST',
  MEDNEWS_KONTEN_BERITA: 'MEDNEWS KONTEN BERITA',
  PAYOR_ASURANSI: 'PAYOR ASURANSI',
  PAYOR_PERUSAHAAN: 'PAYOR PERUSAHAAN',
  CONFIGURATION_MASTER_LAYANAN: 'KONFIGURASI MASTER LAYANAN',
  CONFIGURATION_POLI: 'KONFIGURASI POLI',
  CONFIGURATION_MASTER_SPESIALIS: 'KONFIGURASI MASTER SPESIALIS',
  CONFIGURATION_GEJALA_POPULAR: 'KONFIGURASI GEJALA POPULAR',
  CONFIGURATION_KATEGORI_OBAT: 'KONFIGURASI KATEGORI OBAT',
  CONFIGURATION_PRIVACY_POLICY: 'KONFIGURASI PRIVACY POLICY',
  CONFIGURATION_MASTER_PLATFORM_FEE: 'KONFIGURASI MASTER PLATFORM FEE',
  CONFIGURATION_ADMIN_ROLE: 'KONFIGURASI ADMIN ROLE SETTING',
  CONFIGURATION_DRUG_MASTER: 'KONFIGURASI MASTER OBAT',
  CONFIGURATION_TAG_PENCARIAN: 'TAG PENCARIAN',
  CHAT: 'CHAT',
  PRODUK_MAPPING_OBAT: 'MAPPING OBAT',
  KATALOG_PRODUK: 'KATALOG PRODUK',
};

export const MESSAGE = {
  REQUIRED: 'Field tidak boleh kosong',
  POSTAL_CODE: 'Harus berisi 5 angka',
  ONLY_NUMBER: 'Harus berisi angka',
  MAX_TWENTY_CHARACTER: 'Harus di bawah 20 karakter',
  MAX_FIFTY_CHARACTER: 'Harus di bawah 50 karakter',
  MIN_TWO_CHARACTER: 'Harus di atas 2 karakter',
  MIN_THREE_CHARACTER: 'Inputan minimal 3 karakter',
  MAX_EIGHTEEN_CHARACTER: 'Inputan maksimal 20 karakter',
  MIN_PUCHASE: 'Minimal pembelian adalah Rp10.000',
  MIN_CODE_FIVE_CHARACTER: 'Minimal kode voucher adalah 5 karakter',
  MAX_CODE_TEN_CHARACTER: 'Maksimal kode voucher adalah 10 karakter',
  MAX_CODE_TWENTY_CHARACTER: 'Maksimal kode voucher adalah 20 karakter',
  MIN_PURCHASE_LESS_THAN_NOMINAL:
    'Minimum pembelian tidak boleh kurang dari angka nominal',
  MIN_PURCHASE_LESS_THAN_MAX_DISCOUNT:
    'Minimum pembelian tidak boleh kurang dari maksimal diskon',
  MIN_PERCENTAGE: 'Minimum persentase 2%',
  MAX_PERCENTAGE: 'maximum persentase 99%',
  MIN_NOMINAL: 'Minimal pembelian adalah Rp5.000',
  MIN_DISCOUNT: 'Minimal diskon adalah Rp5.000',
  LIMIT_UP_COUPON: 'Nama kupon maximal 20 karakter',
  LIMIT_DOWN_COUPON: 'Nama kupon minimal 2 karakter',
  MINIMUM_AMOUNT: 'Angka nominal minimal Rp5.000',
  MINIMUM_PURCHASE: 'Minimal pembelian Rp10.000',
  QUOTA_CANNOT_ZERO: 'Kuota Kupon tidak boleh 0',
  ALREADY_CONFIRMED: 'Pesanan telah terkonfirmasi Apotek lain',
  CANCELED_ORDER: 'Pasien membatalkan pesanan ketika pembayaran',
  MINIMUN_QUOTA: 'Minimal kuota adalah 1',
  MAXIMUM_TOTAL_BOUGHT:
    'Jumlah paket dibeli tidak boleh lebih dari jumlah paket diresepkan',
};

export const TRANSACTION_STATUS = {
  WAITING_FOR_PAYMENT: 'Menunggu Pembayaran',
  WAITING_FOR_CONFIRMATION: 'Menunggu Konfirmasi',
  SCHEDULED: 'Terjadwalkan',
  ONGOING: 'Sedang Berlangsung',
  COMPLETED: 'Pesanan Selesai',
  FAILED: 'Pesanan Gagal',
  IN_PROGRESS: 'Pesanan Diproses',
  IN_DELIVERY: 'Pesanan Dikirim',
  READY_PICKING_UP: 'Pesanan Siap Diambil',
  PICKING_UP: 'Pesanan Diambil',
  ORDER_ACCEPTED: 'Pesanan Diterima',
  CONFIRMED: 'Pesanan Selesai',
  COMPLAINT_REQUESTED: 'Komplain Diajukan',
  COMPLAINT_ACCEPTED: 'Komplain Diterima',
  COMPLAINT_APPROVED: 'Komplain Disetujui',
  COMPLAINT_REJECTED: 'Komplain Ditolak',
  EPRES_REJECTED: 'Resep Ditolak',
  FILL_COMPLAINT_FORM: 'Isi Form Keluhan',
  WAITING_ROOM_CONSULTATION: 'Ruang Tunggu Konsultasi',
  EXPIRE: 'Pesanan Kadaluarsa',
  PRESCRIPTION_CONFIRMATION: 'Admin Konfirmasi Resep',
  NEED_CONFIRMATION: 'User Konfirmasi Resep',
  IN_PROGRESS_PRESCRIPTION: 'Menunggu Konfirmasi',
  NEW: 'Pesanan Baru',
  COMPLETED_EPRESCRIPTION: 'Siapkan Resep',
  QUEUE: 'Dalam Antrian',
  WAITING_ACTION: 'Menunggu Tindakan',
  EXAMINED: 'Sudah Ditindak',
  FINISHED: 'Pesanan Selesai',
  REGISTER: 'Registrasi',
  UNPAID: 'Belum Lunas',
};

export const TRANSACTION_STATUS_RESPONSE = {
  PENDING: 'pending', // 3
  SETTLEMENT: 'settlement', // 4
  IN_PROGRESS: 'in_progress', // 5
  IN_DELIVERY: 'in_delivery', // 6
  READY_PICKING_UP: 'ready_picking_up', // 7
  PICKING_UP: 'picking_up', // 8
  ORDER_ACCEPTED: 'order_accepted', // 9
  COMPLETED: 'completed', // 10
  CONFIRMED: 'confirmed', // 11
  FAILED: 'failed',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
  CANCEL: 'cancel',
  COMPLAINT_REQUESTED: 'complaint_requested',
  COMPLAINT_ACCEPTED: 'complaint_accepted',
  COMPLAINT_APPROVED: 'complaint_approved',
  COMPLAINT_REJECTED: 'complaint_rejected',
  WAITING_ROOM: 'waiting_room',
  EXPIRE: 'expire',
  SETTLEMENT_PRESCRIPTION: 'settlement',
  NEED_CONFIRMATION: 'need_confirmation', // status e-press 1
  ADMIN_CONFIRMATION: 'admin_confirmation',
  COMPLAINT: 'complaint',
  ALL: 'all',
  NEW: 'new',
  SYSTEM_CONFIRMATION: 'system_confirmation', // status e-press 2
  IN_PROGRESS_PRESCRIPTION: 'in_progress_prescription',
  FAILED_BY_OPERATOR: 'failed_by_operator',
  CANCEL_BY_SENDER: 'canceled_by_sender',
  COMPLETED_EPRESCRIPTION: 'completed_eprescription',
  QUEUE: 'queue',
  TODAY: 'today',
  WAITING_ACTION: 'waiting_action',
  EXAMINED: 'examined',
  FINISHED: 'finished',
  REGISTER: 'register',
  UNPAID: 'unpaid',
};

export const PAYMENT_STATUS_RESPONSE = {
  DRAFT: 'Draft',
  COMPLETED: 'Completed',
  TOBILL: 'To Bill',
  CANCELLED: 'Cancelled',
};

export const REFUND_STATUS_RESPONSE = {
  PAID: 'paid',
  ACCEPTED: 'accepted',
  APPROVED: 'approved',
  CONFIRM: 'confirm',
  REJECTED: 'rejected',
  NEED_PROCESS: 'need_process',
  WAITING: 'waiting',
  COMPLAINT_REQUEST: 'complaint_requested',
  PROCESSED: 'processed',
  REFUND_PROCESSED: 'refund_processed',
  REFUND_REQUEST: 'refund_request',
  REFUND_COMPLETED: 'refund_completed',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

export const REFUND_PAYMENT_METHOD = {
  BANK_TRANSFER: 'VA',
};

export const REFUND_PAYMENT_METHOD_RESPONSE = {
  BANK_TRANSFER: 'bank_transfer',
};

export const RESERVATION_STATUS = {
  SCHEDULED: 'Terjadwalkan',
  IN_PROGRESS: 'Sedang Berlangsung',
  FINISH: 'Selesai',
  CANCELLED: 'Batal Periksa',
};

export const RESERVATION_STATUS_RESPONSE = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in-progress',
  FINISH: 'finish',
  CANCELLED: 'cancelled',
  QUEUE: 'queue',
  REGISTER: 'register',
  UNPAID: 'unpaid',
};

export const TRANSACTION_INSURANCE_TYPE = {
  PRIVATE: 'private',
};

/**
 * Transactions tab
 * use in Medevo/Medpoint/Medpharm order
 */

export const TAB_TRANSACTION = {
  ALL: 'all',
  NEW: 'new',
  ONGOING: 'ongoing',
  ONGOING_MIDTRANS: 'ongoing-midtrans',
  ONGOING_NICEPAY: 'ongoing-nicepay',
  COMPLAIN: 'complain',
  DONE: 'done',
  FAILED: 'failed',
  TODAY: 'today',
  SCHEDULED: 'scheduled',
  NEED_CONFIRMATION: 'need-confirmation',
  QUEUE: 'queue',
  IN_PROGRESS: 'in-progress',
  REGISTER: 'register',
};

/**
 * Transactions filter params
 * use in Medevo/Medpoint/Medpharm order
 */

export const TRANSACTION_FILTER_PARAMS_MEDPOINT = {
  TODAY: [TRANSACTION_STATUS_RESPONSE.TODAY].join(','),
  NEW: [TRANSACTION_STATUS_RESPONSE.PENDING].join(','),
  SCHEDULED: [TRANSACTION_STATUS_RESPONSE.SETTLEMENT].join(','),
  QUEUE: [TRANSACTION_STATUS_RESPONSE.QUEUE].join(','),
  IN_PROGRESS: [
    TRANSACTION_STATUS_RESPONSE.IN_PROGRESS,
    TRANSACTION_STATUS_RESPONSE.WAITING_ACTION,
    TRANSACTION_STATUS_RESPONSE.EXAMINED,
  ].join(','),
  DONE: [
    TRANSACTION_STATUS_RESPONSE.COMPLETED,
    TRANSACTION_STATUS_RESPONSE.CONFIRMED,
    TRANSACTION_STATUS_RESPONSE.FINISHED,
  ].join(','),
  FAILED: [
    TRANSACTION_STATUS_RESPONSE.FAILED,
    TRANSACTION_STATUS_RESPONSE.CANCEL,
    TRANSACTION_STATUS_RESPONSE.CANCELLED,
    TRANSACTION_STATUS_RESPONSE.EXPIRE,
  ].join(','),
};

export const PROMO_TARGET_RESPONSE = {
  PUBLIC: 'public',
  SPECIFIC: 'specific',
};

export const PROMO_TARGET = {
  PUBLIC: 'Publik',
  SPECIFIC: 'Khusus',
};

export const PROMO_CATEGORY_RESPONSE = {
  DISCOUNT_PRODUCT: 'discount-product',
  PACKET_DISCOUNT: 'packet-discount',
  FREE_DELIVERY: 'free-delivery',
  FLASH_SALE: 'flash-sale',
  VOUCHER_CASHBACK: 'vaucher-cashback',
  BUNDLING: 'bundling',
  REFERRAL_CODE: 'referral_code',
};

export const PROMO_CATEGORY = {
  DISCOUNT_PRODUCT: 'Diskon Produk',
  PACKET_DISCOUNT: 'Paket Diskon',
  FREE_DELIVERY: 'Bebas Ongkir',
  FLASH_SALE: 'Flash Sale',
  VOUCHER_CASHBACK: 'Voucher Cashback',
  BUNDLING: 'Bundling',
  REFERRAL_CODE: 'Referral Code',
};

export const REFUND_STATUS = {
  NEED_TO_BE_PROCESSED: 'Perlu Diproses',
  REFUND_ACCEPTED: 'Refund Berhasil',
  REFUND_REFUSED: 'Refund Ditolak',
  REFUND_PROCESSED: 'Refund Diproses',
  REFUND_FAILED: 'Refund Gagal',
  REFUND_APPROVED: 'Refund Disetujui',
};

export const DAYS = [
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
  'Minggu',
];

export const USER_ROLES = {
  ADMIN_PASIEN: 'ADMIN PASIEN',
  DOKTER: 'DOKTER',
};

export const ROLES = {
  SUPER_ADMIN: 1,
  SUPER_ADMIN_VIEW_ONLY: 2,
  ADMINISTRATOR_MEDIVERSE: 3,
  ADMINISTRATOR_MEDIVERSE_VIEW_ONLY: 4,
  ADMINISTRATOR_DOKTER: 5,
  ADMINISTRATOR_PASIEN: 6,
  ADMINISTRATOR_FINANCE: 7,
  ADMINISTRATOR_MARKETING: 8,
  ADMINISTRATOR_FASYANKES: 9,
  ADMINISTRATOR_FEATURE: 10,
  ADMINISTRATOR_VENDOR: 11,
  ADMINISTRATOR_CORPORATE: 12,
  ADMIN_DOKTER: 13,
  ADMIN_FINANCE: 14,
  ADMIN_MARKETING: 15,
  ADMIN_FASYANKES: 16,
  ADMIN_FEATURE: 17,
  ADMIN_VENDOR: 18,
  ADMIN_CORPORATE: 19,
  ADMIN_CI_CX: 20,
  OPERATOR_DOKTER: 21,
  OPERATOR_FINANCE: 22,
  OPERATOR_MARKETING: 23,
  OPERATOR_FASYANKES: 24,
  OPERATOR_FEATURE: 25,
  OPERATOR_VENDOR: 26,
  OPERATOR_CORPORATE: 27,
  OPERATOR_SUPPORT_TEAM: 28,
  USER: 29,
  USER_CORPORATE: 30,
  ADMIN_PASIEN: 31,
  DOKTER: 32,
  ADMIN_PROVIDER: 33,
  ADMIN_APOTEK: 34,
  ADMIN_FASKES: 35,
  FINANCE_PROVIDER: 36,
  FINANCE_APOTEK: 37,
  FINANCE_DOKTER: 38,
  FINANCE_FASKES: 39,
  MARKETING_PROVIDER: 40,
  MARKETING_APOTEK: 41,
  MARKETING_DOKTER: 42,
  MARKETING_FASKES: 43,
  ADMIN_NEWS: 44,
  ADMINISTRATOR_PROVIDER: 45,
  ADMINISTRATOR_PROVIDER_MEDPHARM: 46,
  ADMINISTRATOR_PROVIDER_MEDPOINT: 47,
  OPERATOR_APOTEK: 48,
  OPERATOR_FASKES: 49,
  MARKETING_PROVIDER_MEDPOINT: 54,
  MARKETING_PROVIDER_MEDPHARM: 55,
  PERAWAT: 56,
};

export const ROLES_NAME = {
  SUPER_ADMIN: 'Super Admin',
  SUPER_ADMIN_VIEW_ONLY: 'Super Admin(View Only)',
  ADMINISTRATOR_MEDIVERSE: 'Administrator Mediverse',
  ADMINISTRATOR_MEDIVERSE_VIEW_ONLY: 'Administrator Mediverse(View Only)',
  ADMINISTRATOR_DOKTER: 'Administrator Dokter',
  ADMINISTRATOR_PASIEN: 'Administrator Pasien',
  ADMINISTRATOR_FINANCE: 'Administrator Finance',
  ADMINISTRATOR_MARKETING: 'Administrator Marketing',
  ADMINISTRATOR_FASYANKES: 'Administrator Fasyankes',
  ADMINISTRATOR_FEATURE: 'Administrator Feature',
  ADMINISTRATOR_VENDOR: 'Administrator Vendor',
  ADMINISTRATOR_CORPORATE: 'Administrator Corporate',
  ADMIN_DOKTER: 'Admin Dokter',
  ADMIN_FINANCE: 'Admin Finance',
  ADMIN_MARKETING: 'Admin Marketing',
  ADMIN_FASYANKES: 'Admin Fasyankes',
  ADMIN_FEATURE: 'Admin Feature',
  ADMIN_VENDOR: 'Admin Vendor',
  ADMIN_CORPORATE: 'Admin Corporate',
  ADMIN_CI_CX: 'Admin CI/CX',
  OPERATOR_DOKTER: 'Operator Dokter',
  OPERATOR_FINANCE: 'Operator Finance',
  OPERATOR_MARKETING: 'Operator Marketing',
  OPERATOR_FASYANKES: 'Operator Fasyankes',
  OPERATOR_FEATURE: 'Operator Feature',
  OPERATOR_VENDOR: 'Operator Vendor',
  OPERATOR_CORPORATE: 'Operator Corporate',
  OPERATOR_SUPPORT_TEAM: 'Operator Support Team',
  OPERATOR_APOTEK: 'Operator Apotek',
  USER: 'User',
  USER_CORPORATE: 'User Coporate',
  ADMIN_PASIEN: 'Admin Pasien',
  DOKTER: 'Dokter',
  ADMIN_PROVIDER: 'Admin Provider',
  ADMIN_APOTEK: 'Admin Apotek',
  ADMIN_FASKES: 'Admin Faskes',
  FINANCE_PROVIDER: 'Finance Provider',
  FINANCE_APOTEK: 'Finance Apotek',
  FINANCE_DOKTER: 'Finance Dokter',
  FINANCE_FASKES: 'Finance Faskes',
  MARKETING_PROVIDER: 'Marketing Provider',
  MARKETING_APOTEK: 'Marketing Apotek',
  MARKETING_DOKTER: 'Marketing Dokter',
  MARKETING_FASKES: 'Marketing Faskes',
  ADMIN_NEWS: 'Admin News',
  ADMINISTRATOR_PROVIDER: 'Administrator Provider',
  ADMINISTRATOR_PROVIDER_MEDPHARM: 'Administrator Provider Medpharm',
  ADMINISTRATOR_PROVIDER_MEDPOINT: 'Administrator Provider Medpoint',
  OPERATOR_FASKES: 'Operator Faskes',
  MARKETING_PROVIDER_MEDPOINT: 'Marketing Provider Medpoint',
  MARKETING_PROVIDER_MEDPHARM: 'Marketing Provider Medpharm',
};

export const ZOOM_TYPE = {
  IN: 'zoom-in',
  OUT: 'zoom-out',
};

export default {
  COLORS,
  TEXT,
  THEME,
  COOKIES,
  STATUS,
};
