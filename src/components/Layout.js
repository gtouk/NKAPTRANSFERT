import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import '../App.css';

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  const [openingHours, setOpeningHours] = useState(null);
  const isAuthenticated = localStorage.getItem('authToken');
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Supprimez le token
    window.location.href = '/login'; // Redirigez vers la page de connexion
};


  // Récupérer les informations utilisateur depuis l'API backend
  useEffect(() => {
    fetch('/api/user')
      .then(response => response.json())
      .then(data => setUserInfo(data))
      .catch(error => console.error('Erreur lors de la récupération des informations utilisateur:', error));

    // Récupérer les informations de contact et horaires depuis l'API
    fetch('/api/contact-info')
      .then(response => response.json())
      .then(data => setContactInfo(data))
      .catch(error => console.error('Erreur lors de la récupération des informations de contact:', error));

    fetch('/api/opening-hours')
      .then(response => response.json())
      .then(data => setOpeningHours(data))
      .catch(error => console.error('Erreur lors de la récupération des horaires d\'ouverture:', error));
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const swapLanguage = () => {
    if (i18n.language === 'en') {
      changeLanguage('fr');
    } else {
      changeLanguage('en');
    }
  };

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = i18n.language === 'fr' ? 'fr-FR' : 'en-US';
    const voices = synth.getVoices();
    const selectedVoice = voices.find(voice => voice.lang === utterance.lang);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    synth.speak(utterance);
  };

  const handleMouseEnter = (event) => {
    speakText(event.target.innerText);
  };

  const handleMouseLeave = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/" className="navbar-brand-custom">
            <h1>
              <span className="brand-highlight">NKAP</span>Transfert
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/home" end
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {t('home')}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/transfer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {t('transfer')}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/pay"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {t('pay')}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {t('contact')}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/profile"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {userInfo ? userInfo.username : <i className="fas fa-user-circle"></i>}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/history"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {t('history')}
              </Nav.Link>

              {isAuthenticated ? (
                <Button variant="danger" onClick={handleLogout}>
                  {t('Deconnexion')}
                </Button>
              ) : (
                <Nav.Link as={NavLink} to="/signup"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {t('signup')}
                </Nav.Link>
              )}


              {/* <Nav.Link as={NavLink} to="/signup"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {t('signup')}
              </Nav.Link> */}
              <Nav.Link onClick={swapLanguage}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {t('english')}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        {children}
      </Container>

      {location.pathname === '/contact' && contactInfo && openingHours && (
        <footer className="text-white mt-5 p-4 text-center">
          <Container>
            <Row>
              <Col md={4} className="contact-information">
                <h5
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {t('contactUs')}
                </h5>
                <p
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fas fa-phone"></i> {contactInfo.phone}
                </p>
                <p
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fas fa-envelope"></i> {contactInfo.email}
                </p>
                <p
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fas fa-map-marker-alt"></i> {contactInfo.location}
                </p>
              </Col>
              <Col md={8} className="opening-hours">
                <h5
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {t('openingHours')}
                </h5>
                {openingHours.map((hour, index) => (
                  <p
                    key={index}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <i className="fas fa-clock"></i> {hour}
                  </p>
                ))}
              </Col>
            </Row>
          </Container>
        </footer>
      )}
    </div>
  );
};

export default Layout;
