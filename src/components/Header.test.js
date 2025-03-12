import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import Header from "./Header";

// Mock pour Auth d'AWS Amplify
jest.mock("aws-amplify", () => ({
  Auth: {
    signOut: jest.fn().mockResolvedValue({}),
  },
}));

// Helper pour rendre le composant avec les contextes nécessaires
const renderWithContext = (ui, { authValue, cartValue }) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={authValue}>
        <CartContext.Provider value={cartValue}>{ui}</CartContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe("Header Component", () => {
  // Valeurs par défaut pour les contextes
  const defaultAuthValue = {
    isAuthenticated: false,
    user: null,
    checkAuthState: jest.fn(),
  };

  const defaultCartValue = {
    cart: [],
  };

  test("affiche les liens de navigation de base", () => {
    renderWithContext(<Header />, {
      authValue: defaultAuthValue,
      cartValue: defaultCartValue,
    });

    // Vérifier les liens de base
    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Produits")).toBeInTheDocument();
    expect(screen.getByText("Panier")).toBeInTheDocument();
  });

  test("affiche les liens de connexion et inscription quand non authentifié", () => {
    renderWithContext(<Header />, {
      authValue: defaultAuthValue,
      cartValue: defaultCartValue,
    });

    // Vérifier les liens pour utilisateur non authentifié
    expect(screen.getByText("Connexion")).toBeInTheDocument();
    expect(screen.getByText("Inscription")).toBeInTheDocument();

    // Vérifier que les liens pour utilisateur authentifié ne sont pas présents
    expect(screen.queryByText("Profil")).not.toBeInTheDocument();
    expect(screen.queryByText("Commandes")).not.toBeInTheDocument();
    expect(screen.queryByText("Déconnexion")).not.toBeInTheDocument();
  });

  test("affiche les liens utilisateur quand authentifié", () => {
    renderWithContext(<Header />, {
      authValue: {
        ...defaultAuthValue,
        isAuthenticated: true,
        user: { username: "testuser" },
      },
      cartValue: defaultCartValue,
    });

    // Vérifier les liens pour utilisateur authentifié
    expect(screen.getByText("Profil")).toBeInTheDocument();
    expect(screen.getByText("Commandes")).toBeInTheDocument();
    expect(screen.getByText("Déconnexion")).toBeInTheDocument();

    // Vérifier que les liens pour utilisateur non authentifié ne sont pas présents
    expect(screen.queryByText("Connexion")).not.toBeInTheDocument();
    expect(screen.queryByText("Inscription")).not.toBeInTheDocument();
  });

  test("affiche le nombre d'articles dans le panier", () => {
    renderWithContext(<Header />, {
      authValue: defaultAuthValue,
      cartValue: {
        cart: [
          { id: "1", quantity: 2 },
          { id: "2", quantity: 3 },
        ],
      },
    });

    // Vérifier que le compteur du panier affiche le bon nombre
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("n'affiche pas le compteur quand le panier est vide", () => {
    renderWithContext(<Header />, {
      authValue: defaultAuthValue,
      cartValue: defaultCartValue,
    });

    // Vérifier que le compteur du panier n'est pas affiché
    expect(screen.queryByText(/^[0-9]+$/)).not.toBeInTheDocument();
    expect(screen.queryByTestId("cart-count")).not.toBeInTheDocument();
  });
});
