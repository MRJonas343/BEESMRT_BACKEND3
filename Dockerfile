FROM node

RUN curl -fsSL https://bun.sh/install | bash

ENV BUN_INSTALL="/root/.bun"
ENV PATH="${BUN_INSTALL}/bin:${PATH}"

RUN bun install pm2 -g

WORKDIR /home/beesmrtbackend

COPY package.json bun.lockb ./

RUN bun install

COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "start", "pm2.config.js"]
