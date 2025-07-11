import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import './index.css';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import App from './App.jsx';
import { store } from './store';
import i18n from './i18n.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>
);