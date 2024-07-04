import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomLayout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import TransactionForm from './pages/TransactionForm';
import Dashboard from './pages/Dashboard';
import TransactionHistory from './pages/TransactionHistory';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <CustomLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="transaction-form" element={<TransactionForm />} />
          <Route path="transaction-history" element={<TransactionHistory />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
