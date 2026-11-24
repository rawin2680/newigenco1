# ==========================================
# STAGE 1: Build Strapi TypeScript Admin
# ==========================================
FROM node:20-alpine AS build

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

ENV NODE_ENV=production
RUN npm run build

# ==========================================
# STAGE 2: Production Server
# ==========================================
FROM node:20-alpine

RUN apk update && apk add --no-cache vips-dev

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/config ./config
COPY --from=build /app/src ./src
COPY --from=build /app/public ./public
COPY --from=build /app/favicon.png ./favicon.png

EXPOSE 1337

CMD ["npm", "run", "start"]
