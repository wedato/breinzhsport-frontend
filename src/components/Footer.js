import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3>Breizhsport</h3>
          <p>Votre destination pour l'équipement sportif de qualité.</p>
        </div>

        <div className="footer-section">
          <h3>Liens Rapides</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/products">Produits</Link>
            </li>
            <li>
              <Link to="/cart">Panier</Link>
            </li>
            <li>
              <Link to="/profile">Mon Compte</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Catégories</h3>
          <ul className="footer-links">
            <li>
              <Link to="/products?category=football">Football</Link>
            </li>
            <li>
              <Link to="/products?category=basketball">Basketball</Link>
            </li>
            <li>
              <Link to="/products?category=running">Course à pied</Link>
            </li>
            <li>
              <Link to="/products?category=fitness">Fitness</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@breizhsport.com</p>
          <p>Téléphone: +33 1 23 45 67 89</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} Breizhsport. Tous droits réservés.</p>
          <p>
            <Link to="/privacy">Politique de confidentialité</Link> |
            <Link to="/terms">Conditions d'utilisation</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
