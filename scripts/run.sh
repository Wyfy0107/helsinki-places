#!/bin/bash

pwd=$PWD

cd $pwd/backend && yarn run start:dev &
cd $pwd/frontend-react && yarn run start