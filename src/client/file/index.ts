import axios from 'axios';

const baseURLFile = import.meta.env.VITE_APP_BASE_URL_FRAPPE_FILE;

export const getBlobFile = async (fileName) => {
  const path = `${baseURLFile}/${fileName}`;
  try {
    return await axios.get(path, {
      headers: {
        Authorization: `token 2c4059f47216206:2c75a5f4c8b1c76`,
      },
      responseType: 'blob',
    });
  } catch (error: any) {
    return error.response;
  }
};
