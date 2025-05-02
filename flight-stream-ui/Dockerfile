FROM ubuntu:latest
LABEL authors="santosh"

# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Build the app
RUN npm run build

# Install serve to serve static files
RUN npm install -g serve

# Expose port
EXPOSE 4173

# Start the app
CMD ["serve", "-s", "dist"]
ENTRYPOINT ["top", "-b"]