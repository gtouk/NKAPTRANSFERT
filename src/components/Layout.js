// Layout.js
import React from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'; // Import des composants nécessaires
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import '../App.css';

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

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
              <Nav.Link as={NavLink} to="/" end
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
                <i className="fas fa-user-circle"></i>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/history"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {t('history')}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/signup"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {t('signup')}
              </Nav.Link>
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

      {location.pathname === '/contact' && (
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
                  <i className="fas fa-phone"></i> {t('phone')}
                </p>
                <p
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fas fa-envelope"></i> {t('email')}
                </p>
                <p
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fas fa-map-marker-alt"></i> {t('location')}
                </p>
              </Col>
              <Col md={8} className="opening-hours">
                <h5
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {t('openingHours')}
                </h5>
                <p
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fas fa-clock"></i> {t('monday')}
                </p>
                <p
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fas fa-clock"></i> {t('tuesday')}
                </p>
                <p
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fas fa-clock"></i> {t('wednesday')}
                </p>
                <p
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fas fa-clock"></i> {t('thursday')}
                </p>
                <p
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fas fa-clock"></i> {t('friday')}
                </p>
              </Col>
            </Row>
          </Container>
        </footer>
      )}
    </div>
  );
};

export default Layout;
