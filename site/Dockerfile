# Gadopis landing page: static files served by nginx (deployed with Coolify;
# the container listens on port 80).
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html prywatnosc.html dyktowanie-windows-10.html 404.html styles.css app.js robots.txt sitemap.xml llms.txt favicon.ico /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
