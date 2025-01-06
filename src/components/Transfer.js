import {
  faArrowLeft,
  faCheck,
  faCheckCircle,
  faCreditCard,
  faListAlt,
  faMoneyCheckAlt,
  faTags,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'; // Import axios pour faire les requêtes HTTP
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Nav, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Style/Transfer.css';

function Transfer() {
  const [activeStep, setActiveStep] = useState('envoyer');
  const [sendingCountry, setSendingCountry] = useState('');
  const [receivingCountry, setReceivingCountry] = useState('');
  const [amountToSend, setAmountToSend] = useState('');
  const [amountToReceive, setAmountToReceive] = useState('');
  const [withdrawalMode, setWithdrawalMode] = useState('');
  const [recipient, setRecipient] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [loading, setLoading] = useState(false); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

  const navigate = useNavigate();

  const handleSendCountryChange = (event) => {
    setSendingCountry(event.target.value);
  };

  const handleReceiveCountryChange = (event) => {
    setReceivingCountry(event.target.value);
  };

  const handleAmountToSendChange = (event) => {
    setAmountToSend(event.target.value);
  };

  const handleAmountToReceiveChange = (event) => {
    setAmountToReceive(event.target.value);
  };

  const handleWithdrawalModeChange = (event) => {
    setWithdrawalMode(event.target.value);
  };

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const isEnvoyerValid = () => {
    return sendingCountry && receivingCountry;
  };

  const isDetailsValid = () => {
    return amountToSend && amountToReceive && withdrawalMode && recipient;
  };

  const goBack = () => {
    switch (activeStep) {
      case 'details':
        setActiveStep('envoyer');
        break;
      case 'reussi':
        setActiveStep('details');
        break;
      default:
        navigate(-1); // Navigate to previous page
    }
  };

  const handleTransfer = async () => {
    if (isDetailsValid()) {
      setLoading(true);
      try {
        const response = await axios.post('/api/transfer', {
          sendingCountry,
          receivingCountry,
          amountToSend,
          amountToReceive,
          withdrawalMode,
          recipient,
          promoCode,
        });

        if (response.data.success) {
          setActiveStep('reussi');
        } else {
          setError('Erreur lors du transfert. Veuillez réessayer.');
        }
      } catch (error) {
        setError('Erreur lors du transfert. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    }
  };

  const Envoyer = () => (
    <div>
      <h2><FontAwesomeIcon icon={faMoneyCheckAlt} className="me-2" /> Envoyer de l'argent</h2>
      <form>
        <div className="form-group">
          <label><FontAwesomeIcon icon={faListAlt} className="me-2" /> Pays d'envoi</label>
          <select className="form-control" value={sendingCountry} onChange={handleSendCountryChange}>
            <option value="">Sélectionnez le pays d'envoi</option>
            <option value="Canada">Canada</option>
            <option value="Cameroun">Cameroun</option>
            {/* Ajoutez d'autres options de pays selon vos besoins */}
          </select>
        </div>
        <div className="form-group">
          <label><FontAwesomeIcon icon={faUser} className="me-2" /> Envoyer vers</label>
          <select className="form-control" value={receivingCountry} onChange={handleReceiveCountryChange}>
            <option value="">Sélectionnez le pays de réception</option>
            <option value="Canada">Canada</option>
            <option value="Cameroun">Cameroun</option>
            {/* Ajoutez d'autres options de pays selon vos besoins */}
          </select>
        </div>
        <Button
          type="button"
          className="btn btn-success"
          onClick={() => setActiveStep('details')}
          disabled={!isEnvoyerValid()}
        >
          Suivant <FontAwesomeIcon icon={faCheckCircle} className="ms-2" />
        </Button>
        <Button type="button" className="btn btn-secondary ms-2" onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Annuler
        </Button>
      </form>
    </div>
  );

  const Details = () => (
    <div>
      <h2><FontAwesomeIcon icon={faCreditCard} className="me-2" /> Détails du transfert</h2>
      <form>
        <div className="form-group">
          <label><FontAwesomeIcon icon={faMoneyCheckAlt} className="me-2" /> Vous Envoyez</label>
          <input type="number" className="form-control" value={amountToSend} onChange={handleAmountToSendChange} />
        </div>
        <div className="form-group">
          <label><FontAwesomeIcon icon={faMoneyCheckAlt} className="me-2" /> Ou</label>
          <input type="number" className="form-control" value={amountToReceive} onChange={handleAmountToReceiveChange} />
        </div>
        <div className="form-group">
          <label><FontAwesomeIcon icon={faTags} className="me-2" /> Sélectionner le mode de retrait</label>
          <select className="form-control" value={withdrawalMode} onChange={handleWithdrawalModeChange}>
            <option value="">Sélectionnez le mode de retrait</option>
            {/* Ajoutez d'autres options de mode de retrait selon vos besoins */}
          </select>
        </div>
        <div className="form-group">
          <label><FontAwesomeIcon icon={faUser} className="me-2" /> Sélectionner le destinataire</label>
          <select className="form-control" value={recipient} onChange={handleRecipientChange}>
            <option value="">Sélectionnez le destinataire</option>
            {/* Ajoutez d'autres options de destinataire selon vos besoins */}
          </select>
        </div>
        <div className="form-group">
          <label><FontAwesomeIcon icon={faTags} className="me-2" /> Code promo</label>
          <input type="text" className="form-control" value={promoCode} onChange={handlePromoCodeChange} />
          <Button type="button" className="btn btn-info mt-2">Appliquer</Button>
        </div>
        <Button
          type="button"
          className="btn btn-success"
          onClick={handleTransfer} // Utiliser la fonction pour envoyer les données au backend
          disabled={!isDetailsValid() || loading} // Désactiver le bouton pendant le chargement
        >
          {loading ? 'En cours...' : 'Confirmer'} <FontAwesomeIcon icon={faCheck} className="ms-2" />
        </Button>
        <Button type="button" className="btn btn-secondary ms-2" onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Annuler
        </Button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>} {/* Affichage de l'erreur */}
    </div>
  );

  const Reussi = () => (
    <div>
      <h2><FontAwesomeIcon icon={faCheckCircle} className="me-2" /> Transfert Réussi</h2>
      <p>Votre transfert a été effectué avec succès.</p>
      <Button type="button" className="btn btn-primary" onClick={() => setActiveStep('envoyer')}>
        Revenir à l'accueil <FontAwesomeIcon icon={faArrowLeft} className="ms-2" />
      </Button>
    </div>
  );

  const renderStep = () => {
    switch (activeStep) {
      case 'envoyer':
        return <Envoyer />;
      case 'details':
        return <Details />;
      case 'reussi':
        return <Reussi />;
      default:
        return <Envoyer />;
    }
  };

  return (
    <div>
      <Container fluid className="mt-5 container-custom">
        <Row>
          <Col md={4}>
            <div className="sidebar">
              <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link href="/account"><FontAwesomeIcon icon={faUser} className="me-2" /> Compte</Nav.Link>
                <Nav.Link href="/recipients"><FontAwesomeIcon icon={faUser} className="me-2" /> Destinataires</Nav.Link>
                <Nav.Link href="/history" onClick={() => navigate('/history')}><FontAwesomeIcon icon={faUser} className="me-2" /> Historique de transactions</Nav.Link>
              </Nav>
              <Card className="mt-4">
                <Card.Body>
                  <Card.Title><FontAwesomeIcon icon={faCheckCircle} className="me-2" /> Bénéficiez de 5% de réduction sur les frais</Card.Title>
                  <Card.Text>
                    Lorsque vous parrainez un ami
                  </Card.Text>
                  <Button variant="success" href="/refer-a-friend"><FontAwesomeIcon icon={faUser} className="me-2" /> Parrainez Un Ami</Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md={8}>
            <div className="container">
              <div className="steps">
                <Button className="btn btn-primary" onClick={() => setActiveStep('envoyer')}>
                  <FontAwesomeIcon icon={faMoneyCheckAlt} className="me-2" /> Envoyer
                </Button>
                <Button className="btn btn-primary" onClick={() => setActiveStep('details')}>
                  <FontAwesomeIcon icon={faListAlt} className="me-2" /> Détails
                </Button>
                <Button className="btn btn-primary" onClick={() => setActiveStep('reussi')}>
                  <FontAwesomeIcon icon={faCheckCircle} className="me-2" /> Réussi
                </Button>
              </div>
              <div className="step-content">
                {renderStep()}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Transfer;
