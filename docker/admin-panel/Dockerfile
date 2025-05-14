# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY angular.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build:admin

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist/apps/admin-panel/browser /usr/share/nginx/html

# Copy nginx configuration
COPY docker/admin-panel/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 