# Imagen base con Node

FROM node:20-alpine

# Directorio de trabajo dentro del contenedor

WORKDIR /app

# Copiamos package.json y package-lock.json

COPY package*.json ./

#Instalamos dependencias

RUN npm install

# Copiamos el resto de código

COPY . . 

# Puerto que expone la app

EXPOSE 3000

# Comando para arrancar la app

CMD ["npm", "run", "dev"]