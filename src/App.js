// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';
// import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';
// import { NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import './App.css';
// import Accueil from './components/Accueil';
// import Facture from './components/Facture';
// import Joindre from './components/Join';
// import Profil from './components/Profil';
// import Signup from './components/SignUp';
// import Transfer from './components/Transfer';

// function App() {
//   const { t, i18n } = useTranslation();

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   const swapLanguage = () => {
//     if (i18n.language === 'en') {
//       changeLanguage('fr');
//     } else {
//       changeLanguage('en');
//     }
//   };

//   const speakText = (text) => {
//     const synth = window.speechSynthesis;
//     const utterance = new SpeechSynthesisUtterance(text);

//     // Définir la langue de l'énoncé en fonction de la langue actuelle
//     utterance.lang = i18n.language === 'fr' ? 'fr-FR' : 'en-US';

//     // Vérifier et définir la voix si disponible
//     const voices = synth.getVoices();
//     const selectedVoice = voices.find(voice => voice.lang === utterance.lang);
//     if (selectedVoice) {
//       utterance.voice = selectedVoice;
//     }

//     // Lire le texte
//     synth.speak(utterance);
//   };

//   const handleMouseEnter = (event) => {
//     speakText(event.target.innerText);
//   };

//   const handleMouseLeave = () => {
//     window.speechSynthesis.cancel(); // Arrêter la lecture si on quitte l'élément
//   };

//   return (
//     <Router>
//       <div>
//         <Navbar bg="light" expand="lg">
//           <Container fluid>
//             <Navbar.Brand href="/" className="navbar-brand-custom">
//               <h1>
//                 <span className="brand-highlight">NKAP</span>Transfert
//               </h1>
//             </Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//               <Nav className="ms-auto">
//                 <Nav.Link as={NavLink} to="/" end
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   {t('home')}
//                 </Nav.Link>
//                 <Nav.Link as={NavLink} to="/transfer"
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   {t('transfer')}
//                 </Nav.Link>
//                 <Nav.Link as={NavLink} to="/pay"
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   {t('pay')}
//                 </Nav.Link>
//                 <Nav.Link as={NavLink} to="/contact"
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   {t('contact')}
//                 </Nav.Link>
//                 <Nav.Link as={NavLink} to="/profile"
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <i className="fas fa-user-circle"></i>
//                 </Nav.Link>
//                 <Nav.Link as={NavLink} to="/signup"
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   {t('signup')}
//                 </Nav.Link>
//                 <Nav.Link onClick={swapLanguage}
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   {t('english')}
//                 </Nav.Link>
//               </Nav>
//             </Navbar.Collapse>
//           </Container>
//         </Navbar>

//         <Container className="mt-4">
//           <Routes>
//             <Route path="/" element={<Accueil />} />
//             <Route path="/transfer" element={<Transfer />} />
//             <Route path="/pay" element={<Facture />} />
//             <Route path="/contact" element={<Joindre />} />
//             <Route path="/profile" element={<Profil />} />
//             <Route path="/signup" element={<Signup />} />
//           </Routes>
//         </Container>

//         <footer className="text-white mt-5 p-4 text-center">
//           <Container>
//             <Row>
//               <Col md={4} className="contact-information">
//                 <h5
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   {t('contactUs')}
//                 </h5>
//                 <p
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <i className="fas fa-phone"></i> {t('phone')}
//                 </p>
//                 <p
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <i className="fas fa-envelope"></i> {t('email')}
//                 </p>
//                 <p
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <i className="fas fa-map-marker-alt"></i> {t('location')}
//                 </p>
//               </Col>
//               <Col md={8} className="opening-hours">
//                 <h5
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   {t('openingHours')}
//                 </h5>
//                 <p
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <i className="fas fa-clock"></i> {t('monday')}
//                 </p>
//                 <p
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <i className="fas fa-clock"></i> {t('tuesday')}
//                 </p>
//                 <p
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <i className="fas fa-clock"></i> {t('wednesday')}
//                 </p>
//                 <p
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <i className="fas fa-clock"></i> {t('thursday')}
//                 </p>
//                 <p
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <i className="fas fa-clock"></i> {t('friday')}
//                 </p>
//               </Col>
//             </Row>
//           </Container>
//         </footer>
//       </div>
//     </Router>
//   );
// }

// export default App;
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Account from './components/Account';
import Accueil from './components/Accueil';
import Facture from './components/Facture';
import Joindre from './components/Join';
import Layout from './components/Layout';
import Profil from './components/Profil';
import Recipients from './components/Recipients';
import ReferAFriend from './components/ReferAFriend';
import Signup from './components/SignUp';
import TransactionHistory from './components/TransactionHistory';
import Transfer from './components/Transfer';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/pay" element={<Facture />} />
          <Route path="/contact" element={<Joindre />} />
          <Route path="/profile" element={<Profil />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/history" element={<TransactionHistory />} />
          <Route path="/recipients" element={<Recipients />} />
          <Route path="/refer-a-friend" element={<ReferAFriend />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
