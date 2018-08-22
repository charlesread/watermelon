#!/usr/bin/env bash

docker build . --tag wcc
docker run -it --rm --privileged -p 8081:8080 --name wcc wcc
