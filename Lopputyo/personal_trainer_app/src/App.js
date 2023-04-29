import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import { AppBar, Box, Button } from '@mui/material';


//App function renders BrowserRouter inside AppBar
//Clicking buttons in BrowserRouter lets user to navigate in the application
function App() {
  return (
    <Box>
      <AppBar>
    <div>
      <BrowserRouter>
          <Button component={Link} to='/' color='inherit'>Home</Button>
          <Button component={Link} to='/customers' color='inherit'>Customers</Button>
          <Button component={Link} to='/trainings' color='inherit'>Trainings</Button>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/customers' element={<Customers />}></Route>
          <Route path='/trainings' element={<Trainings />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    </AppBar>
    </Box>
  );
}

export default App;
