import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.4',
    info: {
      title: '2025',
      version: '1.0.0',
      description: '2025.08.01 - 2025.08.17',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: '로컬 서버',
      },
      {
        url: 'https://api.myproject.com',
        description: '원격 서버',
      },
    ],
  },

  apis: ['./src/*/*.docs.yaml'],
};

export const openapiSpecification = swaggerJsdoc(options);
