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

# Go! (And keep going.)
CMD ["tail", "--follow", "/dev/null"]