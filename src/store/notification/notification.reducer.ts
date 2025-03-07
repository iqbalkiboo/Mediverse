import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {
  getListNotification,
  putNotification,
} from '@/src/client/notification';
import soundNotif from '/notification-sound.mp3';

export const initialState = {
  notification: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isFetching: false,
    audio: new Audio(soundNotif),
    listData: [],
    data: [],
    metadata: {
      page: 1,
      size: 1,
      totalPage: 1,
      totalData: 0,
      unreadCount: 0,
    },
    errorMessage: '',
  },
  updateNotification: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isNotification: false,
  },
  params: {
    page: 1,
    limit: 10,
    offset: 0,
    startDate: '',
    endDate: '',
    category: '',
  },
};

export const resolveGetListNotification = createAsyncThunk(
    'resolve/notification/list',
    async (payload: any, {rejectWithValue}) => {
      const response = await getListNotification(payload);
      if (response.status === 200) {
        return response;
      }
      return rejectWithValue(response.data);
    },
);

export const resolveGetListClickNotification = createAsyncThunk(
    'resolve/notification/click',
    async (payload: any, {rejectWithValue}) => {
      const response = await getListNotification(payload);
      if (response.status === 200) {
        return response;
      }
      return rejectWithValue(response.data);
    },
);

export const resolvePutNotification = createAsyncThunk(
    'resolve/notification/update',
    async (payload: any, {rejectWithValue}) => {
      const response = await putNotification(payload);
      if (response.status === 200) {
        return response;
      }
      return rejectWithValue(response.data);
    },
);


export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resolveGetListNotification.pending, (state) => {
      state.notification.isLoading = true;
      state.notification.isError = false;
    });
    builder.addCase(resolveGetListNotification.fulfilled, (state, {payload}) => {
      state.notification.isLoading = false;
      state.notification.isSuccess = true;
      state.notification.isError = false;
      state.notification.isFetching = false;
      state.notification.data = payload.data?.data;

      // meta data list notif
      state.notification.metadata.page = payload?.data?.metadata?.page || 1;
      state.notification.metadata.size = payload?.data?.metadata?.per_page || 10;
      state.notification.metadata.totalPage = payload?.data?.metadata?.total_page || 1;
      state.notification.metadata.totalData = payload?.data?.metadata?.total_row || 0;
    });
    builder.addCase(resolveGetListNotification.rejected, (state, {payload}: any) => {
      state.notification.isLoading = false;
      state.notification.isSuccess = false;
      state.notification.isError = true;
      state.notification.errorMessage = payload.message;
    });
    builder.addCase(resolvePutNotification.pending, (state) => {
      state.updateNotification.isLoading = true;
      state.updateNotification.isError = false;
      state.updateNotification.isSuccess = false;
    });
    builder.addCase(resolvePutNotification.fulfilled, (state) => {
      state.updateNotification.isLoading = false;
      state.updateNotification.isError = false;
      state.updateNotification.isSuccess = true;
    });
    builder.addCase(resolvePutNotification.rejected, (state) => {
      state.updateNotification.isLoading = false;
      state.updateNotification.isSuccess = false;
      state.updateNotification.isError = true;
    });
    builder.addCase(resolveGetListClickNotification.pending, (state) => {
      state.notification.isLoading = true;
      state.notification.isError = false;
    });
    builder.addCase(resolveGetListClickNotification.fulfilled, (state, {payload}) => {
      state.notification.isLoading = false;
      state.notification.isError = false;
      state.notification.isSuccess = true;
      state.notification.listData = payload.data?.data;

      // meta data click notification
      state.notification.metadata.unreadCount = payload?.data?.metadata?.unread_count || 0;
    });
    builder.addCase(resolveGetListClickNotification.rejected, (state, {payload}: any) => {
      state.notification.isError = true;
      state.notification.isLoading = false;
      state.notification.isSuccess = false;
      state.notification.errorMessage = payload.message;
    });
  },
  reducers: {
    setNotifcation: (state, {payload}) => {
      state.notification[payload.name] = payload.value;
    },
    setNotificationData: (state, {payload}) => {
      state.notification.data[payload.index][payload.name] = payload.value;
    },
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setUpdateNotification: (state, {payload}) => {
      state.updateNotification[payload.name] = payload.value;
    },
    setNotificationFetching: (state, {payload}) => {
      state.notification.isFetching = payload;
    },
    resetListDataNotification: (state) => {
      state.notification.listData = initialState.notification.listData;
    },
  },
});

export const {
  setParams,
  setNotifcation,
  setNotificationData,
  setUpdateNotification,
  setNotificationFetching,
  resetListDataNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
