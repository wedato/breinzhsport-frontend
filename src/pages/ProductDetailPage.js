import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { getProduct } from "../services/api";
import "./ProductDetailPage.css";

function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        let fetchedProduct;

        try {
          // Essayer d'abord de récupérer le produit depuis l'API
          fetchedProduct = await getProduct(productId);
        } catch (apiError) {
          console.warn(
            "Erreur API, utilisation des données de secours:",
            apiError
          );
          // Utiliser des données de secours en cas d'erreur API
          const mockProducts = {
            1: {
              id: "1",
              name: "Ballon de football professionnel",
              price: 49.99,
              category: "football",
              description:
                "Ballon de football de qualité professionnelle, idéal pour les matchs et l'entraînement. Fabriqué avec des matériaux durables et résistants aux intempéries. Taille officielle 5.",
              features: [
                "Taille officielle 5",
                "Matériau synthétique de haute qualité",
                "Résistant à l'eau",
                "Coutures renforcées",
                "Design moderne",
              ],
              stock: 15,
              image: "https://via.placeholder.com/500x500?text=Football",
            },
            2: {
              id: "2",
              name: "Chaussures de running",
              price: 89.99,
              category: "running",
              description:
                "Chaussures légères et confortables pour la course à pied sur tous types de terrains. Semelle amortissante et tige respirante pour un confort optimal.",
              features: [
                "Semelle amortissante",
                "Tige respirante",
                "Légères",
                "Adaptées à tous types de terrains",
                "Design ergonomique",
              ],
              stock: 8,
              image: "https://via.placeholder.com/500x500?text=Running+Shoes",
            },
            3: {
              id: "3",
              name: "Maillot de basketball",
              price: 59.99,
              category: "basketball",
              description:
                "Maillot respirant et léger pour le basketball, design moderne. Tissu évacuant la transpiration pour rester au sec pendant l'effort.",
              features: [
                "Tissu 100% polyester",
                "Technologie anti-transpiration",
                "Coupe ample pour une liberté de mouvement",
                "Logo brodé",
                "Lavable en machine",
              ],
              stock: 20,
              image:
                "https://via.placeholder.com/500x500?text=Basketball+Jersey",
            },
            4: {
              id: "4",
              name: "Tapis de yoga",
              price: 29.99,
              category: "fitness",
              description:
                "Tapis de yoga antidérapant et confortable pour vos séances de fitness. Épaisseur idéale pour protéger vos articulations.",
              features: [
                "Dimensions: 173 x 61 cm",
                "Épaisseur: 6 mm",
                "Surface antidérapante",
                "Matériau écologique",
                "Facile à nettoyer",
              ],
              stock: 12,
              image: "https://via.placeholder.com/500x500?text=Yoga+Mat",
            },
            5: {
              id: "5",
              name: "Gants de gardien de but",
              price: 34.99,
              category: "football",
              description:
                "Gants de gardien de but avec grip amélioré et protection des doigts. Confort et performance pour les gardiens de tous niveaux.",
              features: [
                "Latex de haute qualité pour un grip optimal",
                "Protection des doigts renforcée",
                "Fermeture ajustable au poignet",
                "Respirants et confortables",
                "Disponibles en plusieurs tailles",
              ],
              stock: 7,
              image:
                "https://via.placeholder.com/500x500?text=Goalkeeper+Gloves",
            },
            6: {
              id: "6",
              name: "Ballon de basketball",
              price: 39.99,
              category: "basketball",
              description:
                "Ballon de basketball taille officielle avec excellent grip. Idéal pour jouer en intérieur comme en extérieur.",
              features: [
                "Taille officielle 7",
                "Surface texturée pour un meilleur contrôle",
                "Construction durable",
                "Adapté pour intérieur et extérieur",
                "Valve de qualité pour maintenir la pression",
              ],
              stock: 18,
              image: "https://via.placeholder.com/500x500?text=Basketball",
            },
            7: {
              id: "7",
              name: "Montre de sport GPS",
              price: 129.99,
              category: "running",
              description:
                "Montre GPS pour suivre vos performances de course avec précision. Nombreuses fonctionnalités pour analyser votre entraînement.",
              features: [
                "GPS intégré",
                "Suivi de la fréquence cardiaque",
                "Étanche jusqu'à 50m",
                "Autonomie de batterie de 7 jours",
                "Compatible avec application mobile",
              ],
              stock: 5,
              image: "https://via.placeholder.com/500x500?text=GPS+Watch",
            },
            8: {
              id: "8",
              name: "Haltères (paire)",
              price: 49.99,
              category: "fitness",
              description:
                "Paire d'haltères de 5kg pour vos exercices de musculation. Poignée ergonomique pour une prise en main confortable.",
              features: [
                "Poids: 5kg chacun",
                "Revêtement en néoprène",
                "Poignée ergonomique antidérapante",
                "Compact et facile à ranger",
                "Idéal pour les exercices à domicile",
              ],
              stock: 10,
              image: "/images/products/dumbell.jpg",
            },
          };

          fetchedProduct = mockProducts[productId];

          if (!fetchedProduct) {
            throw new Error("Produit non trouvé");
          }
        }

        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Erreur lors du chargement du produit:", error);
        setError("Produit non trouvé");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.stock || 10)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate("/checkout");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="loading">Chargement du produit...</div>;
  }

  if (error || !product) {
    return <div className="error">Produit non trouvé</div>;
  }

  return (
    <div className="product-detail-page">
      <button className="back-button" onClick={handleGoBack}>
        &larr; Retour
      </button>

      <div className="product-detail-container">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">{product.price.toFixed(2)} €</p>
          <p className="category">Catégorie: {product.category}</p>
          <p className="description">{product.description}</p>

          {product.features && (
            <div className="features">
              <h3>Caractéristiques:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="stock">
            <p>
              Disponibilité:{" "}
              {product.stock > 0 ? (
                <span className="in-stock">En stock ({product.stock})</span>
              ) : (
                <span className="out-of-stock">Rupture de stock</span>
              )}
            </p>
          </div>

          <div className="actions">
            <div className="quantity">
              <label htmlFor="quantity">Quantité:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.stock || 10}
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            <button
              className="btn-add-to-cart"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              Ajouter au panier
            </button>
            <button
              className="btn-buy-now"
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
            >
              Acheter maintenant
            </button>
          </div>

          {addedToCart && (
            <div className="added-to-cart-message">
              Produit ajouté au panier avec succès!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
