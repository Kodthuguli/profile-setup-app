// // src/routes/AppRoutes.tsx
// import { Routes, Route } from 'react-router-dom';

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<h1>Dashboard</h1>} />
//       <Route path="/profile/setup" element={<h1>Profile Setup</h1>} />
//       <Route path="/settings" element={<h1>Settings</h1>} />
//     </Routes>
//   );
// };

// export default AppRoutes;


// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProfileSetup from '../features/profile/pages/ProfileSetup';


const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to profile */}
      {/* <Route path="/" element={<Navigate to="/profile" />} /> */}

      {/* Wrap dashboard, profile, and settings with Layout */}
      /insights
      <Route element={<Layout />}>
        <Route path="/" element={<h1>Dashboard</h1>} />
        <Route path="/insights" element={<h1>Insight</h1>} />
        <Route path="/profile" element={<ProfileSetup />} />
        <Route path="/settings" element={<h1>Settings</h1>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
