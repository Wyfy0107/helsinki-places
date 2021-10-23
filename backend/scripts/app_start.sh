#!/bin/bash

cd /home/ubuntu/app
~/.yarn/bin/pm2 start server.js -i 0 --name helsinki-places