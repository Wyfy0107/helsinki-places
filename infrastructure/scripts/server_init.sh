#!/bin/bash

sudo apt-get update
sudo apt install -y ruby-full
sudo apt install -y wget
sudo apt install -y stress-ng
wget https://aws-codedeploy-eu-north-1.s3.eu-north-1.amazonaws.com/latest/install
cd /home/ubuntu
chmod +x ./install
sudo ./install auto > /tmp/logfile

[[ ! -d /home/ubuntu/app ]] && mkdir /home/ubuntu/app