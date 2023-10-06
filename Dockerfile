
FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY ./ ./

EXPOSE 8000

CMD ["yarn", "test"]
