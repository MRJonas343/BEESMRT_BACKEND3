FROM oven/bun:alpine AS base
WORKDIR /app

FROM base AS install
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

USER bun
EXPOSE 3000

ENTRYPOINT [ "bun", "run", "src/server.ts" ]
