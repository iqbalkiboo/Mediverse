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

import { calculateBirthDate, formatDate } from '@/utils/formatDate';
import PlusJakartaSansRegular from '@/src/assets/fonts/PlusJakartaSans-Regular.ttf';
import PlusJakartaSansBold from '@/src/assets/fonts/PlusJakartaSans-Bold.ttf';
import usePatientTreatment from '@/home/MasterTransactionV2/ClinicOutpatient/patient-treatment/usePatientTreatment';

Font.register({
  family: 'Plus Jakarta Sans',
  fonts: [
    { src: PlusJakartaSansRegular, fontWeight: 'normal' },
    { src: PlusJakartaSansBold, fontWeight: 'bold' },
  ],
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
  image: {
    height: 35,
  },
});

const baseURLFile = import.meta.env.VITE_APP_BASE_URL_FRAPPE_FILE;

const DocumentMedicalCertificate = () => {
  const [birthDate, setBirthDate] = useState<any>(null);

  const {
    data: { dataClinicOutpatient, formRecommendationLetter },
  } = usePatientTreatment();

  useEffect(() => {
    getPatientBirthDate();
  }, []);

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
              <Text style={styles.titleText}>Surat Keterangan Dokter</Text>
              {/*<Text style={styles.baseText}>001/A123/MED/2025</Text>*/}
            </View>
          </View>
        </View>

        <View style={[styles.container, { marginBottom: 5 }]}>
          <View style={[styles.section, { marginBottom: 10 }]}>
            <Text style={[styles.baseText, { width: 130 }]}>Pasien</Text>
            <Text style={styles.baseTextBold}>
              {dataClinicOutpatient?.patient_detail?.patient_name
                ? dataClinicOutpatient.patient_detail.patient_name
                : '-'}
            </Text>
          </View>
          <View style={styles.section}>
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
        </View>

        <View style={[styles.container, { marginBottom: 5 }]}>
          <View style={[styles.section, { marginBottom: 20 }]}>
            <Text style={[styles.baseText, { lineHeight: '18px' }]}>
              Berdasarkan atas gejala yang disampaikan pasien saat proses
              konsultasi, sehingga diberikan rekomendasi istirahat untuk pasien:
            </Text>
          </View>

          <View style={[styles.section, { marginBottom: 10 }]}>
            <Text style={[styles.baseText, { width: 130 }]}>Selama</Text>
            <Text style={styles.baseTextBold}>
              {formRecommendationLetter?.detailCertificate?.period ? (
                <>
                  {formRecommendationLetter.detailCertificate?.period}{' '}
                  <Text style={styles.baseText}>Hari</Text>
                </>
              ) : (
                '-'
              )}
            </Text>
          </View>
          <View style={[styles.section, { marginBottom: 10 }]}>
            <Text style={[styles.baseText, { width: 130 }]}>Dari tanggal</Text>
            <Text style={styles.baseTextBold}>
              {formRecommendationLetter?.detailCertificate?.startDate
                ? formatDate(
                    formRecommendationLetter.detailCertificate.startDate,
                    ' ',
                    'MMMM',
                    false
                  )
                : '-'}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.baseText, { width: 130 }]}>S.d. tanggal</Text>
            <Text style={styles.baseTextBold}>
              {formRecommendationLetter?.detailCertificate?.endDate
                ? formatDate(
                    formRecommendationLetter.detailCertificate.endDate,
                    ' ',
                    'MMMM',
                    false
                  )
                : '-'}
            </Text>
          </View>

          <View style={[styles.section, { marginTop: 20 }]}>
            <Text style={[styles.baseText, { lineHeight: '18px' }]}>
              Demikian rekomendasi yang diberikan, semoga dapat dipergunakan
              sebagaimana mestinya.
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

export default DocumentMedicalCertificate;
