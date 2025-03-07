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

import {
  calculateBirthDate,
  formatDate,
  formatDateWithDay,
} from '@/utils/formatDate';
import PlusJakartaSansRegular from '@/src/assets/fonts/PlusJakartaSans-Regular.ttf';
import PlusJakartaSansBold from '@/src/assets/fonts/PlusJakartaSans-Bold.ttf';
import PinyonScript from '@/src/assets/fonts/PinyonScript.ttf';
import usePatientTreatment from '@/home/MasterTransactionV2/ClinicOutpatient/patient-treatment/usePatientTreatment';

Font.register({
  family: 'Plus Jakarta Sans',
  fonts: [
    { src: PlusJakartaSansRegular, fontWeight: 'normal' },
    { src: PlusJakartaSansBold, fontWeight: 'bold' },
  ],
});
Font.register({
  family: 'Pinyon Script',
  src: PinyonScript,
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Plus Jakarta Sans',
    backgroundColor: '#F5F6FF',
    color: '#1D2433',
  },
  container: {
    padding: '15 40',
    backgroundColor: 'white',
  },
  containerFooter: {
    marginTop: 'auto',
    marginBottom: 0,
    borderTop: 5,
    borderColor: '#F5F6FF',
  },
  section: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  baseText: {
    fontWeight: 'normal',
    fontSize: 10,
  },
  baseTextBold: {
    fontWeight: 'semibold',
    fontSize: 10,
  },
  recipeText: {
    fontFamily: 'Pinyon Script',
    fontSize: 20,
    color: '#5600E8',
    marginVertical: '0 auto',
  },
  recipeContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    paddingVertical: 6,
    borderBottom: 1,
    borderColor: '#D9D9D9',
  },
  recipeInfo: {
    width: '100%',
    marginTop: 25,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#FFDFDF',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  recipeInfoWarn: {
    width: 14,
    height: 14,
    borderRadius: 50,
    backgroundColor: '#FD5A5A',
    color: 'white',
  },
  image: {
    height: 35,
  },
});

const baseURLFile = import.meta.env.VITE_APP_BASE_URL_FRAPPE_FILE;

