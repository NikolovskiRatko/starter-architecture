# Release Engineering Environment

Continuous Integration and Continuous Deployment (CI/CD) Environment using the local machine to perform the builds and deployments.

## Build Script

The testing, build and deployment stages are defined in the **deploy.sh** in **infrastructure/ci_cd** folder

## Build Environment

Dockerized build environment via Docker Compose defined in **infrastructure/ci_cd/build** folder

## Deployment Playbook

Ansible Playbooks for zero downtime deployments and rollback mechanisms in case of failures defined in **infrastructure/ci_cd/deploy** folder