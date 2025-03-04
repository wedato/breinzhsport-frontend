import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, logout, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Simuler le chargement des données utilisateur
  useEffect(() => {
    if (user) {
      // Dans un cas réel, ces données viendraient de l'API
      setFormData({
        firstName: user.firstName || "Jean",
        lastName: user.lastName || "Dupont",
        email: user.email || "jean.dupont@example.com",
        phone: user.phone || "06 12 34 56 78",
        address: user.address || "123 Rue de Paris",
        city: user.city || "Paris",
        postalCode: user.postalCode || "75001",
        country: user.country || "France",
      });
    } else {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
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

    if (!formData.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis";
    }

    if (!formData.address.trim()) {
      newErrors.address = "L'adresse est requise";
    }

    if (!formData.city.trim()) {
      newErrors.city = "La ville est requise";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Le code postal est requis";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Le pays est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      // Simuler un appel API pour mettre à jour le profil
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dans un cas réel, on appellerait updateUserProfile avec les données du formulaire
      // updateUserProfile(formData);

      setSaveSuccess(true);
      setIsEditing(false);

      // Réinitialiser le message de succès après 3 secondes
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Une erreur est survenue lors de la mise à jour du profil",
      }));
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // Réinitialiser les erreurs lors du basculement du mode édition
    setErrors({});
  };

  if (!user) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="profile-page">
      <h1>Mon Profil</h1>

      {saveSuccess && (
        <div className="success-message">
          Votre profil a été mis à jour avec succès!
        </div>
      )}

      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="user-avatar">
            <img
              src={user.avatar || "https://via.placeholder.com/150"}
              alt="Avatar"
            />
          </div>
          <h2>
            {formData.firstName} {formData.lastName}
          </h2>
          <p className="user-email">{formData.email}</p>
          <div className="sidebar-actions">
            <button className="edit-profile-btn" onClick={handleEditToggle}>
              {isEditing ? "Annuler" : "Modifier le profil"}
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Se déconnecter
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>Informations personnelles</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={errors.firstName ? "error" : ""}
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
                    disabled={!isEditing}
                    className={errors.lastName ? "error" : ""}
                  />
                  {errors.lastName && (
                    <div className="error-message">{errors.lastName}</div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={errors.phone ? "error" : ""}
                  />
                  {errors.phone && (
                    <div className="error-message">{errors.phone}</div>
                  )}
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="address">Adresse</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={errors.address ? "error" : ""}
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
                    disabled={!isEditing}
                    className={errors.city ? "error" : ""}
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
                    disabled={!isEditing}
                    className={errors.postalCode ? "error" : ""}
                  />
                  {errors.postalCode && (
                    <div className="error-message">{errors.postalCode}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country">Pays</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={errors.country ? "error" : ""}
                />
                {errors.country && (
                  <div className="error-message">{errors.country}</div>
                )}
              </div>

              {errors.submit && (
                <div className="submit-error">{errors.submit}</div>
              )}

              {isEditing && (
                <div className="form-actions">
                  <button
                    type="submit"
                    className="save-profile-btn"
                    disabled={isSaving}
                  >
                    {isSaving
                      ? "Enregistrement..."
                      : "Enregistrer les modifications"}
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="profile-section">
            <h2>Mes commandes récentes</h2>
            <p className="section-link">
              <a href="/orders">Voir toutes mes commandes</a>
            </p>
          </div>

          <div className="profile-section">
            <h2>Préférences</h2>
            <div className="preferences-options">
              <div className="preference-item">
                <label>
                  <input type="checkbox" checked={true} disabled={!isEditing} />
                  Recevoir des notifications par email
                </label>
              </div>
              <div className="preference-item">
                <label>
                  <input
                    type="checkbox"
                    checked={false}
                    disabled={!isEditing}
                  />
                  Recevoir des notifications par SMS
                </label>
              </div>
              <div className="preference-item">
                <label>
                  <input type="checkbox" checked={true} disabled={!isEditing} />
                  Recevoir notre newsletter mensuelle
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
