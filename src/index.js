import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import App from "./App";
import "./index.css";

// Configuration d'AWS Amplify avec les valeurs réelles après le déploiement
Amplify.configure({
  Auth: {
    region: "eu-west-3", // Région AWS
    userPoolId: "eu-west-3_Psqm1A8zW", // À remplacer par votre User Pool ID réel
    userPoolWebClientId: "44ep2iuodfqd62bsso60kpig80", // À remplacer par votre App Client ID réel
  },
  API: {
    endpoints: [
      {
        name: "sportEquipmentApi",
        endpoint:
          process.env.REACT_APP_API_URL ||
          "https://wfsopm1zn4.execute-api.eu-west-3.amazonaws.com/prod",
        region: "eu-west-3", // Région AWS
      },
    ],
  },
  Storage: {
    AWSS3: {
      bucket: "VOTRE_BUCKET_NAME", // À remplacer après le déploiement
      region: "eu-west-3", // Région AWS
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
