# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:public:prod

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist/apps/public-panel/browser /usr/share/nginx/html
COPY docker/public-panel/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 