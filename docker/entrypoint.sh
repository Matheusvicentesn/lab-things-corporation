#!/bin/bash

rm -r dist
rm -r node_modules
npm install
npm run migration:run
sleep 5s
npm run seed
npm run start:dev
