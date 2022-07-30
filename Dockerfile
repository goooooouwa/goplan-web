# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

FROM node:16 AS builder

WORKDIR /app

COPY . .

RUN npm install --omit=dev && npm run build

# nginx stage for serving content

FROM nginx

# Set our working directory inside the image
WORKDIR /app

COPY --from=builder /app/build .

# Copy Nginx config template
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]