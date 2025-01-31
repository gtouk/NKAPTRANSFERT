import axios from 'axios'; // Importer axios
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import TransactionChart from './TransactionChart';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token'); // Récupérer le token JWT dans localStorage
        if (!token) {
          throw new Error('No token found, please log in.');
        }

        // Effectuer la requête API pour récupérer les transactions
        const response = await axios.get('http://localhost:3000/api/transactions', {
          headers: {
            Authorization: `Bearer ${token}` // Passer le token JWT dans l'entête de la requête
          }
        });

        // Mettre à jour les transactions dans le state
        setTransactions(response.data);
      } catch (error) {
        setError(error.message || 'Error fetching transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>Historique des Transactions</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nom de l'utilisateur</th>
                <th>Nom du destinataire</th>
                <th>Montant</th>
                <th>Date de la transaction</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.user_name}</td>
                  <td>{transaction.recipient_name}</td>
                  <td>{transaction.amount} €</td>
                  <td>{new Date(transaction.transaction_date).toLocaleDateString()} {new Date(transaction.transaction_date).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <TransactionChart transactions={transactions} />
        </Col>
      </Row>
    </Container>
  );
};

export default TransactionHistory;
