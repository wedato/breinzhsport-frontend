import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  // Catégories populaires
  const categories = [
    {
      id: "football",
      name: "Football",
      image: "https://via.placeholder.com/300x200?text=Football",
    },
    {
      id: "basketball",
      name: "Basketball",
      image: "/images/products/basket.jpg",
    },
    {
      id: "running",
      name: "Course à pied",
      image: "https://via.placeholder.com/300x200?text=Running",
    },
    {
      id: "fitness",
      name: "Fitness",
      image: "https://via.placeholder.com/300x200?text=Fitness",
    },
  ];

  // Produits en vedette (simulés pour le POC)
  const featuredProducts = [
    {
      id: "1",
      name: "Ballon de football professionnel",
      price: 49.99,
      image: "https://via.placeholder.com/200x200?text=Football",
    },
    {
      id: "2",
      name: "Chaussures de running",
      price: 89.99,
      image: "https://via.placeholder.com/200x200?text=Running+Shoes",
    },
    {
      id: "3",
      name: "Maillot de basketball",
      price: 59.99,
      image: "https://via.placeholder.com/200x200?text=Basketball+Jersey",
    },
    {
      id: "4",
      name: "Tapis de yoga",
      price: 29.99,
      image: "https://via.placeholder.com/200x200?text=Yoga+Mat",
    },
  ];

  return (
    <div className="home-page">
      {/* Bannière principale */}
      <section className="hero">
        <div className="hero-content">
          <h1>Équipement sportif de qualité</h1>
          <p>
            Découvrez notre sélection d'équipements sportifs pour tous les
            niveaux
          </p>
          <Link to="/products" className="btn">
            Voir les produits
          </Link>
        </div>
      </section>

      {/* Catégories populaires */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Catégories populaires</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                to={`/products?category=${category.id}`}
                className="category-card"
                key={category.id}
              >
                <img src={category.image} alt={category.name} />
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Produits en vedette */}
      <section className="featured-products-section">
        <div className="container">
          <h2 className="section-title">Produits en vedette</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p className="price">{product.price.toFixed(2)} €</p>
                </Link>
                <Link to={`/products/${product.id}`} className="btn">
                  Voir le produit
                </Link>
              </div>
            ))}
          </div>
          <div className="view-all">
            <Link to="/products" className="btn btn-secondary">
              Voir tous les produits
            </Link>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="benefits-section">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🚚</div>
              <h3>Livraison rapide</h3>
              <p>Livraison en 2-3 jours ouvrables</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔄</div>
              <h3>Retours gratuits</h3>
              <p>30 jours pour changer d'avis</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔒</div>
              <h3>Paiement sécurisé</h3>
              <p>Vos données sont protégées</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💬</div>
              <h3>Support client</h3>
              <p>Assistance 7j/7</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
