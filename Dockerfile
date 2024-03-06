# Step 1: Use an official Node.js runtime as a parent image
FROM node:21

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install dependencies
RUN yarn install

# Step 5: Bundle app source inside the Docker image
COPY . .

# Step 6: Your app binds to port 3000, so use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Step 7: Define the command to run your app
CMD ["npm", "run", "start:prod"]
