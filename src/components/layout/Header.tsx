// src/components/layout/Header.tsx
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NotificationsNone } from '@mui/icons-material';

interface HeaderProps {
  title?: string;
  showMobileMenu?: boolean;
  onMobileMenuClick?: () => void;
}

const Header = ({
  title = 'Dashboard',
  showMobileMenu = false,
  onMobileMenuClick,
}: HeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2,
        px: 3,
        borderBottom: '1px solid #e0e0e0',
        bgcolor: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        {showMobileMenu && (
          <IconButton onClick={onMobileMenuClick}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton>
          <NotificationsNone />
        </IconButton>
        <Avatar alt="User" src="/avatar.jpg" />
      </Stack>
    </Box>
  );
};

export default Header;
