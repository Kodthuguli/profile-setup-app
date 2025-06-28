// src/routes/AppRoutes.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProfileSetup from '../features/profile/pages/ProfileSetup';

/**
 * Defines all application routes wrapped by the main Layout.
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* All pages share the same Layout wrapper */}
      <Route element={<Layout />}>
        
        {/* Dashboard (home) */}
        <Route
          index
          element={<h1>Dashboard</h1>}
        />

        {/* Profile section with nested routes */}
        <Route path="profile">
          {/* Redirect /profile to /profile/setup */}
          <Route
            index
            element={<Navigate to="setup" replace />}
          />

          {/* Profile Setup workflow */}
          <Route
            path="setup"
            element={<ProfileSetup />}
          />

          {/* View Profile placeholder */}
          <Route
            path="view"
            element={<h1>View Profile</h1>}
          />

          {/* Profile Insights placeholder */}
          <Route
            path="insights"
            element={<h1>Insights</h1>}
          />
        </Route>

        {/* Application settings */}
        <Route
          path="settings"
          element={<h1>Settings</h1>}
        />

        {/* Additional section (documents) */}
        <Route
          path="documents"
          element={<h1>Documents</h1>}
        />

        {/* Fallback: any unknown URL redirects to Dashboard */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
