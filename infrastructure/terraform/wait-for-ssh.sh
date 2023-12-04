#!/bin/bash

HOST=$1
RETRIES=30
DELAY=10

until ssh -o "ConnectTimeout=3" -o "StrictHostKeyChecking=no" root@$HOST "echo SSH ready"; do
   echo "Waiting for SSH to be ready..."
   sleep $DELAY
   RETRIES=$((RETRIES-1))
   if [ $RETRIES -le 0 ]; then
      echo "Timeout waiting for SSH."
      exit 1
   fi
done
