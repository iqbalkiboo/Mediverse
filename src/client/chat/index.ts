import { paths } from '@/src/configs';
import Axios from '@/client/services';

const pathChat = paths.chat;
const pathNotification = paths.notification;

export const getUserAgoraToken = async (username: string) => {
  try {
    return await Axios.get(`${pathChat}/users/${username}/chat-token`);
  } catch (error: any) {
    return error.response;
  }
};

export const getUserAvailability = async (username: string) => {
  try {
    return await Axios.get(`${pathChat}/users/${username}/availability`);
  } catch (error: any) {
    return error.response;
  }
};

export const getChatUserMetadata = async (idList: string) => {
  try {
    return await Axios.get(`${pathChat}/users/metadata?user_id=` + idList);
  } catch (error: any) {
    return error.response;
  }
};

export const sendChatNotification = async (payload) => {
  try {
    return await Axios.post(`${pathNotification}/notifications`, payload);
  } catch (error: any) {
    return error.response;
  }
};
