# Base image
FROM node:21-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

COPY .env .env

RUN pnpx prisma generate
RUN pnpx prisma db push --force-reset

RUN pnpm run build

EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]

