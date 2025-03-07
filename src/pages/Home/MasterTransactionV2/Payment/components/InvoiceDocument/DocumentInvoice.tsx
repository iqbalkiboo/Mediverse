import { useEffect, useState } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import angkaTerbilang from '@develoka/angka-terbilang-js';

import { formatDateWithTime } from '@/utils/formatDate';
import { formatRupiah } from '@/utils/fromatCurrency';
import PlusJakartaSansRegular from '@/src/assets/fonts/PlusJakartaSans-Regular.ttf';
import PlusJakartaSansBold from '@/src/assets/fonts/PlusJakartaSans-Bold.ttf';
import PlusJakartaSansItalic from '@/src/assets/fonts/PlusJakartaSans-Italic.ttf';
import useTransaction from '@/home/MasterTransactionV2/Transaction/useTransaction';

Font.register({
  family: 'Plus Jakarta Sans',
  fonts: [
    { src: PlusJakartaSansRegular, fontWeight: 'normal' },
    { src: PlusJakartaSansBold, fontWeight: 'bold' },
    { src: PlusJakartaSansItalic, fontStyle: 'italic' },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Plus Jakarta Sans',
    backgroundColor: '#F5F6FF',
    color: '#1D2433',
  },
  container: {
    padding: '15 20',
    backgroundColor: 'white',
  },
  section: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
  },
  textContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  baseText: {
    fontWeight: 'normal',
    fontSize: 10,
  },
  baseTextBold: {
    fontWeight: 'semibold',
    fontSize: 10,
  },
  table: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #9E9E9E',
  },
  headerCell: {
    padding: 8,
    fontSize: 10,
    color: '#9E9E9E',
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
  },
  cell: {
    padding: 4,
    fontSize: 10,
    color: '#1B1B28',
  },
  image: {
    height: 35,
  },
});

const baseURLFile = import.meta.env.VITE_APP_BASE_URL_FRAPPE_FILE;

