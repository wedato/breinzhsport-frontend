import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./OrdersPage.css";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Pour le POC, nous utilisons des données simulées
    // Dans une application réelle, nous utiliserions getOrders() de l'API

    // Simuler un appel API
    setTimeout(() => {
      try {
        // Données simulées pour le POC
        const mockOrders = [
          {
            id: "ORD-001",
            date: "2023-03-01T14:30:00Z",
            status: "DELIVERED",
            total: 139.97,
            items: [
              {
                id: "1",
                name: "Ballon de football professionnel",
                price: 49.99,
                quantity: 1,
                image: "https://via.placeholder.com/80x80?text=Football",
              },
              {
                id: "3",
                name: "Maillot de basketball",
                price: 59.99,
                quantity: 1,
                image:
                  "https://via.placeholder.com/80x80?text=Basketball+Jersey",
              },
              {
                id: "4",
                name: "Tapis de yoga",
                price: 29.99,
                quantity: 1,
                image: "https://via.placeholder.com/80x80?text=Yoga+Mat",
              },
            ],
          },
          {
            id: "ORD-002",
            date: "2023-02-15T10:15:00Z",
            status: "DELIVERED",
            total: 89.99,
            items: [
              {
                id: "2",
                name: "Chaussures de running",
                price: 89.99,
                quantity: 1,
                image: "https://via.placeholder.com/80x80?text=Running+Shoes",
              },
            ],
          },
          {
            id: "ORD-003",
            date: "2023-03-10T09:45:00Z",
            status: "PROCESSING",
            total: 74.98,
            items: [
              {
                id: "6",
                name: "Ballon de basketball",
                price: 39.99,
                quantity: 1,
                image: "https://via.placeholder.com/80x80?text=Basketball",
              },
              {
                id: "5",
                name: "Gants de gardien de but",
                price: 34.99,
                quantity: 1,
                image:
                  "https://via.placeholder.com/80x80?text=Goalkeeper+Gloves",
              },
            ],
          },
        ];

        setOrders(mockOrders);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors du chargement des commandes");
        setLoading(false);
      }
    }, 800);

    // Dans une application réelle, nous utiliserions:
    /*
    async function fetchOrders() {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        setError('Erreur lors du chargement des commandes');
      } finally {
        setLoading(false);
      }
    }
    
    fetchOrders();
    */
  }, []);

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  // Fonction pour obtenir la classe CSS en fonction du statut
  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "status-pending";
      case "PROCESSING":
        return "status-processing";
      case "SHIPPED":
        return "status-shipped";
      case "DELIVERED":
        return "status-delivered";
      case "CANCELLED":
        return "status-cancelled";
      default:
        return "";
    }
  };

  // Fonction pour traduire le statut en français
  const translateStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "En attente";
      case "PROCESSING":
        return "En traitement";
      case "SHIPPED":
        return "Expédiée";
      case "DELIVERED":
        return "Livrée";
      case "CANCELLED":
        return "Annulée";
      default:
        return status;
    }
  };

  if (loading) {
    return <div className="loading">Chargement des commandes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page empty-orders">
        <h1>Mes Commandes</h1>
        <p>Vous n'avez pas encore passé de commande.</p>
        <Link to="/products" className="btn">
          Découvrir nos produits
        </Link>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>Mes Commandes</h1>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h2>Commande #{order.id}</h2>
                <p className="order-date">Passée le {formatDate(order.date)}</p>
              </div>
              <div className="order-status">
                <span
                  className={`status-badge ${getStatusClass(order.status)}`}
                >
                  {translateStatus(order.status)}
                </span>
              </div>
            </div>

            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Quantité: {item.quantity}</p>
                    <p className="item-price">{item.price.toFixed(2)} €</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-total">
                <span>Total:</span>
                <span className="total-amount">{order.total.toFixed(2)} €</span>
              </div>
              <Link
                to={`/orders/${order.id}`}
                className="btn btn-secondary view-details-btn"
              >
                Voir les détails
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
