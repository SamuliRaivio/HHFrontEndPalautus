import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import "./App.css"


function App() {
  return (
    <div>
      <h2 className="header">Welcome to React Router</h2>
    <div>
      <BrowserRouter>
        <div className="links">
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
        <Link to="/contact"> Contact </Link>
        </div>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
