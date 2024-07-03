import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import TransactionForm from './pages/TransactionForm';
import TransactionHistory from './pages/TransactionHistory';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transaction-form" element={<TransactionForm />} />
          <Route path="transaction-history" element={<TransactionHistory />} />
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
