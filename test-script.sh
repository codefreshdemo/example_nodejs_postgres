#!/usr/bin/env bash
wait_for_db() {
  nslookup postgres
  if ! nc -z postgres 5432; then
    echo "Waiting for db..."
    sleep 2
    wait_for_db
  fi
}

wait_for_db

cd /usr/src/app
npm install
npm test