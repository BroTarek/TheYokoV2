# Use Node 20 as base
FROM node:24.14.0-trixie-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

RUN ["npm", "run", "build"]

# Start the application
CMD ["npm", "run", "start"]
