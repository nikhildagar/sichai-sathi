#!/bin/zsh
echo "Polling the API that give the POWER status of the PUMP"
# URL to poll
URL="https://sichaisathi.onrender.com/api/v1/pump"

# Interval between polls in seconds
INTERVAL=5

while true; do
  # Send a GET request using curl
  curl -s $URL
  echo "\n"
  # Wait for the specified interval before the next request
  sleep $INTERVAL
done

