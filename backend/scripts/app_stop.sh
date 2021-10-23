#!/bin/bash

pm2 delete helsinki-places  >& /dev/null || echo "no pm2 process running"