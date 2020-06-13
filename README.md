# Notebook 📝

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/th92rodr/notebook?color=%237519C1">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/th92rodr/notebook">
  <img alt="Made by ThiagoRodrigues" src="https://img.shields.io/badge/made%20by-ThiagoRodrigues-%237519C1">
</p>

<p align="center">
  <a href="https://www.docker.com/"><img alt="" src="https://img.shields.io/badge/Docker-container-2496ED.svg?logo=docker"></a>
  <a href="https://www.postman.com/"><img alt="" src="https://img.shields.io/badge/Postman-API-FF6C37.svg?logo=Postman"></a>
</p>

## Stack

- API Server: <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-green.svg?logo=node.js" alt="Node.js"></a> / <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-green.svg?logo=node.js" alt="Express"></a>
- SPA App (Web Frontend): <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React.js-blue.svg?logo=react" alt="React.js"></a>
- API Architeture: `REST`
- Database: <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-47A248.svg?logo=mongodb" alt="MongoDB"></a>

## How To Run

### API Server

- Go to `server` directory:

```
cd server
```

- Run `docker-compose`:

```sh
docker-compose up
```

### SPA App (Web Frontend)

- Go to `web` directory:

```
cd web
```

- Install project dependencies:

```
npm i
```

- Start app:

The app will be running on port `3000`.

```
npm start
```

## Dependencies

### API Server

- **`express`**</br>
  Fast, unopinionated, minimalist web framework for node.</br>
  https://www.npmjs.com/package/express

- **`mongoose`**</br>
  ODM for MongoDB. It's a MongoDB object modeling tool designed to work in an asynchronous environment. Provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more.</br>
  https://www.npmjs.com/package/mongoose

- **`body-parser`**</br>
  Parse incoming request bodies in a middleware before the app's handlers. Able to parser requests in JSON format.</br>
  https://www.npmjs.com/package/body-parser

- **`jsonwebtoken`**</br>
  An implementation of JSON Web Tokens.</br>
  https://www.npmjs.com/package/jsonwebtoken

- **`bcrypt`**</br>
  A library to help you hash passwords.</br>
  https://www.npmjs.com/package/bcrypt

- **`dotenv`**</br>
  Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.</br>
  https://www.npmjs.com/package/dotenv

- **`express-validator`**</br>
  An express.js middleware for validator.</br>
  https://www.npmjs.com/package/express-validator

- **`helmet`**</br>
  Helmet helps you secure your Express apps by setting various HTTP headers.</br>
  https://www.npmjs.com/package/helmet

- **`morgan`**</br>
  HTTP request logger middleware for node.js.</br>
  https://www.npmjs.com/package/morgan

- **`redis`**</br>
  A high performance Node.js Redis client.</br>
  https://www.npmjs.com/package/redis

### Web Frontend

- **`react`**</br>
  React is a JavaScript library for creating user interfaces.</br>
  https://www.npmjs.com/package/react

- **`react-dom`**</br>
  This package serves as the entry point to the DOM and server renderers for React. It is intended to be paired with the generic React package, which is shipped as react to npm.</br>
  https://www.npmjs.com/package/react-dom

- **`react-router-dom`**</br>
  DOM bindings for React Router.</br>
  https://www.npmjs.com/package/react-router-dom

- **`styled-components`**</br>
  Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress.</br>
  https://www.npmjs.com/package/styled-components
