import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import SectionHeader from './components/SectionHeader';
import LoginForm from './components/LoginForm';
import { Route, Routes, BrowserRouter, Navigate, Link, createBrowserRouter, RouterProvider } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import { validationToken } from './helpers/token';
import UserLogueado from './rutas/UserLogueado';
import { AuthProvider } from './auth/AuthProvider';
import Registro from './pages/Registro/Registro';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from './pages/Users/Users';
import UserAdmin from './rutas/UserAdmin';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import UploadReteIVA from './pages/UploadReteIVA/UploadReteIVA';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/signup",
    element: <Registro />
  },
  {
    path: "/users",
    element: <Users />
  },
  {
    path: "/changePassword",
    element: <ChangePassword />
  },
  {
    path: "/",
    element: <UserLogueado />,
    children: [
      {
        path: "/my/home",
        element: <Home></Home>
      },
      {
        path: "/admin",
        element: <UserAdmin />,
        children: [
          {
            path: "/admin/users",
            element: <Users />
          },
          {
            path: "/admin/upload",
            element: <UploadReteIVA />
          },
        ]
      }
    ]
  }
])

function App() {

  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </>
  );

}

export default App;

