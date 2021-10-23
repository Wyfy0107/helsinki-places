#!/bin/bash

# aws deploy push \
# --application-name MyHelsinkiServer \
# --description "helsinki-places backend revision" \
# --ignore-hidden-files \
# --s3-location s3://helsinki-places-production-app-revision/helsinki-places-server.zip \
# --source ../dist

aws deploy create-deployment \
--application-name MyHelsinkiServer \
--deployment-config-name CodeDeployDefault.OneAtATime \
--deployment-group-name MyHelsinkiDeploymentGroup \
--file-exists-behavior OVERWRITE \
--s3-location bucket=s3://helsinki-places-production-app-revision,key=helsinki-places-server.zip,bundleType=zip
