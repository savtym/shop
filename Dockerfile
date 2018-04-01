FROM node:carbon

ENV PORT 8080
EXPOSE ${PORT}

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm i -D
RUN npm i -g db-migrate
RUN npm i -g db-migrate-pg
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
ADD config/database.json ./
ADD migrations ./migrations

#CMD [ "npm", "run", "server" ]
