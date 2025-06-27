import Header from './Header';
import PrimarySidebar from './PrimarySidebar';
import SecondarySidebar from './SecondarySidebar';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const showSecondarySidebar = location.pathname.startsWith('/profile');
  const secondaryWidth = showSecondarySidebar && !isMobile ? (collapsed ? 72 : 220) : 0;

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      {/* Primary Sidebar */}
      <Box sx={{ width: 72, flexShrink: 0 }}>
        <PrimarySidebar />
      </Box>

      {/* Secondary Sidebar */}
      {showSecondarySidebar && !isMobile && (
        <Box sx={{ width: secondaryWidth, flexShrink: 0, transition: 'width 0.3s' }}>
          <SecondarySidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((prev) => !prev)}
          />
        </Box>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0, // important to allow flex shrinking
          overflow: 'hidden'
        }}
      >
        <Header title="Profile Setup" />
        <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
