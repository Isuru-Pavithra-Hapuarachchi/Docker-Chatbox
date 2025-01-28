# Use a Node.js base image compatible with your app
FROM node:18-buster


RUN apt-get update && apt-get install -y \
    build-essential \
    python3

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application source code
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
