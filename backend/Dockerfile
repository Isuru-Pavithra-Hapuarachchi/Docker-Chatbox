# Use a Node.js base image compatible with your app
FROM node:18-buster

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Ensure SQLite3 binaries match the container architecture
RUN npm install --build-from-source sqlite3

# Copy the entire application source code
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
