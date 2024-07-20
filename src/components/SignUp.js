import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

const SignupContainer = styled.div`
  .form-group {
    margin-bottom: 1rem;
  }
  .form-label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  .btn-primary {
    background-color: #16A085;
    border-color: #16A085;
  }
  .btn-primary:hover {
    background-color: darken(#16A085, 10%);
    border-color: darken(#16A085, 10%);
  }
`;

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    // Logique d'inscription ici
    console.log('Utilisateur inscrit:', { name, email, password });
  };

  return (
    <SignupContainer>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="display-4 heading">Inscription</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="form-group">
                <Form.Label className="form-label">Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="form-group">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="form-group">
                <Form.Label className="form-label">Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="form-group">
                <Form.Label className="form-label">Confirmer le mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirmez votre mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {error && <p className="text-danger">{error}</p>}

              <Button type="submit" variant="primary" className="mt-3">S'inscrire</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </SignupContainer>
  );
}

export default Signup;
