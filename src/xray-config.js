// Version simplifiée de X-Ray pour le frontend
// Cette version est compatible avec le navigateur et ne dépend pas de aws-xray-sdk-core

// Mock d'AWSXRay pour le frontend
const AWSXRay = {
  // Configuration
  serviceName: "breinzhsport-frontend",

  // Méthodes
  setServiceName: (name) => {
    AWSXRay.serviceName = name;
    console.log(`X-Ray service name set to: ${name}`);
  },

  middleware: {
    setSamplingRules: (rules) => {
      console.log("X-Ray sampling rules set:", rules);
    },
  },

  beginSegment: (name) => {
    console.log(`X-Ray segment started: ${name}`);
    const startTime = Date.now();

    return {
      addAnnotation: (key, value) => {
        console.log(`X-Ray annotation added: ${key}=${value}`);
      },
      addError: (error) => {
        console.error(`X-Ray segment error: ${error.message || error}`);
      },
      close: () => {
        const duration = Date.now() - startTime;
        console.log(`X-Ray segment closed: ${name} (duration: ${duration}ms)`);
      },
    };
  },
};

// Fonction pour tracer les requêtes API
export const traceApiCall = async (apiName, operation, params) => {
  console.log(`Tracing API call: ${apiName}.${operation}`, params);
  // Cette fonction peut être utilisée pour enregistrer des métriques ou des logs
};

export default AWSXRay;
