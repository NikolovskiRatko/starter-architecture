## CI/CD Environment

This guide covers the Jenkins-based CI/CD setup used in `infrastructure/ci_cd`.

## Overview

The Jenkins server uses this environment to run the application build and deployment flow.

The CI/CD setup includes:

- a Jenkins pipeline definition
- a Docker-based build environment
- Ansible deployment playbooks
- release-based deployment with rollback support

## Jenkins Pipeline

The testing, build, and deployment stages are defined in:

```text
infrastructure/ci_cd/Jenkinsfile
```

## Build Environment

The build environment is defined in:

```text
infrastructure/ci_cd/build
```

It uses Docker Compose to provide a reproducible build environment for the application.

## Deployment Playbook

The deployment playbooks and release tasks are located in:

```text
infrastructure/ci_cd/deploy
```

These playbooks handle release creation, symlink updates, migrations, PM2 process management, and rollback in case of failure.

## Sensitive Files

Create a `sensitive` folder in:

```text
infrastructure/ci_cd/deploy
```

Add the following files, each containing a single value:

- `domain_name`
- `root_dir`

## Notes

- This CI/CD setup is intended for the broader `infrastructure` workflow and is designed to be used by Jenkins.
- Application builds are performed in the Docker-based build environment and deployed using Ansible.
