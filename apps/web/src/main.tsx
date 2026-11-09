import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/800.css';
import './index.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Không tìm thấy phần tử root');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);