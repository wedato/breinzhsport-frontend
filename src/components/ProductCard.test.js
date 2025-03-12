import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductCard from "./ProductCard";

// Mock du produit pour les tests
const mockProduct = {
  id: "123",
  name: "Chaussures de sport",
  price: 59.99,
  image: "/path/to/image.jpg",
};

// Helper pour rendre le composant avec le Router nécessaire
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("ProductCard Component", () => {
  test("affiche correctement les informations du produit", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    // Vérifier que le nom du produit est affiché
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

    // Vérifier que le prix est affiché correctement (avec 2 décimales)
    expect(
      screen.getByText(`${mockProduct.price.toFixed(2)} €`)
    ).toBeInTheDocument();

    // Vérifier que l'image est présente avec le bon alt text
    const image = screen.getByAltText(mockProduct.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProduct.image);

    // Vérifier que le lien pointe vers la bonne URL
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/product/${mockProduct.id}`);
  });

  test("gère correctement un produit sans image", () => {
    const productWithoutImage = { ...mockProduct, image: "" };
    renderWithRouter(<ProductCard product={productWithoutImage} />);

    // Vérifier que le composant se rend sans erreur même sans image
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

    // L'image devrait toujours être présente mais avec une src vide
    const image = screen.getByAltText(mockProduct.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "");
  });
});
