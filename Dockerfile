FROM node:22-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy application files
COPY . .

# Build application
RUN npm run build

# Set up volume directory
RUN mkdir -p /app/data

EXPOSE ${APP_PORT}

CMD ["npm", "run", "start:dev"]