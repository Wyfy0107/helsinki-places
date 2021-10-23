#!/bin/bash

sudo pm2 stop helsinki-places || true
sudo pm2 delete helsinki-places || true