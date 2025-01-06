import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LogoutButton = () => {
    const {logout} = useContext(AuthContext);
    const history = useHistory();


    const handleLogout = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch('http://localhost:3000/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token}),
            });

            if (response.ok) {
                localStorage.removeItem('authToken');
                logout();
                history.push('/login');
            } else {
                console.log('Erreur lors de la déconnexion');
            }
        } catch (error) {
            console.log('Erreur :', error);
        }
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
            );
        };

export default LogoutButton;