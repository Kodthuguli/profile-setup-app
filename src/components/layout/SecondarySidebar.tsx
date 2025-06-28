import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography
} from '@mui/material';
import {
  AccountCircle,
  Dashboard,
  Settings
} from '@mui/icons-material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

import ForwardArrow from '../../assets/images/arrow_forward.svg';
import BackwardArrow from '../../assets/images/arrow_back.svg';
import Person from '../../assets/images/person.svg';
import Contact from '../../assets/images/contract.svg';
import Business from '../../assets/images/add_business.svg';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  to: string;
}

// Sidebar menu mapping
const menuMap: Record<string, MenuItem[]> = {
  dashboard: [
    {
      icon: <img src={Business} alt="Overview" width={14} height={14} />,
      label: 'Overview',
      to: '/'
    }
  ],
  profile: [
    {
      icon: <img src={Contact} alt="Profile Setup" width={14} height={14} />,
      label: 'Profile Setup',
      to: '/profile/setup'
    },
    {
      icon: <img src={Person} alt="View Profile" width={14} height={14} />,
      label: 'View Profile',
      to: '/profile/view'
    },
    {
      icon: <img src={Business} alt="Insights" width={14} height={14} />,
      label: 'Insights',
      to: '/profile/insights'
    }
  ],
  settings: [
    {
      icon: <img src={Business} alt="Preferences" width={14} height={14} />,
      label: 'Preferences',
      to: '/settings'
    }
  ],
  documents: [
    {
      icon: <img src={Business} alt="Documents" width={14} height={14} />,
      label: 'Documents',
      to: '/documents'
    }
  ]
};

const titleMap: Record<string, string> = {
  dashboard: 'Dashboard',
  profile: 'Profile',
  settings: 'Settings',
  documents: 'Documents'
};

interface SecondarySidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const SecondarySidebar = ({ collapsed, onToggleCollapse }: SecondarySidebarProps) => {
  const { pathname } = useLocation();
  const primaryKey = pathname.split('/')[1] || 'dashboard';

  const title = titleMap[primaryKey] || 'Dashboard';
  const items = menuMap[primaryKey] || menuMap.dashboard;

  return (
    <Box
      sx={{
        width: collapsed ? 72 : 220,
        transition: 'width 0.3s',
        bgcolor: 'white',
        borderRight: '1px solid #ddd',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      {/* Section Title */}
      <Box sx={{ px: collapsed ? 1 : 2, py: 2 }}>
        {!collapsed ? (
          <Typography variant="subtitle1" fontWeight={600} fontSize="24px">
            {title}
          </Typography>
        ) : (
          (primaryKey === 'profile' && <AccountCircle />) ||
          (primaryKey === 'dashboard' && <Dashboard />) ||
          (primaryKey === 'settings' && <Settings />)
        )}
      </Box>

      {/* Collapse Toggle Button */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: { xs: 0, sm: -12 },
          width: 24,
          height: 24,
          bgcolor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          zIndex: (theme) => theme.zIndex.drawer + 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 1,
        }}
      >
        <img
          src={collapsed ? ForwardArrow : BackwardArrow}
          alt={collapsed ? 'Expand' : 'Collapse'}
          width={16}
          height={16}
          style={{ cursor: 'pointer' }}
          onClick={onToggleCollapse}
        />
      </Box>

      {/* Submenu */}
      <List>
        {items.map((item) => {
          const isActive =
            pathname === item.to || pathname.startsWith(item.to + '/');

          return (
            <ListItemButton
              key={item.to}
              component={RouterLink}
              to={item.to}
              selected={isActive}
              sx={{
                pl: collapsed ? 1 : 2,
                '&.Mui-selected': {
                  bgcolor: '#D9D9D9',
                  color: 'common.black',
                  fontWeight: 'bold'
                },
                '&.Mui-selected:hover': {
                  bgcolor: '#D9D9D9'
                }
              }}
            >
              <Tooltip title={collapsed ? item.label : ''} placement="right">
                <ListItemIcon sx={{ minWidth: 24 }}>{item.icon}</ListItemIcon>
              </Tooltip>
              {!collapsed && <ListItemText primary={item.label} />}
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default SecondarySidebar;
