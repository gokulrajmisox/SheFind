import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { OpportunityDetails } from './pages/OpportunityDetails';
import { Saved } from './pages/Saved';
import { Dashboard } from './admin/Dashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="opportunity/:slug" element={<OpportunityDetails />} />
          <Route path="saved" element={<Saved />} />
          <Route path="how-it-works" element={<div className="p-8 text-center text-xl">How It Works Page</div>} />
          <Route path="about" element={<div className="p-8 text-center text-xl">About Page</div>} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="opportunities" element={<div className="p-8 text-xl">Manage Opportunities</div>} />
          <Route path="verification" element={<div className="p-8 text-xl">Pending Verification</div>} />
          <Route path="deadlines" element={<div className="p-8 text-xl">Deadlines</div>} />
          <Route path="users" element={<div className="p-8 text-xl">Users</div>} />
          <Route path="activity" element={<div className="p-8 text-xl">Activity Logs</div>} />
        </Route>

        <Route path="*" element={<div className="p-8 text-center text-xl">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
