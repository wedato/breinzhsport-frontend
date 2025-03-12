import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getProducts } from "../services/api";
import "./ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const location = useLocation();

  // Catégories disponibles
  const categories = [
    { id: "all", name: "Tous les produits" },
    { id: "football", name: "Football" },
    { id: "basketball", name: "Basketball" },
    { id: "running", name: "Course à pied" },
    { id: "fitness", name: "Fitness" },
  ];

  useEffect(() => {
    // Extraire la catégorie des paramètres d'URL
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }

    async function fetchProducts() {
      try {
        let fetchedProducts;

        try {
          // Essayer d'abord de récupérer les produits depuis l'API
          fetchedProducts = await getProducts();
        } catch (apiError) {
          console.warn(
            "Erreur API, utilisation des données de secours:",
            apiError
          );
          // Utiliser des données de secours en cas d'erreur API
          fetchedProducts = [
            {
              id: "1",
              name: "Ballon de football professionnel",
              price: 49.99,
              category: "football",
              description:
                "Ballon de football de qualité professionnelle, idéal pour les matchs et l'entraînement.",
              image: "https://via.placeholder.com/300x300?text=Football",
            },
            {
              id: "2",
              name: "Chaussures de running",
              price: 89.99,
              category: "running",
              description:
                "Chaussures légères et confortables pour la course à pied sur tous types de terrains.",
              image: "https://via.placeholder.com/300x300?text=Running+Shoes",
            },
            {
              id: "3",
              name: "Maillot de basketball",
              price: 59.99,
              category: "basketball",
              description:
                "Maillot respirant et léger pour le basketball, design moderne.",
              image:
                "https://via.placeholder.com/300x300?text=Basketball+Jersey",
            },
            {
              id: "4",
              name: "Tapis de yoga",
              price: 29.99,
              category: "fitness",
              description:
                "Tapis de yoga antidérapant et confortable pour vos séances de fitness.",
              image: "https://via.placeholder.com/300x300?text=Yoga+Mat",
            },
            {
              id: "5",
              name: "Gants de gardien de but",
              price: 34.99,
              category: "football",
              description:
                "Gants de gardien de but avec grip amélioré et protection des doigts.",
              image:
                "https://via.placeholder.com/300x300?text=Goalkeeper+Gloves",
            },
            {
              id: "6",
              name: "Ballon de basketball",
              price: 39.99,
              category: "basketball",
              description:
                "Ballon de basketball taille officielle avec excellent grip.",
              image: "https://via.placeholder.com/300x300?text=Basketball",
            },
            {
              id: "7",
              name: "Montre de sport GPS",
              price: 129.99,
              category: "running",
              description:
                "Montre GPS pour suivre vos performances de course avec précision.",
              image: "https://via.placeholder.com/300x300?text=GPS+Watch",
            },
            {
              id: "8",
              name: "Haltères (paire)",
              price: 49.99,
              category: "fitness",
              description:
                "Paire d'haltères de 5kg pour vos exercices de musculation.",
              image: "/images/products/dumbell.jpg",
            },
          ];
        }

        // Filtrer par catégorie si nécessaire
        const filteredProducts =
          categoryParam && categoryParam !== "all"
            ? fetchedProducts.filter(
                (product) => product.category === categoryParam
              )
            : fetchedProducts;

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
        setError("Erreur lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [location.search]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  if (loading) {
    return <div className="loading">Chargement des produits...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="products-page">
      <h1>Nos Produits</h1>

      {/* Filtres de catégorie */}
      <div className="category-filters">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={
              category.id === "all"
                ? "/products"
                : `/products?category=${category.id}`
            }
            className={`category-filter ${
              selectedCategory === category.id ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Liste des produits */}
      {products.length === 0 ? (
        <div className="no-products">
          Aucun produit trouvé dans cette catégorie.
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
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
      )}
    </div>
  );
}

export default ProductsPage;
