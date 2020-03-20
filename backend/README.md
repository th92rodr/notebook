
# NOTE TAKER APP

[![NodeJS](https://img.shields.io/badge/Node.JS-JS--runtime-green.svg?logo=node.js)](https://nodejs.org/en/)
[![Docker](https://img.shields.io/badge/Docker-container-blue.svg?logo=docker)](https://www.docker.com/)
[![Express](https://img.shields.io/badge/Express-framework-yellow.svg?logo=JavaScript)](https://expressjs.com/)
[![Postman](https://img.shields.io/badge/Postman-API--Dev-blue.svg?logo=Postman)](https://www.getpostman.com/)
[![Mongoose](https://img.shields.io/badge/MongoDB-database-green.svg?logo=MongoDB)](https://www.mongodb.com/what-is-mongodb)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


- **Framework**: `NodeJS` / `Express.js`
- **Architeture**: `REST`
- **Database**: `MongoDB`


## DEPENDENCIES

- **`express`** - work with HTTP requests and responses
- **`express-validator`** - 
- **`body-parser`** - able to parser requests in JSON format
- **`mongoose`** - library to connect to and manage a MongoDB database
- **`bcryptjs`** - library to encrypt the user's password (generating a hash for them)
- **`jsonwebtoken`** - 
- **`morgan`** - 
- **`dotenv`** - 
- **`chai`** - 
- **`chai-http`** - 
- **`mocha`** - 


## RUNNING THE APPLICATION

first install the project dependencies
```sh
npm install
```

then run it using `docker`
```sh
docker-compose up
```

### Run jshint

```sh
./node_modules/.bin/jshint <filename>.js
```

### Run prettier

```sh
npx prettier --config .prettierrc.js --write "**/**/*.js"
```

### Run eslint

```sh
npx eslint "**/**/*.js"
./node_modules/.bin/eslint "**/**/*.js"
```
