
# NOTE TAKER APP

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
- **`nodemon`** - 
- **`jshint`** - 
- **`prettier`** - 


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
