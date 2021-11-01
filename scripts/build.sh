#!/bin/bash

pwd=$PWD

cd $pwd/backend && yarn run build
cd $pwd/frontend-react && yarn run build