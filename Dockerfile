# Dockerfile
FROM nginx:latest

# Instalar Git
RUN apt-get update && apt-get install -y git

# Clonar el repositorio
RUN git clone https://github.com/DOCKER-PAPELERIA/Frontend.git /usr/share/nginx/html

# Copiar archivo de configuración de Nginx (opcional)
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
