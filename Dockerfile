FROM ubuntu:20.04

RUN apt update && apt-get install tmux curl -y

WORKDIR /var/www/html

# region - install node version manager (nvm)
RUN mkdir -p /data/lib
ENV NVM_DIR /data/lib
ENV NODE_VERSION 18.12.1
ENV NVM_INSTALLER $NVM_DIR/install.sh
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin

RUN curl -o $NVM_INSTALLER https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh && chmod +x $NVM_INSTALLER
RUN $NVM_INSTALLER

ENV PATH $NODE_PATH:$PATH
# region - install node version manager (nvm)

RUN npm install -g yarn

COPY ./yarn.lock .
COPY ./package.json .

RUN mkdir -p /data/yarn/cache

ENV PATH $PATH:/bin
