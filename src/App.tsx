import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import AddContact from './components/AddContact/AddContact';
import ContactDetails from './components/ContactDetail/ContactDetails';
import { AnimatePresence } from 'framer-motion';
import Transitions from './components/Transition/Transition'; // Import your Transitions component
//import{ contacts }from './data/contact-detail'; to fetch the data locally saved in the .ts file


const App: React.FC = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};

const AnimatedRoutes: React.FC = () => {
  
  const location = useLocation();

  return (
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Transitions> <Home /></Transitions> }/>
          <Route path="/add-contact" element={ <Transitions> <AddContact /> </Transitions> } />
          <Route path="/contact/:name" element={ <Transitions> <ContactDetails /> </Transitions>} />
          {/*handling the case where no contact name is provided */}
          <Route path="/contact/" element={ <Transitions> <ContactDetails /> </Transitions> } />
        </Routes>
      </AnimatePresence>
  );
};

export default App;