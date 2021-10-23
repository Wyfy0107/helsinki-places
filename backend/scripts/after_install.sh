#!/bin/bash

cd /home/ubuntu/app
sudo yarn install

port=$(aws ssm get-parameters --with-decryption \
--names "/production/server/redis/port" "/production/server/redis/endpoint" \
--region eu-north-1 | jq ".Parameters[0].Value")

endpoint=$(aws ssm get-parameters --with-decryption \
--names "/production/server/redis/port" "/production/server/redis/endpoint" \
--region eu-north-1 | jq ".Parameters[1].Value")

cat > .env <<EOF
PORT=${port}
ENDPOINT=${endpoint}
EOF