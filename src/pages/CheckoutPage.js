import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "./CheckoutPage.css";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
    paymentMethod: "card",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Rediriger si le panier est vide
  if (cart.length === 0 && !orderSuccess) {
    navigate("/cart");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Effacer l'erreur lorsque l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.address.trim()) {
      newErrors.address = "L'adresse est requise";
    }

    if (!formData.city.trim()) {
      newErrors.city = "La ville est requise";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Le code postal est requis";
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Le code postal doit contenir 5 chiffres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler un appel API pour créer une commande
      // Dans une application réelle, nous utiliserions createOrder() de l'API

      // Préparer les données de la commande
      // Variable commentée pour éviter l'avertissement ESLint
      /*const orderData = {
        userId: isAuthenticated ? 'authenticated-user' : 'guest-user',
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: getCartTotal(),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        },
        paymentDetails: {
          method: formData.paymentMethod
        }
      };*/

      // Simuler un délai de traitement
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Vider le panier après une commande réussie
      clearCart();
      setOrderSuccess(true);

      // Dans une application réelle:
      // const response = await createOrder(orderData);
      // if (response.id) {
      //   clearCart();
      //   setOrderSuccess(true);
      // }
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      setErrors({
        submit:
          "Une erreur est survenue lors du traitement de votre commande. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="checkout-page order-success">
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h1>Commande confirmée !</h1>
          <p>
            Merci pour votre achat. Votre commande a été traitée avec succès.
          </p>
          <p>Un email de confirmation a été envoyé à {formData.email}.</p>
          <button className="btn" onClick={() => navigate("/products")}>
            Continuer vos achats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Finaliser votre commande</h1>

      <div className="checkout-container">
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Informations de livraison</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Prénom</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={
                    errors.firstName ? "form-control error" : "form-control"
                  }
                />
                {errors.firstName && (
                  <div className="error-message">{errors.firstName}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Nom</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={
                    errors.lastName ? "form-control error" : "form-control"
                  }
                />
                {errors.lastName && (
                  <div className="error-message">{errors.lastName}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "form-control error" : "form-control"}
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={
                  errors.address ? "form-control error" : "form-control"
                }
              />
              {errors.address && (
                <div className="error-message">{errors.address}</div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">Ville</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={
                    errors.city ? "form-control error" : "form-control"
                  }
                />
                {errors.city && (
                  <div className="error-message">{errors.city}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="postalCode">Code postal</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={
                    errors.postalCode ? "form-control error" : "form-control"
                  }
                />
                {errors.postalCode && (
                  <div className="error-message">{errors.postalCode}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="country">Pays</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-control"
              >
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Suisse">Suisse</option>
                <option value="Canada">Canada</option>
              </select>
            </div>

            <h2>Mode de paiement</h2>

            <div className="payment-methods">
              <div className="payment-method">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleChange}
                />
                <label htmlFor="card">Carte bancaire</label>
              </div>

              <div className="payment-method">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === "paypal"}
                  onChange={handleChange}
                />
                <label htmlFor="paypal">PayPal</label>
              </div>
            </div>

            {errors.submit && (
              <div className="error-message submit-error">{errors.submit}</div>
            )}

            <button
              type="submit"
              className="btn place-order-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Traitement en cours..." : "Passer la commande"}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Récapitulatif de la commande</h2>

          <div className="order-items">
            {cart.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-info">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>Quantité: {item.quantity}</p>
                  </div>
                </div>
                <div className="item-price">
                  {(item.price * item.quantity).toFixed(2)} €
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Sous-total:</span>
              <span>{getCartTotal().toFixed(2)} €</span>
            </div>

            <div className="total-row">
              <span>Livraison:</span>
              <span>Gratuite</span>
            </div>

            <div className="total-row grand-total">
              <span>Total:</span>
              <span>{getCartTotal().toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
