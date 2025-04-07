import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

//Componentes
const NotFound = lazy(() => import('../components/NotFound'));
const Painel = lazy(() => import('../components/Painel'));

//Telas
const Sobre = lazy(() => import('../pages/sobre/Sobre'));
const Login = lazy(() => import('../pages/login/Login'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Usuario = lazy(() => import('../pages/usuario/Usuario'));
const Funcionario = lazy(() => import('../pages/funcionario/Funcionario'));

export default function AppRouter() {
  return (
    <Routes>
      <Route path='sobre'
        element={<Sobre />} />
      <Route element={<Painel />}>
        <Route index
          element={<Login />} />
        <Route path='/entrar'
          element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route index
            element={<Dashboard />} />
          <Route path='/dashboard'
            element={<Dashboard />} />
          <Route path='/usuarios'
            element={<Usuario />} />
          <Route path='/funcionarios'
            element={<Funcionario />} />
        </Route>
        <Route path='*'
          element={<NotFound />} />
      </Route>
    </Routes>
  );
}