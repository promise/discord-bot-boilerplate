FROM node:22-alpine@sha256:c29616372680176cc197fac55bde7f2a80723328c0838a901e960c3e6d570d4b AS base
RUN apk --no-cache add g++ gcc make python3

WORKDIR /app
ENV IS_DOCKER=true


# install prod dependencies

FROM base AS deps
RUN corepack enable pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod


# install all dependencies and build typescript

FROM deps AS ts-builder
RUN pnpm install --frozen-lockfile

COPY tsconfig.json ./
COPY ./src ./src
RUN pnpm run build


# production image

FROM base

COPY .env* ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=ts-builder /app/build ./build
COPY package.json ./

ENV NODE_ENV=production
ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
