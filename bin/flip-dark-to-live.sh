#!/bin/bash

set -e

if [ -z "$1" ]; then
  echo 'Provide an environment to deploy'
  exit 1
fi

APP_NAME=asset-register-frontend-${1}
APP_HOSTNAME=asset-register-frontend-${1}
DARK_APP_NAME=${APP_NAME}-dark
DARK_APP_HOSTNAME=${APP_NAME}-dark

curl -L "https://packages.cloudfoundry.org/stable?release=linux64-binary&source=github" | tar -zx
./cf api https://api.cloud.service.gov.uk
./cf auth ${CF_USER} ${CF_PASSWORD}

./cf target -o ${CF_ORG} -s ${1}

./cf map-route ${DARK_APP_NAME} ${CF_DOMAIN} -n ${APP_HOSTNAME}
./cf unmap-route ${APP_NAME} ${CF_DOMAIN} -n ${APP_HOSTNAME}

./cf map-route ${APP_NAME} ${CF_DOMAIN} -n ${DARK_APP_HOSTNAME}
./cf unmap-route ${APP_NAME}-dark ${CF_DOMAIN} -n ${DARK_APP_HOSTNAME}

./cf rename ${APP_NAME} ${APP_NAME}-temp
./cf rename ${APP_NAME}-dark ${APP_NAME}
./cf rename ${APP_NAME}-temp ${APP_NAME}-dark