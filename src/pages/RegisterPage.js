import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const { signUp, confirmSignUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, password, confirmPassword, firstName, lastName } = formData;

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password, {
        email,
        given_name: firstName,
        family_name: lastName,
      });
      setVerificationStep(true);
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      setError(
        error.message || "Une erreur s'est produite lors de l'inscription."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await confirmSignUp(formData.email, verificationCode);
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      navigate("/login");
    } catch (error) {
      console.error("Erreur de vérification:", error);
      setError(
        error.message ||
          "Une erreur s'est produite lors de la vérification du code."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>{verificationStep ? "Vérification" : "Créer un compte"}</h1>
        {error && <div className="error-message">{error}</div>}

        {!verificationStep ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Prénom</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Nom</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
              />
              <small>
                Le mot de passe doit contenir au moins 8 caractères, incluant
                des lettres majuscules, minuscules et des chiffres.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Inscription en cours..." : "S'inscrire"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerification}>
            <div className="form-group">
              <label htmlFor="verificationCode">
                Code de vérification (envoyé par email)
              </label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              <small>
                Veuillez vérifier votre boîte de réception et entrer le code de
                vérification que nous vous avons envoyé.
              </small>
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Vérification en cours..." : "Vérifier"}
            </button>
          </form>
        )}

        <div className="register-footer">
          <p>
            Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
