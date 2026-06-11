import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {ConvexProvider} from 'convex/react';
import {convex} from './lib/convex.ts';
import App from './App.tsx';
import './index.css';

const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </StrictMode>,
);
