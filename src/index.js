import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/App'; 

import '../src/style/index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);