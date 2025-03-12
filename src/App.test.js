import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Mock des composants pour éviter de rendre tout l'arbre de composants
jest.mock("./components/Header", () => () => (
  <div data-testid="mock-header">Header</div>
));
jest.mock("./components/Footer", () => () => (
  <div data-testid="mock-footer">Footer</div>
));
jest.mock("./pages/HomePage", () => () => (
  <div data-testid="mock-home-page">HomePage</div>
));
jest.mock("./pages/ProductsPage", () => () => <div>ProductsPage</div>);
jest.mock("./pages/ProductDetailPage", () => () => (
  <div>ProductDetailPage</div>
));
jest.mock("./pages/CartPage", () => () => <div>CartPage</div>);
jest.mock("./pages/CheckoutPage", () => () => <div>CheckoutPage</div>);
jest.mock("./pages/OrdersPage", () => () => <div>OrdersPage</div>);
jest.mock("./pages/ProfilePage", () => () => <div>ProfilePage</div>);
jest.mock("./pages/LoginPage", () => () => <div>LoginPage</div>);
jest.mock("./pages/RegisterPage", () => () => <div>RegisterPage</div>);
jest.mock("./pages/NotFoundPage", () => () => <div>NotFoundPage</div>);

// Mock des contextes
jest.mock("./context/AuthContext", () => ({
  AuthProvider: ({ children }) => (
    <div data-testid="auth-provider">{children}</div>
  ),
}));

jest.mock("./context/CartContext", () => ({
  CartProvider: ({ children }) => (
    <div data-testid="cart-provider">{children}</div>
  ),
}));

describe("App Component", () => {
  test("rend le composant App avec Header, Footer et la page d'accueil", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Vérifier que les composants principaux sont rendus
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
    expect(screen.getByTestId("mock-home-page")).toBeInTheDocument();

    // Vérifier que les providers sont rendus
    expect(screen.getByTestId("auth-provider")).toBeInTheDocument();
    expect(screen.getByTestId("cart-provider")).toBeInTheDocument();
  });
});
