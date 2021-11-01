#!/bin/bash

docker run -dp 6379:6379 --rm redis
cd $PWD/backend && yarn run test