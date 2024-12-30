# Image metadata and config.
# Ideally, the Node.js version should match what we use on CI.
FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

LABEL name="Angular dev environment" \
      description="This image can be used to create a dev environment for building Angular." \
      vendor="angular" \
      version="1.0"

EXPOSE 4000 4200 4433 5000 9876

# Switch to `root`.
USER root

# Install Google Chrome for Karma tests
RUN apt-get install -y wget
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \ 
      && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
RUN apt-get update && apt-get -y install google-chrome-stable


# Go! (And keep going.)
CMD ["tail", "--follow", "/dev/null"]