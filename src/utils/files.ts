import { getBlobFile } from '@/client/file';

export const handleDownloadFile = async (fileUrl, fileName) => {
  try {
    const response = await getBlobFile(fileUrl);
    if (response.status === 200) {
      const result = response?.data;
      if (!result) return;

      const blob = await result;
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Download failed', response?.data);
    }
  } catch (error) {
    console.error('Download failed: ', error);
  }
};
