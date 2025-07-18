# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript project
RUN npm run build

# Expose port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]
