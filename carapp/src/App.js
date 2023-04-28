import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Cartable from './components/Cartable';

function App() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CAR LIST
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
      <Cartable/>
    </div>
  );
}

export default App;
