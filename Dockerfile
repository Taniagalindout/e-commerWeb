# Establece la imagen base de Node.js
FROM node:14-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Construye la aplicación React
RUN npm run build

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
