#!/bin/bash

cd /home/ubuntu/app
sudo yarn install
pm2 delete helsinki-places  >& /dev/null || true