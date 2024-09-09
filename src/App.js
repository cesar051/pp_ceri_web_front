import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React from 'react';
import SectionHeader from './components/SectionHeader';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';

// ...

const fetchData = async () => {
  const response = await axios.get('https://api.example.com/data');
  console.log(response.data);
};
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        
      </Routes>


    </BrowserRouter>

  );

}

export default App;
