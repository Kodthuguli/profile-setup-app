import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Typography,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import Success from '../../assets/images/success.svg';

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  email: string;
}

const SuccessDialog = ({ open, onClose, email }: SuccessDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          overflow: 'visible',
          borderRadius: 2,
        }
      }}
    >
      {/* Top Banner */}
      <Box
        sx={{
          height: 120,
          background: 'linear-gradient(180deg, #E6FBEC 0%, #B5F7D3 100%)',
          position: 'relative',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'rgba(0,0,0,0.6)',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            width: 96,
            height: 96,
            bgcolor: '#B0F2BF',
            borderRadius: '50%',
            boxShadow: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: -48,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <img src={Success} alt="Success Icon" width={48} height={48} />
        </Box>
      </Box>

      {/* Body */}
      <DialogContent sx={{ pt: 6, textAlign: 'center' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Profile submitted successfully
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Johnathan’s profile has been created and saved.
          <br />
          A confirmation email was sent to{' '}
          <Typography component="span" fontWeight={600}>
            {email}
          </Typography>
        </Typography>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#292666',
            textTransform: 'none',
            px: 4,
          }}
          onClick={() => navigate('/profile/view')}
        >
          View profile
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
