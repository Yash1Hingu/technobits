import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import NoteDetails from './components/NoteDetails';
import UploadImage from './components/UploadImage';
import UpdateNote from './components/UpdateNote';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesList />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/update/:noteId" element={<UpdateNote/>} />
        <Route path="/note/:noteId" element={<NoteDetails />} />
        <Route path="/upload-image" element={<UploadImage />} />
      </Routes>
    </Router>
  );
};

export default App;
