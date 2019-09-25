# build your image from a node image
FROM node:12.10.0-alpine

# define where your code will be place inside container directories tree
WORKDIR /usr/app

# copy package.json to the container
# and install all your dependencies in the image
COPY package*.json ./
RUN npm install

# copy your source code to the container
COPY . .

# define which ports will be exposed
EXPOSE 5000

# inform the npm script to run the node server
CMD ["npm", "start"]
