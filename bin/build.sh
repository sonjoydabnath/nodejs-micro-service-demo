#!/usr/bin/env bash

set -e

cd client
npm run build
cd ../

echo "build: sonjoydabnath/client"
docker build -t sonjoydabnath/client ./client
echo "build: sonjoydabnath/posts"
docker build -t sonjoydabnath/posts ./posts
echo "build: sonjoydabnath/comments"
docker build -t sonjoydabnath/comments ./comments
echo "build: sonjoydabnath/query"
docker build -t sonjoydabnath/query ./query
echo "build: sonjoydabnath/moderation"
docker build -t sonjoydabnath/moderation ./moderation
echo "build: sonjoydabnath/event-bus"
docker build -t sonjoydabnath/event-bus ./event-bus

echo "push: sonjoydabnath/client"
docker push sonjoydabnath/client
echo "push: sonjoydabnath/posts"
docker push sonjoydabnath/posts
echo "push: sonjoydabnath/comments"
docker push sonjoydabnath/comments
echo "push: sonjoydabnath/query"
docker push sonjoydabnath/query
echo "push: sonjoydabnath/moderation"
docker push sonjoydabnath/moderation
echo "push: sonjoydabnath/event-bus"
docker push sonjoydabnath/event-bus
