#!/bin/bash
exec > >(sudo tee /var/log/user-data.log) 2>&1

sudo apt-get update
sudo apt install -y ruby-full
sudo apt install -y wget
sudo apt install -y stress-ng
wget https://aws-codedeploy-eu-north-1.s3.eu-north-1.amazonaws.com/latest/install
cd /home/ubuntu
chmod +x ./install
sudo ./install auto > /tmp/logfile

curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
sudo apt update
sudo apt -y install nodes
sudo npm i -g pm2 

[[ ! -d /home/ubuntu/app ]] && mkdir /home/ubuntu/app