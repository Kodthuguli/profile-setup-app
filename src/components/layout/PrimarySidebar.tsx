import { Box, IconButton, Tooltip } from '@mui/material';
import { Home, Person, BarChart, Settings } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { icon: <Home />, label: 'Dashboard', path: '/' },
  { icon: <Person />, label: 'Profile', path: '/profile' },
  { icon: <BarChart />, label: 'Insights', path: '/insights' },
  { icon: <Settings />, label: 'Settings', path: '/settings' }
];

const PrimarySidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 72,
        bgcolor: '#1A237E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 4 }}>
        <img src="/logo.svg" alt="App Logo" width={32} height={32} />
      </Box>

      {/* Icons */}
      {navItems.map((item) => {
        const isActive =
  item.path === '/'
    ? location.pathname === '/'
    : location.pathname.startsWith(item.path);

        return (
          <Tooltip key={item.label} title={item.label} placement="right">
            <IconButton
              onClick={() => navigate(item.path)}
              sx={{
                color: isActive ? '#FFD700' : 'white',
                mb: 2,
                bgcolor: isActive ? '#3949AB' : 'transparent',
                '&:hover': { bgcolor: '#3949AB' }
              }}
            >
              {item.icon}
            </IconButton>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default PrimarySidebar;
