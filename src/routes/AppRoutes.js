import React, { useState } from 'react'
import { matchPath, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from '../components/Header.js'
import LandingPage from '../pages/LandingPage/LandingPage.js'
import LoginPage from '../pages/Auth/LoginPage.js'

const AppRoutes = () => {
  const location = useLocation();
  const publicPaths = [
    "/",
  ];


  return (
    <>
     <Header />
      <Routes>
        <Route
          path="/"
          element={
              <LandingPage />
          }
        />
        <Route
          path="login"
          element={
              <LoginPage />
          }
        />
      </Routes>
    </>
  )
}

export default AppRoutes
