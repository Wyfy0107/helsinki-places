#!/bin/bash

~/.yarn/bin/pm2 stop helsinki-places || true
~/.yarn/bin/pm2 delete helsinki-places || true