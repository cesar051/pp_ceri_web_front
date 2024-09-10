import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import SectionHeader from './components/SectionHeader';
import LoginForm from './components/LoginForm';
import { Route, Routes, BrowserRouter, Navigate, Link } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import { validationToken } from './helpers/token';
import UserLogueado from './rutas/UserLogueado';
// ...

const fetchData = async () => {
  const response = await axios.get('https://api.example.com/data');
  console.log(response.data);
};
function App() {
  const [logueado, setLogueado] = useState(validationToken());

  console.log(`logueado: ${logueado}`)

  const updateLogueado = () => {
    setLogueado(validationToken());
  }

  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<LandingPage />} />

        {logueado ? (
          <Route path='my/*' element={<UserLogueado />} />
        ) : (
          <Route path='my/*' element={<Navigate to='/' />} />
        )}
      </Routes>
      
    </BrowserRouter>

  );

}

export default App;
