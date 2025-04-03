import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './ProtectedRoute';

const Login = lazy(() => import('../pages/login/Login'));
const NotFound = lazy(() => import('../components/NotFound'));
const Painel = lazy(() => import('../components/Painel'));

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Painel />}>
        <Route index
          element={<Login />} />
        <Route path='/entrar'
          element={<Login />} />
        <Route element={<PrivateRoute />}>
          {/* Rotas com autenticação */}
        </Route>
        <Route path='*'
          element={<NotFound />} />
      </Route>
    </Routes>
  );
}