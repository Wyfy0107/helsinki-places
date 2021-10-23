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

[[ ! -d /home/ubuntu/app ]] && mkdir /home/ubuntu/app

cd /home/ubuntu
wget https://aws-codedeploy-eu-north-1.s3.eu-north-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto > /tmp/logfile