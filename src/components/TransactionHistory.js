import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import TransactionChart from './TransactionChart';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  // Simulate fetching data from an API
  useEffect(() => {
    // Example data
    const fetchData = async () => {
      // Replace with actual API call
      const data = [
        { month: '01', year: '2023', amount: 500 },
        { month: '02', year: '2023', amount: 450 },
        { month: '03', year: '2023', amount: 600 },
        { month: '04', year: '2023', amount: 550 },
        { month: '05', year: '2023', amount: 620 },
        { month: '06', year: '2023', amount: 500 },
        { month: '07', year: '2023', amount: 650 },
        { month: '08', year: '2023', amount: 700 },
        { month: '09', year: '2023', amount: 620 },
        { month: '10', year: '2023', amount: 680 },
        { month: '11', year: '2023', amount: 600 },
        { month: '12', year: '2023', amount: 710 },
      ];
      setTransactions(data);
    };

    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>Historique des Transactions</h2>
          <TransactionChart transactions={transactions} />
        </Col>
      </Row>
    </Container>
  );
};

export default TransactionHistory;
