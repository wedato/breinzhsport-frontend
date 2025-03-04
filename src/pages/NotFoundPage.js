import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Non Trouvée</h2>
        <p>
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="back-home-btn">
            Retour à l'accueil
          </Link>
          <Link to="/products" className="browse-products-btn">
            Parcourir les produits
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
