# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

FROM node:16 AS builder

WORKDIR /app

COPY . .

RUN npm install --omit=dev && npm run build

# nginx stage for serving content

FROM nginx

ENV SITE_ROOT /var/www/app

# Set our working directory inside the image
WORKDIR $SITE_ROOT

RUN rm -rf ./*

COPY --from=builder /app/build .

# Copy Nginx config template
COPY nginx.conf /tmp/docker.nginx

# substitute variable references in the Nginx config template for real values from the environment
# put the final config in its place
RUN envsubst '$SITE_ROOT' < /tmp/docker.nginx > /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]