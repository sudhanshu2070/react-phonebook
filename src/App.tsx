import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import AddContact from './components/AddContact/AddContact';
import ContactDetails from './components/ContactDetail/ContactDetails';
import{ contacts }from './data/contact-detail'; 


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/contact/:id" element={<ContactDetails contacts={contacts} />} />
        <Route path="/contact" element={<ContactDetails contacts={contacts} />} /> {/* Handle the case with no ID */}
        <Route path="*" element={<div>Page not found</div>} /> {/* Handle unmatched routes */}
      </Routes>
    </Router>
  );
};

export default App;
