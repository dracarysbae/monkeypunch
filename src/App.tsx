/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { LanguageProvider } from './contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

const DailyReport = lazy(() => import('./pages/DailyReport'));
const About = lazy(() => import('./pages/About'));
const MapPage = lazy(() => import('./pages/Map'));
const LiveStream = lazy(() => import('./pages/LiveStream'));

function LoadingScreen() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <Suspense fallback={<LoadingScreen />}>
                <DailyReport />
              </Suspense>
            } />
            <Route path="hakkinda" element={
              <Suspense fallback={<LoadingScreen />}>
                <About />
              </Suspense>
            } />
            <Route path="harita" element={
              <Suspense fallback={<LoadingScreen />}>
                <MapPage />
              </Suspense>
            } />
            <Route path="canli-yayin" element={
              <Suspense fallback={<LoadingScreen />}>
                <LiveStream />
              </Suspense>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
