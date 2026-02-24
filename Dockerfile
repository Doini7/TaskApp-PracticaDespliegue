FROM node:22 as base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM base AS dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS test
COPY . .
RUN npm run test

FROM test AS build
RUN npm run build

FROM nginx:latest AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
