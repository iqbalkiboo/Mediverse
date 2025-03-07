// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { config } from './firebaseConfig';
import { paths } from '@/src/configs';
import secure from '@/src/utils/secure';
import Utils from '@/src/utils/cookieUtils';

const baseURL = import.meta.env.VITE_APP_BASE_URL;
const pathSearch = paths.notification;
const APP_KEY = secure.decrypt(import.meta.env.VITE_APP_KEY);

const detailUser = await Utils.getUser();

const firebaseApp = initializeApp(config);
const messaging = getMessaging(firebaseApp);

export const getOrRegisterServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    return window.navigator.serviceWorker
      .getRegistration('/firebase-push-notification-scope')
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register(
          '/firebase-messaging-sw.js',
          {
            scope: '/firebase-push-notification-scope',
          }
        );
      });
  }
  throw new Error('The browser doesn`t support service worker.');
};

export const getFirebaseToken = async () =>
  await getOrRegisterServiceWorker().then((serviceWorkerRegistration) =>
    getToken(messaging, { vapidKey: APP_KEY, serviceWorkerRegistration })
      .then((currentToken) => {
        if (currentToken) {
          Utils.setFCMToken(
            JSON.stringify({
              token: currentToken,
            })
          );
          subscribeToTopic(currentToken, `provider_${detailUser?.type}`);
        } else {
          console.error(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch(() => console.error('Can`t get current token'))
  );

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export const subscribeToTopic = async (token, topic) => {
  const authToken = Utils.getAuth()?.access_token;
  try {
    const reqOne = await fetch(
      `${baseURL}${pathSearch}/notifications/subscribe`,
      {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Bearer ' + authToken,
          'Content-type': 'application/json; charset=UTF-8',
        }),
        body: JSON.stringify({
          topic: ['provider_all'],
          firebase_token: token,
        }),
      }
    );

    const reqTwo = await fetch(
      `${baseURL}${pathSearch}/notifications/subscribe`,
      {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Bearer ' + authToken,
          'Content-type': 'application/json; charset=UTF-8',
        }),
        body: JSON.stringify({
          topic: [topic],
          firebase_token: token,
        }),
      }
    );

    const response = Promise.all([reqOne, reqTwo]);

    if (response.status < 200 || response.status >= 400) {
      console.log('status', response.status);
    }
  } catch (error) {
    console.log('error');
  }
};
