import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/admin/DashboardPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<LandingPage />} />
            <Route path="login" element={<div>Login Page</div>} />
            <Route path="book" element={<div>Booking Page</div>} />
            <Route path="queue" element={<div>Live Queue Page</div>} />

            {/* Admin Routes */}
            <Route path="admin">
              <Route index element={<DashboardPage />} />
              <Route path="queue" element={<div>Admin Queue Management</div>} />
              <Route path="clients" element={<div>Client CRM</div>} />
              <Route path="analytics" element={<div>Analytics Dashboard</div>} />
              <Route path="commission" element={<div>Commission Tracking</div>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;