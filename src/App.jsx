import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Paste from './Components/Paste'
import ViewPaste from './Components/ViewPaste'

const App = () => {
    return (
        <div>
            <Navbar />
            <Toaster position="top-right" />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pastes" element={<Paste />} />
              <Route path="/pastes/:id" element={<ViewPaste />} />
            </Routes>

        </div>
    );
};

export default App;