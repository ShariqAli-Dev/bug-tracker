#!/bin/bash

echo What should the version be?
read VERSION

docker build -t shariqalidev/bug-tracker:$VERSION .
docker push shariqalidev/bug-tracker:$VERSION
cd && ssh -i DOKey root@147.182.129.81 
docker pull shariqalidev/bug-tracker:$VERSION && docker tag shariqalidev/bug-tracker:$VERSION dokku/ bt-api:$VERSION && dokku deploy bt-api $VERSION
