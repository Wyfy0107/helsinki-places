#!/bin/bash

cd /home/ubuntu/app
sudo pm2 start server.js -i 0 --name helsinki-places