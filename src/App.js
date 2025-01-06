import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Account from './components/Account';
import Accueil from './components/Accueil';
import Facture from './components/Facture';
import ForgotPassword from './components/ForgotPassword';
import Joindre from './components/Join';
import Layout from './components/Layout';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Profil from './components/Profil';
import Recipients from './components/Recipients';
import ReferAFriend from './components/ReferAFriend';
import ResetPassword from './components/ResetPassword';
import Signup from './components/SignUp';
import TransactionHistory from './components/TransactionHistory';
import Transfer from './components/Transfer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simuler l'authentification après un login réussi
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      console.log('Nom d\'utilisateur après connexion:', storedUserName); // Vérifiez si le nom est récupéré
    }
  };
  



  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/mot-de-passe-oublie" component={ForgotPassword} />
          <Route path="/reset-password/:token" component={ResetPassword} />
          
          
          {/* Regrouper toutes les routes protégées sous PrivateRoute */}
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/pay" element={<Facture />} />
            <Route path="/contact" element={<Joindre />} />
            <Route path="/profile" element={<Profil />} />
            <Route path="/history" element={<TransactionHistory />} />
            <Route path="/recipients" element={<Recipients />} />
            <Route path="/account" element={<Account />} />
            <Route path="/refer-a-friend" element={<ReferAFriend />} />
          </Route>

          {/* Route pour l'inscription */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
