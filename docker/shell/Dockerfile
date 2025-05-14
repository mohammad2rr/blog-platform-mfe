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
RUN npm run build:shell

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist/apps/shell/browser /usr/share/nginx/html

# Copy nginx configuration
COPY docker/shell/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 