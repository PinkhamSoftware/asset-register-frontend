#!/bin/bash

set -e

if [ -z "$1" ]; then
  echo 'Provide an environment to deploy'
  exit 1
fi

ENVIRONMENT_NAME="$1"

if [ "${ENVIRONMENT_NAME}" == "production" ]; then
  APP_NAME="${ENVIRONMENT_NAME}-dark"
  REACT_APP_ASSET_REGISTER_API_URL="${API_URL_PRODUCTION}"
  DISPLAY_UPLOAD=no
else
  APP_NAME="${ENVIRONMENT_NAME}"
  REACT_APP_ASSET_REGISTER_API_URL="${API_URL_STAGING}"
  DISPLAY_UPLOAD=yes
fi

curl -L "https://packages.cloudfoundry.org/stable?release=linux64-binary&source=github" | tar -zx
./cf api https://api.cloud.service.gov.uk
./cf auth "${CF_USER}" "${CF_PASSWORD}"

./cf target -o "${CF_ORG}" -s "${ENVIRONMENT_NAME}"

./cf set-env "asset-register-frontend-${APP_NAME}" circle_commit "${CIRCLE_SHA1}"
./cf set-env "asset-register-frontend-${APP_NAME}" REACT_APP_SENTRY_DSN "${SENTRY_DSN}"
./cf set-env "asset-register-frontend-${APP_NAME}" REACT_APP_ASSET_REGISTER_API_URL "${REACT_APP_ASSET_REGISTER_API_URL}"
./cf set-env "asset-register-frontend-${APP_NAME}" REACT_APP_DISPLAY_UPLOAD "${DISPLAY_UPLOAD}"
./cf set-env "asset-register-frontend-${APP_NAME}" REACT_APP_MAPS_API_KEY "${MAPS_API_KEY}"
./cf set-env "asset-register-frontend-${APP_NAME}" REACT_APP_POSTCODE_API_URL "${POSTCODE_API_URL}"

./cf push -f "deploy-manifests/${APP_NAME}.yml"
