import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './Style/Accueil.css';

const AccueilContainer = styled.div`
  .heading {
    color: #16A085;
  }
  .form-group {
    margin-bottom: 1rem;
  }
  .form-label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  .input-group {
    display: flex;
    align-items: center;
  }
  .btn-success {
    background-color: #16A085;
    border-color: #16A085;
  }
  .btn-success:hover {
    background-color: darken(#16A085, 10%);
    border-color: darken(#16A085, 10%);
  }
`;

const continents = {
  'Africa': {
    countries: [
      { name: 'Côte d\'Ivoire', currency: 'XOF' },
      { name: 'Cameroon', currency: 'XAF' },
    ],
    rates: {
      'North America': 1.75,
      'Europe': 1.20,
    }
  },
  'North America': {
    countries: [
      { name: 'Canada', currency: 'CAD' },
      { name: 'United States', currency: 'USD' },
    ],
    rates: {
      'Africa': 0.57,
      'Europe': 0.68,
    }
  },
  'Europe': {
    countries: [
      { name: 'France', currency: 'EUR' },
      { name: 'Germany', currency: 'EUR' },
    ],
    rates: {
      'Africa': 0.83,
      'North America': 1.47,
    }
  },
};

function Accueil() {
  const { t, i18n } = useTranslation();
  const [continentFrom, setContinentFrom] = useState('');
  const [continentTo, setContinentTo] = useState('');
  const [sendCountry, setSendCountry] = useState('');
  const [receiveCountry, setReceiveCountry] = useState('');
  const [sendCurrency, setSendCurrency] = useState('');
  const [receiveCurrency, setReceiveCurrency] = useState('');
  const [sendAmount, setSendAmount] = useState(0);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [fees, setFees] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();
  const defaultExchangeRate = 450;

  useEffect(() => {
    //recuperer le nom de l'utilisateur depuis le local storage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
      console.log('Nom d\'utilisateur récupéré:', storedUserName);
    }
  }, []);

  useEffect(() => {
    if (sendCountry && receiveCountry && continentFrom && continentTo) {
      const sendCountryData = continents[continentFrom]?.countries.find(country => country.name === sendCountry);
      const receiveCountryData = continents[continentTo]?.countries.find(country => country.name === receiveCountry);

      if (sendCountryData && receiveCountryData) {
        setSendCurrency(sendCountryData.currency);
        setReceiveCurrency(receiveCountryData.currency);

        const continentRate = continents[continentFrom]?.rates[continentTo] || defaultExchangeRate;
        setReceiveAmount(sendAmount * continentRate);
      } else {
        setSendCurrency('');
        setReceiveCurrency('');
        setReceiveCountry('');
      }
    }
  }, [sendCountry, receiveCountry, continentFrom, continentTo, sendAmount]);

  useEffect(() => {
    const calculatedFees = sendAmount * 0.01;
    setFees(calculatedFees);
    setTotalToPay(sendAmount + calculatedFees);
  }, [sendAmount]);

  const formatCurrency = (amount, currency) => {
    if (!currency) return amount;
    try {
      const formattedAmount = new Intl.NumberFormat(i18n.language, {
        style: 'currency',
        currency: currency
      }).format(amount);

      if (i18n.language === 'fr') {
        return formattedAmount.replace(currency, '').trim() + ' ' + currency;
      } else {
        return currency + ' ' + formattedAmount.replace(currency, '').trim();
      }
    } catch (error) {
      console.error('Invalid currency code:', currency);
      return amount;
    }
  };

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = i18n.language === 'fr' ? 'fr-FR' : 'en-US';
    synth.speak(utterance);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/transfer');
  };

  return (
    <AccueilContainer>

      <Container className="mt-5">
        <h1 className="display-4 heading">Bienvenue, {userName ? userName: 'Utilisateur'}</h1>
        <Row className="justify-content-center" expand="lg">
          <Col md={6}>
            <h1
              className="display-4 heading"
              onMouseEnter={() => speakText(t('heading'))}
              aria-label={t('heading')}
            >
              {t('heading')}
            </h1>
            <Button
              variant="primary"
              className="mt-5 custom-button "
              onMouseEnter={() => speakText(t('contactUs'))}
              aria-label={t('contactUs')}
              onClick={() => navigate('/contact')}
            >
              {t('contactUs')} <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </Button>
            <Button
              variant="primary"
              className="mt-5 custom-button "
              onMouseEnter={() => speakText(t('signUp'))}
              aria-label={t('signUp')}
              onClick={() => navigate('/signup')}
            >
              {t('signup')} <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </Button>
          </Col>
          <Col md={6}>
            <Form onSubmit={handleSubmit} aria-labelledby="transfer-form">
              <h2
                onMouseEnter={() => speakText(t('estimateTransfer'))}
                aria-label={t('estimateTransfer')}
              >
                <strong>{t('estimateTransfer')}</strong>
              </h2>

              <Form.Group controlId="formContinentFrom" className="form-group">
                <Form.Label
                  className="form-label"
                  onMouseEnter={() => speakText(t('continentFromLabel'))}
                  aria-label={t('continentFromLabel')}
                >
                  {t('continentFromLabel')}
                </Form.Label>
                <Form.Control
                  as="select"
                  value={continentFrom}
                  onChange={(e) => {
                    setContinentFrom(e.target.value);
                    setSendCountry('');
                    setReceiveCountry('');
                  }}
                  aria-label={t('continentFromLabel')}
                >
                  <option value="">{t('selectContinent')}</option>
                  {Object.keys(continents).map((c, index) => (
                    <option key={index} value={c}>{c}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formContinentTo" className="form-group">
                <Form.Label
                  className="form-label"
                  onMouseEnter={() => speakText(t('continentToLabel'))}
                  aria-label={t('continentToLabel')}
                >
                  {t('continentToLabel')}
                </Form.Label>
                <Form.Control
                  as="select"
                  value={continentTo}
                  onChange={(e) => {
                    setContinentTo(e.target.value);
                    setReceiveCountry('');
                  }}
                  aria-label={t('continentToLabel')}
                >
                  <option value="">{t('selectContinent')}</option>
                  {Object.keys(continents).map((c, index) => (
                    <option key={index} value={c}>{c}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formSendCountry" className="form-group">
                <Form.Label
                  className="form-label"
                  onMouseEnter={() => speakText(t('sendCountryLabel'))}
                  aria-label={t('sendCountryLabel')}
                >
                  {t('sendCountryLabel')}
                </Form.Label>
                <Form.Control
                  as="select"
                  value={sendCountry}
                  onChange={(e) => setSendCountry(e.target.value)}
                  aria-label={t('sendCountryLabel')}
                >
                  <option value="">{t('selectCountry')}</option>
                  {continents[continentFrom]?.countries.map((country, index) => (
                    <option key={index} value={country.name}>{country.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formReceiveCountry" className="form-group">
                <Form.Label
                  className="form-label"
                  onMouseEnter={() => speakText(t('sendToLabel'))}
                  aria-label={t('sendToLabel')}
                >
                  {t('sendToLabel')}
                </Form.Label>
                <Form.Control
                  as="select"
                  value={receiveCountry}
                  onChange={(e) => setReceiveCountry(e.target.value)}
                  aria-label={t('sendToLabel')}
                >
                  <option value="">{t('selectCountry')}</option>
                  {continents[continentTo]?.countries.map((country, index) => (
                    <option key={index} value={country.name}>{country.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formSendAmount" className="form-group">
                <Form.Label
                  className="form-label"
                  onMouseEnter={() => speakText(t('sendLabel'))}
                  aria-label={t('sendLabel')}
                >
                  {t('sendLabel')}
                </Form.Label>
                <InputGroup className="input-group">
                  <Form.Control
                    type="number"
                    placeholder="0"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(parseFloat(e.target.value) || 0)}
                    aria-label={t('sendAmountLabel')}
                  />
                  <Form.Control as="select" value={sendCurrency} readOnly aria-label={t('sendCurrencyLabel')}>
                    <option>{sendCurrency}</option>
                  </Form.Control>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formReceiveAmount" className="form-group">
                <Form.Label
                  className="form-label"
                  onMouseEnter={() => speakText(t('equivalentLabel'))}
                  aria-label={t('equivalentLabel')}
                >
                  {t('equivalentLabel')}
                </Form.Label>
                <InputGroup className="input-group">
                  <Form.Control
                    type="number"
                    placeholder="0"
                    value={receiveAmount}
                    readOnly
                    aria-label={t('receiveAmountLabel')}
                  />
                  <Form.Control as="select" value={receiveCurrency} readOnly aria-label={t('receiveCurrencyLabel')}>
                    <option>{receiveCurrency}</option>
                  </Form.Control>
                </InputGroup>
              </Form.Group>

              <div className="mt-3">
                <p onMouseEnter={() => speakText(t('fees') + ' ' + formatCurrency(fees, sendCurrency))} aria-label={t('fees') + ' ' + formatCurrency(fees, sendCurrency)}>
                  {t('fees')} <span className='frais'>{formatCurrency(fees, sendCurrency)}</span>
                </p>
                <p
                  onMouseEnter={() => speakText(t('totalToPay') + ' ' + (sendCountry && receiveCountry
                    ? `${formatCurrency(totalToPay, sendCurrency)} / ${formatCurrency(totalToPay / (continents[continentFrom]?.rates[continentTo] || defaultExchangeRate), receiveCurrency)}`
                    : formatCurrency(totalToPay, sendCurrency)))}
                  aria-label={t('totalToPay') + ' ' + (sendCountry && receiveCountry
                    ? `${formatCurrency(totalToPay, sendCurrency)} / ${formatCurrency(totalToPay / (continents[continentFrom]?.rates[continentTo] || defaultExchangeRate), receiveCurrency)}`
                    : formatCurrency(totalToPay, sendCurrency))}
                >
                  {t('totalToPay')}
                  <span className='total'>
                    {sendCountry && receiveCountry
                      ? `${formatCurrency(totalToPay, sendCurrency)} / ${formatCurrency(totalToPay / (continents[continentFrom]?.rates[continentTo] || defaultExchangeRate), receiveCurrency)}`
                      : formatCurrency(totalToPay, sendCurrency)}
                  </span>
                </p>
                <p
                  onMouseEnter={() => speakText(t('exchangeRate') + ' ' + (sendCountry && receiveCountry
                    ? `${(continents[continentFrom]?.rates[continentTo] || defaultExchangeRate)}`
                    : defaultExchangeRate))}
                  aria-label={t('exchangeRate') + ' ' + (sendCountry && receiveCountry
                    ? `${(continents[continentFrom]?.rates[continentTo] || defaultExchangeRate)}`
                    : defaultExchangeRate)}
                >
                  {t('exchangeRate')} <span className='taux'>{sendCountry && receiveCountry
                    ? (continents[continentFrom]?.rates[continentTo] || defaultExchangeRate)
                    : defaultExchangeRate}</span>
                </p>
              </div>

              <Link to="/transfer">
                <Button
                  variant="success"
                  className="mt-3 btn-success"
                  onMouseEnter={() => speakText(t('transferButton'))}
                  aria-label={t('transferButton')}
                >
                  {t('transferButton')} <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                </Button>
              </Link>

            </Form>
          </Col>
        </Row>
      </Container>
    </AccueilContainer>
  );
}

export default Accueil;
