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

interface SecondarySidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const SecondarySidebar = ({ collapsed, onToggleCollapse }: SecondarySidebarProps) => {
//   const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      sx={{
        width: collapsed ? 72 : 220,
        transition: 'width 0.3s',
        bgcolor: 'white',
        borderRight: '1px solid #ddd',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ textAlign: 'right', p: 1 }}>
        <IconButton onClick={onToggleCollapse}>
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
