import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Course from './routes/Course';
import Homepage from './routes/Homepage';
import Friends from './routes/Friends';
import Profile from './routes/Profile';
import SearchCourse from './routes/SearchCourse';
import Header from './components/Header';
import Navbar from './components/Navbar';
import { User } from './types/types';
import { getUser, getUserId } from './api/server';
import FriendsProfile from './routes/FriendsProfile';

const App: React.FC = () => {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    const obtainUser = async () => {
      const email = await getUserId();

      const res: User | undefined = await getUser(email);

      if (res) setUser(res);
    }

    obtainUser();
  }, []);

  return (
    <Router>
      <Header />
      <div style={{minHeight: "85vh", marginTop: "10vh", marginBottom: "5vh"}}>
      <Routes>
        <Route path="/" element={<Homepage user={user}/>} />
        <Route path="course/:department/:code/:instructor" element={<Course user={user}/>} />
        <Route path="friends" element={<Friends user={user}/>} />
        <Route path="friends/profile/:name/:surname/:id" element={<FriendsProfile user={user}/>} />
        <Route path="profile" element={<Profile user={user}/>} />
        <Route path="searchcourse" element={<SearchCourse />} />
      </Routes>
      </div>
      <Navbar />
    </Router>
  );
};

export default App;