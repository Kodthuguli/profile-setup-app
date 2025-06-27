// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Dashboard</h1>} />
      <Route path="/profile/setup" element={<h1>Profile Setup</h1>} />
      <Route path="/settings" element={<h1>Settings</h1>} />
    </Routes>
  );
};

export default AppRoutes;
