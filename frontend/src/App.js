import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NoteList from './components/NoteList';
import NoteDetail from './components/NoteDetail';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div className="container">
      <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace={true} />} />
      <Route path="/notes" element={<NoteList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    </div> 	
  );
}

export default App;
