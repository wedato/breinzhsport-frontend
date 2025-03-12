// jest-dom ajoute des matchers jest personnalisés pour affirmer sur les nœuds DOM.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Configuration de React Router pour éviter les avertissements
window.__REACT_ROUTER_FUTURE_FLAGS = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

// Mock des modules qui pourraient causer des problèmes dans les tests
jest.mock("aws-amplify", () => ({
  Auth: {
    currentAuthenticatedUser: jest.fn(),
    signOut: jest.fn(),
  },
  API: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    del: jest.fn(),
  },
}));
