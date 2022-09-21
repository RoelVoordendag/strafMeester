#=====================================================
# Build Stage (1/2)
#=====================================================

#
# Define OS
#
FROM alpine:3.15 AS build

#
# Basic OS management
#

# Install packages
RUN apk add --no-cache nodejs npm

#
# Require app
#

# Create app directory
WORKDIR /app

# Bundle package.json and package-lock.json
COPY ./package.json ./package-lock.json ./

# Install dependencies
RUN npm ci && npm cache clean --force

# Bundle application source
COPY . .

# Create a production build
RUN npm run build

#=====================================================
# Build Stage (2/2)
#=====================================================

#
# Define OS
#
FROM alpine:3.15 AS build-prod

#
# Basic OS management
#

# Install packages
RUN apk add --no-cache nodejs npm

#
# Require app
#

# Create app directory
WORKDIR /app

# Bundle package.json and package-lock.json
COPY ./package.json ./package-lock.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

#=====================================================
# Image Stage
#=====================================================

#
# Define OS
#
FROM alpine:3.15

#
# Basic OS management
#

# Install packages
RUN apk add --no-cache nodejs

#
# Require app
#

# Create app directory
WORKDIR /app

#
# Setup app
#

# Set node env
ENV NODE_ENV=production
ENV CONFIG_DIR=/

# Expose the app port
EXPOSE 3000

# Setup healthcheck
HEALTHCHECK --interval=10s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/_health || exit 1

# Run app on container start
CMD ["node", "/app/src/server.js"]

#
# Bundle app
#

# Bundle from build image
COPY --from=build-prod /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY --from=build /app/src/config/. ./build
