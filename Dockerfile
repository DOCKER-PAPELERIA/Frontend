# Utiliza la imagen oficial de Nginx como imagen base
FROM nginx:alpine

# Instalar Git
RUN apk add --no-cache git

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/share/nginx/html

# Clonar el repositorio
RUN git clone https://github.com/DOCKER-PAPELERIA/Frontend.git .

# Exponer el puerto en el que Nginx escucha
EXPOSE 4000

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]