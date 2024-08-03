import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express Swagger API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
  },
  apis: ["./apps/api/src/routes/**/*.ts", "./*.js"], // Path to the API routes containing JSDoc comments
};

export const specs = swaggerJsdoc(options);
