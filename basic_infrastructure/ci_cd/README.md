# Release Engineering Environment

The Jenkins server uses this Continuous Integration and Continuous Deployment (CI/CD) Environment.

## Jenkins Pipeline

The testing, build and deployment stages are defined in the **Jenkinsfile** in **infrastructure/ci_cd** folder

## Build Environment

Dockerized build environment via Docker Compose defined in **infrastructure/ci_cd/build** folder

## Deployment Playbook

Ansible Playbooks for zero downtime deployments and rollback mechanisms in case of failures defined in **infrastructure/ci_cd/deploy** folder

##NOTE: Create folder sensitive in deploy with the following files containing a single string:
domain_name
root_dir