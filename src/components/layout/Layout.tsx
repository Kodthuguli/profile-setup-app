import { useState } from 'react';
import {
  Box,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Outlet } from 'react-router-dom';

import PrimarySidebar from './PrimarySidebar';
import SecondarySidebar from './SecondarySidebar';
import Header from './Header';

import ForwardArrow from '../../assets/images/arrow_forward.svg';

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const secondaryWidth = collapsed ? 0 : 220;

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      {/* Primary Sidebar */}
      <Box sx={{ width: 72, flexShrink: 0, position: 'relative' }}>
        <PrimarySidebar />

        {/* Expand Toggle (desktop only) */}
        {!isMobile && collapsed && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: -12,
              width: 24,
              height: 24,
              bgcolor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              zIndex: (theme) => theme.zIndex.drawer + 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
            }}
          >
            <img
              src={ForwardArrow}
              alt="Expand"
              width={16}
              height={16}
              style={{ cursor: 'pointer' }}
              onClick={() => setCollapsed(false)}
            />
          </Box>
        )}
      </Box>

      {/* Secondary Sidebar (Desktop only) */}
      {!isMobile && !collapsed && (
        <Box
          sx={{
            width: secondaryWidth,
            flexShrink: 0,
            transition: 'width 0.3s',
            position: 'relative',
          }}
        >
          <SecondarySidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(true)}
          />
        </Box>
      )}

      {/* Secondary Sidebar as Drawer (Mobile only) */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: 220,
            },
          }}
        >
          <SecondarySidebar
            collapsed={false}
            onToggleCollapse={() => setMobileDrawerOpen(false)}
          />
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        {/* Pass drawer toggle for mobile */}
        <Header
          title="Profile Setup"
          onMobileMenuClick={() => setMobileDrawerOpen(true)}
          showMobileMenu={isMobile}
        />

        <Box sx={{ flex: 1, p: 2, overflow: 'auto', bgcolor: '#f2f3f7' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
