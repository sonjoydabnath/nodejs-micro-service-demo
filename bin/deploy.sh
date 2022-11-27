#!/usr/bin/env bash

set -e

kubectl apply -f infra/k8s/post-depl.yaml
kubectl apply -f infra/k8s/comments-depl.yaml
kubectl apply -f infra/k8s/query-depl.yaml
kubectl apply -f infra/k8s/moderation-depl.yaml
kubectl apply -f infra/k8s/event-bus-depl.yaml
kubectl apply -f infra/k8s/client-depl.yaml
kubectl apply -f infra/k8s/ingress-srv.yaml