# Use the latest Playwright image with the required version
FROM mcr.microsoft.com/playwright:v1.51.1-jammy

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install Playwright browsers 
RUN npx playwright install

# Copy the rest of the test files
COPY . .

# Run tests
CMD ["npx", "playwright", "test"]