const DocumentDrugRecipe = () => {
  const [listDrug, setListDrug] = useState<any[]>([]);
  const [birthDate, setBirthDate] = useState<any>(null);

  const {
    data: { dataClinicOutpatient, formDrugRecipe },
  } = usePatientTreatment();

  useEffect(() => {
    getPatientBirthDate();
  }, []);

  useEffect(() => {
    const listData = formDrugRecipe.drug.filter((item) => !item.isConcoction);
    setListDrug(listData);
  }, [formDrugRecipe.drug]);

  const getPatientBirthDate = () => {
    if (!dataClinicOutpatient?.patient_detail?.dob) return;
    const calculateDate = calculateBirthDate(
      dataClinicOutpatient?.patient_detail?.dob
    );
    setBirthDate(calculateDate);
  };

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={[styles.container, { marginBottom: 5 }]} fixed>
          <View style={[styles.section, { justifyContent: 'space-between' }]}>
            {dataClinicOutpatient?.clinic?.company_logo && (
              <Image
                style={styles.image}
                src={baseURLFile + dataClinicOutpatient?.clinic?.company_logo}
              />
            )}

            <View style={styles.textContainer}>
              <Text style={styles.titleText}>Resep Rawat Jalan</Text>
              {/*<Text style={styles.baseText}>001/A123/MED/2025</Text>*/}
            </View>
          </View>
        </View>

        <View style={[styles.container, { marginBottom: 5 }]}>
          <View style={[styles.section, { marginBottom: 7 }]}>
            <Text style={[styles.baseText, { width: 130 }]}>Dokter</Text>
            <Text style={styles.baseTextBold}>
              {dataClinicOutpatient?.doctor_detail?.practitioner_name
                ? dataClinicOutpatient.doctor_detail.practitioner_name
                : '-'}
            </Text>
          </View>
          <View style={[styles.section, { marginBottom: 7 }]}>
            <Text style={[styles.baseText, { width: 130 }]}>No SIP Dokter</Text>
            <Text style={styles.baseTextBold}>
              {dataClinicOutpatient?.doctor_detail?.sip
                ? dataClinicOutpatient.doctor_detail.sip
                : '-'}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.baseText, { width: 130 }]}>No Resep</Text>
            <Text style={styles.baseTextBold}>
              {dataClinicOutpatient?.no_recipe || '-'}
            </Text>
          </View>
        </View>

        <View style={[styles.container, { marginBottom: 5 }]}>
          <View style={[styles.section, { marginBottom: 7 }]}>
            <Text style={[styles.baseText, { width: 130 }]}>Pasien</Text>
            <Text style={styles.baseTextBold}>
              {dataClinicOutpatient?.patient_detail?.patient_name
                ? dataClinicOutpatient.patient_detail.patient_name
                : '-'}
            </Text>
          </View>
          <View style={[styles.section, { marginBottom: 7 }]}>
            <Text style={[styles.baseText, { width: 130 }]}>Tanggal Lahir</Text>
            <Text style={styles.baseTextBold}>
              {dataClinicOutpatient?.patient_detail?.dob
                ? formatDateWithDay(
                    dataClinicOutpatient.patient_detail.dob,
                    'DD MMMM YYYY'
                  )
                : '-'}
            </Text>
          </View>
          <View style={[styles.section, { marginBottom: 7 }]}>
            <Text style={[styles.baseText, { width: 130 }]}>Umur</Text>
            <Text style={styles.baseTextBold}>
              {birthDate ? (
                <>
                  {birthDate.years} <Text style={styles.baseText}>Tahun</Text>{' '}
                  {birthDate.months} <Text style={styles.baseText}>Bulan</Text>{' '}
                  {birthDate.days} <Text style={styles.baseText}>Hari</Text>{' '}
                </>
              ) : (
                '-'
              )}
            </Text>
          </View>
          <View style={[styles.section, { marginBottom: 7 }]}>
            <Text style={[styles.baseText, { width: 130 }]}>Penjamin</Text>
            <Text style={styles.baseTextBold}>
              {dataClinicOutpatient?.payor
                ? dataClinicOutpatient.payor
                : 'Umum'}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.baseText, { width: 130 }]}>
              Tanggal Pemeriksaan
            </Text>
            <Text style={styles.baseTextBold}>
              {dataClinicOutpatient?.appointment_queue?.creation
                ? formatDate(
                    dataClinicOutpatient.appointment_queue.creation,
                    ' ',
                    'MMMM',
                    false
                  )
                : ''}
            </Text>
          </View>
        </View>

        <View style={[styles.container, { marginBottom: 5 }]}>
          <Text style={[styles.titleText, { textAlign: 'center' }]}>RESEP</Text>

          {listDrug?.map((item) => (
            <View
              key={item.name}
              style={[styles.section, { marginTop: 10 }]}
              wrap={false}
            >
              <Text style={[styles.recipeText, { width: 50 }]}>R/</Text>
              <View style={styles.recipeContent}>
                <View
                  style={{
                    width: '60%',
                    display: 'flex',
                    gap: 6,
                  }}
                >
                  <Text style={styles.baseTextBold}>{item.itemName}</Text>
                  <Text
                    style={[styles.baseText, { textTransform: 'capitalize' }]}
                  >
                    {item.quantity} {item.unit}
                  </Text>
                </View>
                <View
                  style={{
                    width: '35%',
                    textAlign: 'right',
                  }}
                >
                  <Text style={styles.baseText}>{item.instruction}</Text>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.recipeInfo} wrap={false}>
            <View style={styles.recipeInfoWarn}>
              <Text
                style={[
                  styles.baseTextBold,
                  { color: 'white', margin: 'auto' },
                ]}
              >
                !
              </Text>
            </View>
            <Text style={styles.baseText}>
              Resep bisa ditebus maksimal 3 (tiga) hari dari tanggal dikeluarkan
              resep ini.
            </Text>
          </View>
        </View>

        <View style={[styles.container, { flexGrow: 1 }]} wrap={false}>
          <View style={styles.textContainer}>
            <View style={{ width: 150 }}>
              <Text style={styles.baseText}>Tertanda,</Text>
              <Text style={styles.baseText}> </Text>
              <Text style={styles.baseText}> </Text>
              <Text style={styles.baseText}> </Text>
              <Text style={styles.baseText}> </Text>
              <Text style={[styles.baseTextBold, { textAlign: 'center' }]}>
                {dataClinicOutpatient?.doctor_detail?.practitioner_name
                  ? dataClinicOutpatient.doctor_detail.practitioner_name
                  : '-'}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.container, styles.containerFooter]} fixed>
          <View style={[styles.section, { justifyContent: 'space-between' }]}>
            <Text
              style={styles.baseText}
              render={({ pageNumber, totalPages }) => (
                <>
                  hal{' '}
                  <Text style={styles.baseTextBold}>
                    {pageNumber > 10 ? pageNumber : '0' + pageNumber}
                  </Text>{' '}
                  dari{' '}
                  <Text style={styles.baseTextBold}>
                    {totalPages > 10 ? totalPages : '0' + totalPages}
                  </Text>
                </>
              )}
            />
            <Text style={styles.baseText}>
              Call Center <Text style={styles.baseTextBold}>1500810</Text>
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DocumentDrugRecipe;
