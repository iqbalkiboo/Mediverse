import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import FlagsProvider from '@/src/context/flagsProvider';
import App from './App';
import store from './store';

import './assets/styles/styles.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <FlagsProvider default={{}}>
    <Provider store={store}>
      <App />
    </Provider>
  </FlagsProvider>
);
