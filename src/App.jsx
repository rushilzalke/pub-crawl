import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { HostBuilder } from './pages/HostBuilder';
import { GuestInvite } from './pages/GuestInvite';
import { RSVP } from './pages/RSVP';
import { PostAccept } from './pages/PostAccept';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/host" element={<HostBuilder />} />
        <Route path="/invite/:crawlId" element={<GuestInvite />} />
        <Route path="/rsvp/:crawlId" element={<RSVP />} />
        <Route path="/locked-in/:crawlId" element={<PostAccept />} />
        <Route path="/dashboard/:crawlId" element={<Dashboard />} />
        {/* Fallback for join routing to a prompt or just back to home for now */}
        <Route path="/join" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
