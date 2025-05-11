# Stage 1: Build the backend app
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json from the server directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port the app will run on
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
