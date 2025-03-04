import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "./CartPage.css";

function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } =
    useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h1>Votre Panier</h1>
        <p>Votre panier est vide.</p>
        <Link to="/products" className="btn">
          Continuer vos achats
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Votre Panier</h1>

      <div className="cart-container">
        <div className="cart-items">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="cart-item">
                  <td className="product-info">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <Link to={`/products/${item.id}`}>{item.name}</Link>
                    </div>
                  </td>
                  <td className="product-price">{item.price.toFixed(2)} €</td>
                  <td className="product-quantity">
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= (item.stock || 10)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="product-total">
                    {(item.price * item.quantity).toFixed(2)} €
                  </td>
                  <td className="product-actions">
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cart-summary">
          <h2>Récapitulatif</h2>

          <div className="summary-row">
            <span>Sous-total:</span>
            <span>{getCartTotal().toFixed(2)} €</span>
          </div>

          <div className="summary-row">
            <span>Livraison:</span>
            <span>Gratuite</span>
          </div>

          <div className="summary-row total">
            <span>Total:</span>
            <span>{getCartTotal().toFixed(2)} €</span>
          </div>

          {isAuthenticated ? (
            <Link to="/checkout" className="btn checkout-btn">
              Procéder au paiement
            </Link>
          ) : (
            <div className="login-prompt">
              <p>Veuillez vous connecter pour finaliser votre commande.</p>
              <Link to="/login" className="btn">
                Se connecter
              </Link>
            </div>
          )}

          <Link to="/products" className="continue-shopping">
            Continuer vos achats
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
