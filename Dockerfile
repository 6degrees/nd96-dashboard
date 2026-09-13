# =====================================================
# Stage 1: Dependencies
# =====================================================

FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci


# =====================================================
# Stage 2: Build
# =====================================================

FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

# =====================================================
# Next.js Environment
# =====================================================

ARG NEXT_PUBLIC_API_ENDPOINT
ARG NEXT_PUBLIC_REVERB_APP_KEY
ARG NEXT_PUBLIC_REVERB_HOST
ARG NEXT_PUBLIC_REVERB_PORT
ARG NEXT_PUBLIC_REVERB_SCHEME

ENV NEXT_PUBLIC_API_ENDPOINT=$NEXT_PUBLIC_API_ENDPOINT
ENV NEXT_PUBLIC_REVERB_APP_KEY=$NEXT_PUBLIC_REVERB_APP_KEY
ENV NEXT_PUBLIC_REVERB_HOST=$NEXT_PUBLIC_REVERB_HOST
ENV NEXT_PUBLIC_REVERB_PORT=$NEXT_PUBLIC_REVERB_PORT
ENV NEXT_PUBLIC_REVERB_SCHEME=$NEXT_PUBLIC_REVERB_SCHEME

# =====================================================
# Build
# =====================================================

RUN npm run build


# =====================================================
# Stage 3: Production
# =====================================================

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]