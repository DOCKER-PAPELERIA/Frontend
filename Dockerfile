# Utiliza la imagen oficial de Nginx como imagen base
FROM nginx:alpine

# Copia los archivos estáticos de tu proyecto al directorio de Nginx
COPY . /usr/share/nginx/html

# Exponer el puerto en el que Nginx escucha
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
