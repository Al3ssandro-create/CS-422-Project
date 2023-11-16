import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Course from './routes/Course';
import Homepage from './routes/Homepage';
import Friends from './routes/Friends';
import Profile from './routes/Profile';
import SearchCourse from './routes/SearchCourse';
import Header from './components/Header';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div style={{minHeight: "100vh", marginTop: "10vh"}}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="course/:courseName" element={<Course />} />
        <Route path="friends" element={<Friends />} />
        <Route path="profile" element={<Profile />} />
        <Route path="searchcourse" element={<SearchCourse />} />
      </Routes>
      </div>
      <Navbar />
    </Router>
  );
};

export default App;