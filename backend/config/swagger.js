const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restaurant QR Menu API",
      version: "1.0.0",
      description: "API documentation for Restaurant Menu, Categories, and Admin Authentication.",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"], // ✅ Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
