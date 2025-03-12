import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { AuthProvider, AuthContext } from "./AuthContext";
import { Auth } from "aws-amplify";

// Mock d'AWS Amplify Auth
jest.mock("aws-amplify", () => ({
  Auth: {
    currentAuthenticatedUser: jest.fn(),
    signIn: jest.fn(),
    signUp: jest.fn(),
    confirmSignUp: jest.fn(),
    signOut: jest.fn(),
  },
}));

// Composant de test pour accéder au contexte
const TestComponent = () => {
  const authContext = React.useContext(AuthContext);
  return (
    <div>
      <div data-testid="auth-status">
        {authContext.isAuthenticated ? "Authentifié" : "Non authentifié"}
      </div>
      <div data-testid="loading-status">
        {authContext.loading ? "Chargement" : "Chargé"}
      </div>
      <button
        data-testid="sign-in-button"
        onClick={() => authContext.signIn("test@example.com", "password")}
      >
        Se connecter
      </button>
      <button data-testid="sign-out-button" onClick={authContext.signOut}>
        Se déconnecter
      </button>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("initialise avec l'utilisateur non authentifié et en chargement", () => {
    Auth.currentAuthenticatedUser.mockRejectedValueOnce(
      new Error("Not authenticated")
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "Non authentifié"
    );
    expect(screen.getByTestId("loading-status")).toHaveTextContent(
      "Chargement"
    );
  });

  test("met à jour l'état après vérification de l'authentification", async () => {
    const mockUser = { username: "testuser" };
    Auth.currentAuthenticatedUser.mockResolvedValueOnce(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("auth-status")).toHaveTextContent(
        "Authentifié"
      );
    });

    expect(screen.getByTestId("loading-status")).toHaveTextContent("Chargé");
  });

  test("permet à l'utilisateur de se connecter", async () => {
    const mockUser = { username: "testuser" };
    Auth.currentAuthenticatedUser.mockRejectedValueOnce(
      new Error("Not authenticated")
    );
    Auth.signIn.mockResolvedValueOnce(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("auth-status")).toHaveTextContent(
        "Non authentifié"
      );
    });

    fireEvent.click(screen.getByTestId("sign-in-button"));

    await waitFor(() => {
      expect(Auth.signIn).toHaveBeenCalledWith("test@example.com", "password");
    });

    await waitFor(() => {
      expect(screen.getByTestId("auth-status")).toHaveTextContent(
        "Authentifié"
      );
    });
  });

  test("permet à l'utilisateur de se déconnecter", async () => {
    const mockUser = { username: "testuser" };
    Auth.currentAuthenticatedUser.mockResolvedValueOnce(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("auth-status")).toHaveTextContent(
        "Authentifié"
      );
    });

    fireEvent.click(screen.getByTestId("sign-out-button"));

    await waitFor(() => {
      expect(Auth.signOut).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByTestId("auth-status")).toHaveTextContent(
        "Non authentifié"
      );
    });
  });

  test("accepte des valeurs initiales via les props", () => {
    const initialValue = {
      isAuthenticated: true,
      user: { username: "testuser" },
    };

    render(
      <AuthProvider value={initialValue}>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("auth-status")).toHaveTextContent("Authentifié");
    expect(screen.getByTestId("loading-status")).toHaveTextContent("Chargé");
  });
});
