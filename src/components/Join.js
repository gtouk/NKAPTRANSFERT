// import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';
// import { Container } from 'react-bootstrap';
// import './Style/Joindre.css';

// function Joindre() {
//     return (
//         <div>
//             <Container className="mt-5">
//                 <div className="container mt-5">
//                     <div className="row">
//                         <div className="col-md-6">
//                             <h2>Contactez Nous</h2>
//                             <form>
//                                 <div className="form-group">
//                                     <label>Nom</label>
//                                     <input type="text" className="form-control" placeholder="Nom" />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Email</label>
//                                     <input type="email" className="form-control" placeholder="Email" />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Objet</label>
//                                     <input type="text" className="form-control" placeholder="Objet" />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Message</label>
//                                     <textarea className="form-control" rows="5" placeholder="Message"></textarea>
//                                 </div>
//                                 <div className="form-group">
//                                     {/* Ajoutez ici votre widget reCAPTCHA */}
//                                 </div>
//                                 <button type="submit" className="btn btn-success">
//                                     <FontAwesomeIcon icon={faEnvelope} className="me-2" />
//                                     Envoyer
//                                 </button>
//                             </form>
//                         </div>
//                         <div className="col-md-6">
//                             <div className="contact-info">
//                                 <h4><FontAwesomeIcon icon={faEnvelope} className="me-2" /> Adresse Email</h4>
//                                 <p>Joe@NKAP.com</p>
//                                 <h4><FontAwesomeIcon icon={faPhone} className="me-2" /> Numéro de téléphone</h4>
//                                 <p>+1 488 546 8936</p>
//                                 <h4><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /> Saint-Constant</h4>
//                                 <p>QUEBEC - CANADA</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Container>
//         </div>
//     );
// }

// export default Joindre;
import { faChevronDown, faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import './Style/Joindre.css';

function Joindre() {
  const [activeKey, setActiveKey] = useState(null);

  const toggleFAQ = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  return (
    <div>
            <Container className="mt-5">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>Contactez Nous</h2>
                            <form>
                                <div className="form-group">
                                    <label>Nom</label>
                                    <input type="text" className="form-control" placeholder="Nom" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <label>Objet</label>
                                    <input type="text" className="form-control" placeholder="Objet" />
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea className="form-control" rows="5" placeholder="Message"></textarea>
                                </div>
                                <div className="form-group">
                                    {/* Ajoutez ici votre widget reCAPTCHA */}
                                </div>
                                <button type="submit" className="btn btn-success">
                                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                                    Envoyer
                                </button>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <div className="contact-info">
                                <h4><FontAwesomeIcon icon={faEnvelope} className="me-2" /> Adresse Email</h4>
                                <p>Joe@NKAP.com</p>
                                <h4><FontAwesomeIcon icon={faPhone} className="me-2" /> Numéro de téléphone</h4>
                                <p>+1 488 546 8936</p>
                                <h4><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /> Saint-Constant</h4>
                                <p>QUEBEC - CANADA</p>
                            </div>
                        </div>
                    </div>
                </div>
    <div className="row mt-5">
          <div className="col-12">
            <h2>FAQ</h2>
            <Accordion activeKey={activeKey} flush> 
              <Accordion.Item eventKey="0" onClick={() => toggleFAQ("0")}>
                <Accordion.Header>
                  Est-ce qu'il y a des frais pour faire des transferts d'argent?
                  <FontAwesomeIcon icon={faChevronDown} className="ms-2" />
                </Accordion.Header>
                <Accordion.Body>
                  Non, il n'y a pas de frais pour faire des transferts d'argent. Les frais varient en fonction du montant envoyé et du pays de destination.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1" onClick={() => toggleFAQ("1")}>
                <Accordion.Header>
                  Quelles sont les méthodes valides pour faire des transferts d'argent? (E-transfer, chèque, etc)
                  <FontAwesomeIcon icon={faChevronDown} className="ms-2" />
                </Accordion.Header>
                <Accordion.Body>
                  Vous pouvez utiliser plusieurs méthodes pour faire des transferts d'argent, y compris les virements électroniques (E-transfer), les chèques et d'autres méthodes disponibles selon votre pays.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2" onClick={() => toggleFAQ("2")}>
                <Accordion.Header>
                  Comment est-ce que je peux transférer de l'argent?
                  <FontAwesomeIcon icon={faChevronDown} className="ms-2" />
                </Accordion.Header>
                <Accordion.Body>
                  Pour transférer de l'argent, connectez-vous à votre compte, sélectionnez l'option "Envoyer de l'argent", choisissez le montant et le destinataire, et suivez les instructions pour compléter la transaction.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Joindre;

