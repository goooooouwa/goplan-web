# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

FROM node:16 AS builder

WORKDIR /app

COPY . .

# Setting up build args
ARG REACT_APP_API_SERVICE_BASE_URL
ARG REACT_APP_STORAGE_SERVICE_BASE_URL
ARG REACT_APP_REDIRECT_URI
ARG REACT_APP_SCOPE
ARG REACT_APP_CLIENT_ID

RUN npm install --omit=dev && npm run build

# nginx stage for serving content

FROM nginx

# Set our working directory inside the image
WORKDIR /app

COPY --from=builder /app/build .

# Copy Nginx config template
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]