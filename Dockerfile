# Use the official Node.js image from Docker Hub
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json first to optimize layer caching
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .
COPY .env /app/.env


RUN npm run build

# Expose the port the app will run on
EXPOSE 8100

# Start the app
CMD ["npm", "start"]


