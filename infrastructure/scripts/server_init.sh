#!/bin/bash
exec > >(sudo tee /var/log/user-data.log) 2>&1

sudo apt-get update
sudo apt-get -y upgrade

sudo apt-get install -y ruby-full
sudo apt-get install -y wget
sudo apt-get install -y stress-ng


curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
sudo apt -y install nodejs

sudo npm i -g yarn
sudo yarn global add pm2 

sudo apt-get -y install awscli
sudo apt-get -y install jq

port=$(aws ssm get-parameters --with-decryption \
--names "/production/server/redis/port" \
--region eu-north-1 | jq ".Parameters[0].Value" | xargs)

endpoint=$(aws ssm get-parameters --with-decryption \
--names "/production/server/redis/endpoint" \
--region eu-north-1 | jq ".Parameters[0].Value" | xargs)

[[ ! -d /home/ubuntu/app ]] && mkdir /home/ubuntu/app

cat > /home/ubuntu/app/.env <<EOF
REDIS_PORT=${port}
ENDPOINT=${endpoint}
EOF

cd /home/ubuntu
wget https://aws-codedeploy-eu-north-1.s3.eu-north-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto > /tmp/logfile