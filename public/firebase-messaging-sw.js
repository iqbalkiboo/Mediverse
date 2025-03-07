// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive
import {precacheAndRoute} from 'workbox-precaching';
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');
importScripts('serviceWorkerConfig.js');

try {
  firebase.initializeApp(JSON.parse(atob(config)));
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);
  });
} catch (error) {
  console.error('Firebase initialization error:', error);
}

self.addEventListener('push', (event) => {
  const data = event.data.json();
  const type = data.data.Type;
  const idOrderMedpharm = JSON.parse(JSON.parse(data.data?.CustomData)[0].metadata).transaction_type_id;
  const notificationBody = JSON.parse(data?.data?.NotificationTemplate)?.sub_title;

  const mobileFcmChannel = new BroadcastChannel('mobile-channel');
  mobileFcmChannel.postMessage(data);

  const notificationTitleText = (type) => {
    switch (type) {
      case 'medpharm':
        return 'Pesanan Medpharm';
      case 'e-prescription':
        return 'Pesanan E-Prescription';
      case 'chats':
        return 'Chat';
      default:
        return '';
    }
  };

  const notificationUrl = (type) => {
    switch (type) {
      case 'medpharm':
        return `transactions/medpharm-order/${idOrderMedpharm}`;
      case 'e-prescription':
        return 'transactions/eprescription-orders';
      case 'chats':
        return 'chat';
      default:
        return '';
    }
  };

  self.registration.showNotification(notificationTitleText(type), {
    body: notificationBody,
    icon: '/icon-192x192.png',
    data: {
      url: notificationUrl(type),
    },
  });
});

self.addEventListener('notificationclick', (event) => {
  const url = self.location.origin;
  const suffixUrl = event.notification.data.url;
  event.waitUntil(
      clients.matchAll({type: 'window'}).then( (windowClient) => {
        // Check if there is already a window/tab open with the target URL
        for (let i = 0; i < windowClient.length; i++) {
          const client = windowClient[i];
          const urlClient = new URL(client.url);
          // If so, just focus it.
          if (urlClient.origin === url && 'focus' in client) {
            if (!client.focused) client.focus();
            return client.navigate(`${url}/${suffixUrl}`);
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(`${url}/${suffixUrl}`);
        }
      }),
  );
});

precacheAndRoute(self.__WB_MANIFEST);
