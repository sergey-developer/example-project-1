FROM node:14.15-alpine AS compile-image

WORKDIR /app
COPY  . .

#ENV NG_CLI_ANALYTICS=ci
RUN npm install yarn \
    && yarn install \
    && yarn build

FROM nginx
COPY --from=compile-image /app/build/ /usr/share/nginx/html
