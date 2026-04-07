# Multi-stage build for Next.js 14
FROM node:20-alpine AS builder

WORKDIR /app

# Set build-time environment for proper dependency installation
ENV NODE_ENV=development

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.js ./

# Install all dependencies (including devDependencies needed for build)
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build Next.js app
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy only necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

# Install production dependencies only
ENV NODE_ENV=production
RUN npm install --production --legacy-peer-deps && \
    npm cache clean --force

ENV NEXT_TELEMETRY_DISABLED=1

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})" || exit 1

# Switch to non-root user
USER nextjs

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["node_modules/.bin/next", "start"]
