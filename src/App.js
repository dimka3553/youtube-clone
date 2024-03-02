import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import VideoDetails from './components/VideoDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/video/:videoId" element={<VideoDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
