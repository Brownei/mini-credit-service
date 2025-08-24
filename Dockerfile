# Base image
FROM node:21-alpine

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN pnpm install

# Bundle app source
COPY . .
COPY .env .env

# Creates a "dist" folder with the production build
RUN pnpx prisma generate
RUN pnpx prisma db push
RUN pnpm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
# CMD ["npm", "run", "start"]
CMD ["node", "dist/main"]

