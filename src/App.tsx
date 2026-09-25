import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { OpportunityDetails } from './pages/OpportunityDetails';
import { Saved } from './pages/Saved';
import { Dashboard } from './admin/Dashboard';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { AdminLogin } from './pages/AdminLogin';
import { UserDashboard } from './pages/UserDashboard';
import { Opportunities } from './admin/Opportunities';
import { AdminProtectedRoute, PublicOnlyRoute, UserProtectedRoute } from './auth/RouteGuards';
import './App.css';

function App() {
  return <BrowserRouter><Routes>
    <Route element={<PublicOnlyRoute />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/admin/login" element={<AdminLogin />} />

    <Route element={<UserProtectedRoute />}>
      <Route path="/dashboard" element={<UserDashboard />} />
    </Route>

    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="explore" element={<Explore />} />
      <Route path="opportunity/:slug" element={<OpportunityDetails />} />
      <Route path="saved" element={<Saved />} />
      <Route path="how-it-works" element={<div className="p-8 text-center text-xl">How It Works Page</div>} />
      <Route path="about" element={<div className="p-8 text-center text-xl">About Page</div>} />
    </Route>

    <Route path="/admin" element={<AdminProtectedRoute />}>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="opportunities" element={<Opportunities />} />
        <Route path="verification" element={<div className="p-8 text-xl">Pending Verification</div>} />
        <Route path="deadlines" element={<div className="p-8 text-xl">Deadlines</div>} />
        <Route path="users" element={<div className="p-8 text-xl">Users</div>} />
        <Route path="activity" element={<div className="p-8 text-xl">Activity Logs</div>} />
      </Route>
    </Route>

    <Route path="*" element={<div className="p-8 text-center text-xl">404 - Page Not Found</div>} />
  </Routes></BrowserRouter>;
}

export default App;
