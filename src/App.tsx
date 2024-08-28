import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import AddContact from './components/AddContact/AddContact';
import ContactDetails from './components/ContactDetail/ContactDetails';
//import{ contacts }from './data/contact-detail'; to fetch the data locally saved in the .ts file


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/contact/:name" element={<ContactDetails />} />
        {/* Optionally, handle the case where no contact name is provided */}
        <Route path="/contact/" element={<ContactDetails />} />
      </Routes>
    </Router>
  );
};

export default App;