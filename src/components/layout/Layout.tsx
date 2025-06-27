import { Box, useMediaQuery, useTheme } from '@mui/material';
import PrimarySidebar from './PrimarySidebar';
import SecondarySidebar from './SecondarySidebar';
import { useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const showSecondarySidebar = location.pathname.startsWith('/profile');

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <PrimarySidebar />
      {!isMobile && showSecondarySidebar && <SecondarySidebar />}
      <Box component="main" sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
