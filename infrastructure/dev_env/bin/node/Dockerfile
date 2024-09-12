FROM node:18

WORKDIR /usr/app

ARG UID=1000
ARG GID=1000

# Update UID and GID in /etc/passwd and /etc/group
RUN sed -i "s/node:x:1000:1000/node:x:${UID}:${GID}/" /etc/passwd \
    && sed -i "s/node:x:1000:/node:x:${GID}:/" /etc/group

USER node

EXPOSE 3030