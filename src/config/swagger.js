const swaggerUi = require("swagger-ui-express");
const swaggerJSdoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "EWallet API",
    description:
      "This is a EWallet API application made with Node.js, Express and MongoDB.",
  },
  consumes: ["application/json"],
  produces: ["application/json"],
  servers: [
    {
      url: "https://ewallet-api.onrender.com/api",
      description: "Main (production) server",
    },
    {
      url: "http://localhost:4000/api",
      description: "Development server",
    },
  ],
  tags: [
    { name: "Auth", description: "Authorization endpoints" },
    { name: "Users", description: "User endpoints" },
    { name: "Transactions", description: "Transactions endpoints" },
    { name: "Categories", description: "Categories endpoints" },
    { name: "Currency", description: "Exchange rate from Privat bank API" },
  ],
  securitySchemes: {
    Bearer: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/routes/api/*.js", "./src/models/*.js"],
};

const swaggerSpec = swaggerJSdoc(options);

module.exports = swaggerSpec;
