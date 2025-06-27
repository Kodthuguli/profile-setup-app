import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  AccountCircle,
  Visibility,
  Insights,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';
import { useState } from 'react';

const items = [
  { icon: <AccountCircle />, label: 'Profile Setup' },
  { icon: <Visibility />, label: 'View Profile' },
  { icon: <Insights />, label: 'Insights' }
];

const SecondarySidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      sx={{
        width: collapsed ? 72 : 220,
        transition: 'width 0.3s',
        bgcolor: '#f5f5f5',
        borderRight: '1px solid #ddd',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ textAlign: 'right', p: 1 }}>
        <IconButton onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      <List>
        {items.map((item) => (
          <ListItem disablePadding key={item.label}>
            <Tooltip title={collapsed ? item.label : ''} placement="right">
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {!collapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SecondarySidebar;