const DocumentInvoice = () => {
  const [transactionData, setTransactionData] = useState<any>();

  const {
    data: { transactionDetail },
  } = useTransaction();

  useEffect(() => {
    if (transactionDetail.data) setTransactionData(transactionDetail.data);
  }, [transactionDetail]);

  if (!transactionDetail.data) return <></>;

  const isDirectPayment =
    transactionData?.appointment_queue?.type_registration ===
    'Pembelian Langsung';

  return (
    <Document>
      <Page size={{ width: 842, height: 595 }} style={styles.page}>
        <View style={[styles.container, { marginBottom: 5 }]} fixed>
          <View style={[styles.section, { justifyContent: 'space-between' }]}>
            {transactionData?.clinic?.company_logo && (
              <Image
                style={styles.image}
                src={baseURLFile + transactionData?.clinic?.company_logo}
              />
            )}

            <View style={styles.textContainer}>
              <Text style={styles.titleText}>
                {isDirectPayment
                  ? 'Invoice'
                  : transactionData?.appointment_queue?.queue_type
                  ? `Billing ${transactionData.appointment_queue.queue_type}`
                  : 'Invoice'}
              </Text>
              {/*<Text style={styles.baseText}>001/A123/MED/2025</Text>*/}
            </View>
          </View>
        </View>

        <View style={[styles.container, { marginBottom: 5 }]}>
          <View style={styles.row}>
            <View style={styles.column}>
              <View style={[styles.section, { marginBottom: 5 }]}>
                <Text style={[styles.baseText, { width: 130 }]}>No Reg/MR</Text>
                <Text style={styles.baseTextBold}>
                  {transactionData?.sales_order
                    ? transactionData.sales_order
                    : '-'}
                </Text>
              </View>
              <View style={[styles.section, { marginBottom: 5 }]}>
                <Text style={[styles.baseText, { width: 130 }]}>
                  Tanggal Masuk
                </Text>
                <Text style={styles.baseTextBold}>
                  {transactionData?.creation
                    ? formatDateWithTime(transactionData.creation, false, true)
                    : '-'}
                </Text>
              </View>
              <View style={[styles.section, { marginBottom: 5 }]}>
                <Text style={[styles.baseText, { width: 130 }]}>
                  {isDirectPayment ? 'Customer' : 'Pasien'}
                </Text>
                <Text style={styles.baseTextBold}>
                  {transactionData?.sales_order_detail?.customer_name
                    ? transactionData.sales_order_detail.customer_name
                    : '-'}
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={[styles.baseText, { width: 130 }]}>
                  Dokter Utama
                </Text>
                <Text style={styles.baseTextBold}>
                  {transactionData?.doctor_detail?.practitioner_name
                    ? transactionData.doctor_detail.practitioner_name
                    : '-'}
                </Text>
              </View>
            </View>

            <View style={styles.column}>
              <View style={[styles.section, { marginBottom: 5 }]}>
                <Text style={[styles.baseText, { width: 130 }]}>
                  Poliklinik
                </Text>
                <Text style={styles.baseTextBold}>
                  {transactionData?.clinic?.company_name
                    ? transactionData.clinic.company_name
                    : '-'}
                </Text>
              </View>
              <View style={[styles.section, { marginBottom: 5 }]}>
                <Text style={[styles.baseText, { width: 130 }]}>
                  Tanggal Keluar
                </Text>
                <Text style={styles.baseTextBold}>
                  {transactionData?.modified
                    ? formatDateWithTime(transactionData.modified, false, true)
                    : '-'}
                </Text>
              </View>
              <View style={[styles.section, { marginBottom: 5 }]}>
                <Text style={[styles.baseText, { width: 130 }]}>
                  Penjamin Bayar
                </Text>
                <Text style={styles.baseTextBold}>
                  {transactionData?.payor ? 'Asuransi' : 'Pribadi'}
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={[styles.baseText, { width: 130 }]}>Instansi</Text>
                <Text style={styles.baseTextBold}>
                  {transactionData?.payor ? transactionData.payor : '-'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.container, { marginBottom: 5 }]}>
          <View style={styles.table}>
            {/* Header */}
            <View style={[styles.tableRow, { width: '100%' }]}>
              <Text
                style={[styles.headerCell, { width: '30%', textAlign: 'left' }]}
              >
                Layanan/Item
              </Text>
              <Text style={[styles.headerCell, { width: '15%' }]}>Satuan</Text>
              <Text style={[styles.headerCell, { width: '10%' }]}>Jumlah</Text>
              <Text style={[styles.headerCell, { width: '15%' }]}>Harga</Text>
              <Text style={[styles.headerCell, { width: '15%' }]}>Diskon</Text>
              <Text style={[styles.headerCell, { width: '15%' }]}>
                Sub Total
              </Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={[styles.cell, { padding: 8 }]}>
                BIAYA {isDirectPayment ? 'LAYANAN' : 'TINDAKAN'}
              </Text>
              {transactionDetail.data?.sales_order_detail?.items?.map(
                (item, index) => (
                  <View
                    key={index}
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 2,
                    }}
                  >
                    <Text
                      style={[
                        styles.cell,
                        { width: '30%', textAlign: 'left', paddingLeft: 20 },
                      ]}
                    >
                      {item.item_name}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        { width: '15%', textAlign: 'center' },
                      ]}
                    >
                      {item.uom}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        { width: '10%', textAlign: 'center', color: '#9E9E9E' },
                      ]}
                    >
                      {item.qty}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        { width: '15%', textAlign: 'center' },
                      ]}
                    >
                      {formatRupiah(item.base_price_list_rate, 'Rp')}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        { width: '15%', textAlign: 'center' },
                      ]}
                    >
                      {formatRupiah(item.discount_amount, 'Rp')}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        { width: '15%', textAlign: 'center' },
                      ]}
                    >
                      {formatRupiah(item.amount, 'Rp')}
                    </Text>
                  </View>
                )
              )}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 40,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#E0E0E0',
              padding: '0px 20px',
              marginTop: 8,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Text style={styles.baseText}>Terbilang: </Text>
              <Text
                style={[
                  styles.baseText,
                  {
                    textDecoration: 'underline',
                    fontStyle: 'italic',
                    textTransform: 'capitalize',
                  },
                ]}
              >
                {transactionData?.sales_order_detail?.grand_total
                  ? angkaTerbilang(
                      transactionData.sales_order_detail.grand_total
                    ) + ' Rupiah'
                  : '-'}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: '20px',
              }}
            >
              <Text style={styles.baseText}>Total Tagihan:</Text>
              <Text
                style={[
                  styles.baseTextBold,
                  { fontSize: 12, marginLeft: '30px' },
                ]}
              >
                {transactionData?.sales_order_detail?.grand_total
                  ? formatRupiah(
                      transactionData.sales_order_detail.grand_total,
                      'Rp'
                    )
                  : ''}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.container, { flexGrow: 1 }]} wrap={false}>
          <View style={styles.textContainer}>
            <View style={[styles.row, { width: 300 }]}>
              <View style={styles.column}>
                {transactionData?.payor && (
                  <Text style={[styles.baseText, { marginBottom: 10 }]}>
                    Dibayar Penjamin {transactionData?.payor}
                  </Text>
                )}
                {!transactionData?.payor && (
                  <Text style={[styles.baseText, { marginBottom: 10 }]}>
                    Pembayaran Cash
                  </Text>
                )}
                <Text style={[styles.baseText, { marginBottom: 10 }]}>
                  Total Bayar
                </Text>
                <Text style={[styles.baseText, { marginBottom: 10 }]}>
                  Sisa Belum Bayar
                </Text>
                <Text style={styles.baseText}>Kembalian</Text>
              </View>
              <View style={[styles.column, { width: '30%' }]}>
                {transactionData?.payor && (
                  <Text
                    style={[
                      styles.baseText,
                      { textAlign: 'center', marginBottom: 10 },
                    ]}
                  >
                    {formatRupiah(
                      transactionData?.sales_order_detail?.grand_total || 0,
                      'Rp'
                    )}
                  </Text>
                )}
                {!transactionData?.payor && (
                  <Text
                    style={[
                      styles.baseText,
                      { textAlign: 'center', marginBottom: 10 },
                    ]}
                  >
                    {transactionData?.payor
                      ? 'Rp0'
                      : formatRupiah(
                          transactionData?.sales_order_detail?.paid_amount || 0,
                          'Rp'
                        )}
                  </Text>
                )}
                <Text
                  style={[
                    styles.baseTextBold,
                    { textAlign: 'center', marginBottom: 10 },
                  ]}
                >
                  {formatRupiah(
                    transactionData?.sales_order_detail?.grand_total || 0,
                    'Rp'
                  )}
                </Text>
                <Text
                  style={[
                    styles.baseText,
                    { textAlign: 'center', marginBottom: 10 },
                  ]}
                >
                  Rp0
                </Text>
                <Text style={[styles.baseText, { textAlign: 'center' }]}>
                  {formatRupiah(
                    transactionData?.sales_order_detail?.exchange_amount || 0,
                    'Rp'
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DocumentInvoice;
