# Use the official Node.js image.
FROM node:18

# Set the working directory for the backend
WORKDIR /usr/src/app

# Copy backend package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the backend files
COPY . .

# Build the frontend
RUN npm run build

# Copy the built frontend files to the public directory
RUN cp -r .next/static/* public/

# Expose the port the app runs on (8080 for Cloud Run)
EXPOSE 8080

# Run the backend server
CMD ["node", "server.js"] 