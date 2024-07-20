import { faCheckCircle, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Nav, Row } from 'react-bootstrap';

function Profil() {
  const [activeTab, setActiveTab] = useState('personal');

  const renderContent = () => {
    if (activeTab === 'personal') {
      return (
        <Card className="card-custom">
          <Card.Body>
            <Row>
              <Col md={6}>
                <h5><FontAwesomeIcon icon={faUser} className="me-2" /> Informations personnelles</h5>
                <p><strong>Nom:</strong> John Doe</p>
                <p><strong>Pays:</strong> Canada</p>
                <p><strong>Statut du compte:</strong> <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} /></p>
                <p><strong>Email:</strong> johndoe@example.com</p>
                <p><strong>Téléphone:</strong> +1 234 5678</p>
                <p><strong>Adresse complète:</strong> 123 Rue Principale, Ville, Pays</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      );
    } else if (activeTab === 'security') {
      return (
        <Card className="card-custom">
          <Card.Body>
            <Row>
              <Col md={6}>
                <h5><FontAwesomeIcon icon={faLock} className="me-2" /> Connexion et sécurité</h5>
                <p><strong>Mot de passe:</strong> <a href="#change-password">Nouveau mot de passe (6 caractères minimum)</a></p>
                <p><strong>Type de compte:</strong> Personnel</p>
                {/* Ajoutez d'autres champs au besoin */}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      );
    }
  };

  return (
    <div>
      <Container fluid className="mt-5 container-custom">
        <Row>
          <Col md={4}>
            <div className="sidebar">
              <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link href="#account"><FontAwesomeIcon icon={faUser} className="me-2" /> Compte</Nav.Link>
                <Nav.Link href="#recipients"><FontAwesomeIcon icon={faUser} className="me-2" /> Destinataires</Nav.Link>
                <Nav.Link href="#send-money"><FontAwesomeIcon icon={faUser} className="me-2" /> Envoyer de l'argent</Nav.Link>
                <Nav.Link href="#transactions"><FontAwesomeIcon icon={faUser} className="me-2" /> Transactions</Nav.Link>
              </Nav>
              <Card className="mt-4">
                <Card.Body>
                  <Card.Title><FontAwesomeIcon icon={faCheckCircle} className="me-2" /> Bénéficiez de 5% de réduction sur les frais</Card.Title>
                  <Card.Text>
                    Lorsque vous parrainez un ami
                  </Card.Text>
                  <Button variant="success"><FontAwesomeIcon icon={faUser} className="me-2" /> Parrainez Un Ami</Button>
                </Card.Body>
              </Card>
            </div>
          </Col>

          <Col md={8}>
            <div className="content">
              <h2><FontAwesomeIcon icon={faUser} className="me-2" /> Profil</h2>
              <h4><FontAwesomeIcon icon={faUser} className="me-2" /> Vos informations</h4>
              <Nav variant="tabs" defaultActiveKey="personal">
                <Nav.Item>
                  <Nav.Link eventKey="personal" onClick={() => setActiveTab('personal')}>
                    <FontAwesomeIcon icon={faUser} className="me-2" /> Informations personnelles
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="security" onClick={() => setActiveTab('security')}>
                    <FontAwesomeIcon icon={faLock} className="me-2" /> Connexion et sécurité
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              {renderContent()}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profil;
