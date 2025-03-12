import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";

// Helper pour rendre le composant avec le Router nécessaire
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Footer Component", () => {
  test("affiche le titre et la description de Breizhsport", () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText("Breizhsport")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Votre destination pour l'équipement sportif de qualité."
      )
    ).toBeInTheDocument();
  });

  test("affiche les liens rapides", () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText("Liens Rapides")).toBeInTheDocument();
    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Produits")).toBeInTheDocument();
    expect(screen.getByText("Panier")).toBeInTheDocument();
    expect(screen.getByText("Mon Compte")).toBeInTheDocument();
  });

  test("affiche les catégories de produits", () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText("Catégories")).toBeInTheDocument();
    expect(screen.getByText("Football")).toBeInTheDocument();
    expect(screen.getByText("Basketball")).toBeInTheDocument();
    expect(screen.getByText("Course à pied")).toBeInTheDocument();
    expect(screen.getByText("Fitness")).toBeInTheDocument();
  });

  test("affiche les informations de contact", () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(
      screen.getByText("Email: contact@breizhsport.com")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Téléphone: +33 1 23 45 67 89")
    ).toBeInTheDocument();
  });

  test("affiche le copyright avec l'année actuelle", () => {
    renderWithRouter(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Breizhsport. Tous droits réservés.`)
    ).toBeInTheDocument();
  });

  test("affiche les liens de politique de confidentialité et conditions d'utilisation", () => {
    renderWithRouter(<Footer />);

    expect(
      screen.getByText("Politique de confidentialité")
    ).toBeInTheDocument();
    expect(screen.getByText("Conditions d'utilisation")).toBeInTheDocument();
  });
});
