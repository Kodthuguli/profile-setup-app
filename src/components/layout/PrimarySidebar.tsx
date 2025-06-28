import { Box, IconButton, Tooltip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import Logo from '../../assets/images/Icon.svg';
import Home from '../../assets/images/home.svg';
import Supervisor from '../../assets/images/supervisor_account.svg';
import Contact from '../../assets/images/white_contract.svg';
import Setting from '../../assets/images/Setting.svg';

const navItems = [
  {
    icon: <img src={Home} alt="Dashboard" width={14} height={14} style={{ cursor: 'pointer' }} />,
    label: 'Dashboard',
    path: '/'
  },
  {
    icon: <img src={Supervisor} alt="Profile" width={14} height={14} style={{ cursor: 'pointer' }} />,
    label: 'Profile',
    path: '/profile'
  },
  {
    icon: <img src={Contact} alt="Documents" width={14} height={14} style={{ cursor: 'pointer' }} />,
    label: 'Documents',
    path: '/documents'
  },
  {
    icon: <img src={Setting} alt="Settings" width={14} height={14} style={{ cursor: 'pointer' }} />,
    label: 'Settings',
    path: '/settings'
  }
];

const PrimarySidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 72,
        bgcolor: '#272C6A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%'
      }}
    >
      {/* App Logo */}
      <Box sx={{ pt: 2, mb: 4 }}>
        <img src={Logo} alt="App Logo" width={32} height={32} />
      </Box>

      {/* Sidebar Navigation Icons */}
      {navItems.map(({ icon, label, path }) => {
        const isActive =
          path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

        return (
          <Tooltip key={label} title={label} placement="right">
            <IconButton
              onClick={() => navigate(path)}
              sx={{
                mb: 2,
                color: isActive ? '#FFD700' : 'white',
                bgcolor: isActive ? '#555D9D' : 'transparent',
                '&:hover': { bgcolor: '#3949AB' }
              }}
            >
              {icon}
            </IconButton>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default PrimarySidebar;
