// import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppRoutes />
    </LocalizationProvider>
  );
}

export default App;
