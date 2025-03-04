import { API } from "aws-amplify";

const API_NAME = "sportEquipmentApi";

// Fonctions pour les produits
export const getProducts = async () => {
  try {
    return await API.get(API_NAME, "/products", {});
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    throw error;
  }
};

export const getProduct = async (productId) => {
  try {
    return await API.get(API_NAME, `/products/${productId}`, {});
  } catch (error) {
    console.error(
      `Erreur lors de la récupération du produit ${productId}:`,
      error
    );
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    return await API.post(API_NAME, "/products", {
      body: productData,
    });
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    return await API.put(API_NAME, `/products/${productId}`, {
      body: productData,
    });
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour du produit ${productId}:`,
      error
    );
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    return await API.del(API_NAME, `/products/${productId}`, {});
  } catch (error) {
    console.error(
      `Erreur lors de la suppression du produit ${productId}:`,
      error
    );
    throw error;
  }
};

// Fonctions pour les commandes
export const getOrders = async () => {
  try {
    return await API.get(API_NAME, "/orders", {});
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    throw error;
  }
};

export const getOrder = async (orderId) => {
  try {
    return await API.get(API_NAME, `/orders/${orderId}`, {});
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la commande ${orderId}:`,
      error
    );
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    return await API.post(API_NAME, "/orders", {
      body: orderData,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    throw error;
  }
};

// Fonctions pour les utilisateurs
export const getUserInfo = async () => {
  try {
    return await API.get(API_NAME, "/users/me", {});
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations utilisateur:",
      error
    );
    throw error;
  }
};

export const updateUserInfo = async (userData) => {
  try {
    return await API.put(API_NAME, "/users/me", {
      body: userData,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des informations utilisateur:",
      error
    );
    throw error;
  }
};
