#!/bin/bash

set -e

if [ -z "$1" ]; then
  echo 'Provide an environment to deploy'
  exit 1
fi

REACT_APP_ASSET_REGISTER_API_URL=$API_URL_STAGING

if [ "$1" -eq "production" ]; then
  REACT_APP_ASSET_REGISTER_API_URL=$API_URL_PRODUCTION
fi

curl -L "https://packages.cloudfoundry.org/stable?release=linux64-binary&source=github" | tar -zx
./cf api https://api.cloud.service.gov.uk
./cf auth ${CF_USER} ${CF_PASSWORD}

./cf target -o ${CF_ORG} -s ${1}

./cf set-env asset-register-frontend-${1}-dark circle_commit ${CIRCLE_SHA1}
./cf set-env asset-register-frontend-${1}-dark REACT_APP_SENTRY_DSN ${SENTRY_DSN}
./cf set-env asset-register-frontend-${1}-dark REACT_APP_ASSET_REGISTER_API_URL ${REACT_APP_ASSET_REGISTER_API_URL}
./cf push -f deploy-manifests/${1}-dark.yml
