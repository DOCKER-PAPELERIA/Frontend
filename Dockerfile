# Usa una imagen base que tenga Git instalado
FROM nginx:alpine

# Instala Git
RUN apk add --no-cache git

# Clona el repositorio desde GitHub
RUN git clone https://github.com/DOCKER-PAPELERIA/Frontend.git /usr/share/nginx/html

# Copia el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

# Expon los puertos que necesites
EXPOSE 4000

# El contenedor de Nginx por defecto ya hace un CMD para iniciar el servidor
