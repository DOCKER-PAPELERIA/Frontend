# Utiliza la imagen oficial de Nginx como imagen base
FROM nginx:alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/share/nginx/html

# Copia los archivos estáticos de tu proyecto al directorio de Nginx
COPY . .

RUN git clone https://github.com/DOCKER-PAPELERIA/Frontend.git ./frontend

# Exponer el puerto en el que Nginx escucha
EXPOSE 4000

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]

