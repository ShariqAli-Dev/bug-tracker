#!/bin/bash

echo What should the version be?
read VERSION

docker build -t shariqalidev/bug-tracker:$VERSION .
docker push shariqalidev/bug-tracker:$VERSION
# cd && ssh -i DOKey root@146.190.215.95
# docker pull shariqalidev/bug-tracker:latest && docker tag shariqalidev/bug-tracker:latest dokku/bug:latest && dokku deploy bug latest
