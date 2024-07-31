# Utiliza la imagen oficial de Nginx como imagen base
FROM nginx:alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /HTML/index.html

# Copia los archivos estáticos de tu proyecto al directorio de Nginx
COPY . .

# Exponer el puerto en el que Nginx escucha
EXPOSE 4000

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
