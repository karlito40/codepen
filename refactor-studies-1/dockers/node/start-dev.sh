#!/bin/sh
echo "starting app...."

# cp /deps/pulsar-client /deps/micro/node_modules/pulsar-client
# cd /deps/micro && yarn link 

cd /deps/micro && yarn link pulsar-client && yarn link 
cd /app/backend && yarn link micro

/wait-for.sh nats:4222 -t 900 -- /wait-for.sh mongo:27017 -t 900 -- /wait-for.sh pulsar:6650 -t 900 -- supervisor --force-watch -w ./src/ -t -- ./src/index.js
