## CI/CD Environment

This guide describes the CI/CD setup used in `basic_infrastructure` for building and deploying a single Starter Architecture project from the local machine.

## Overview

The CI/CD flow includes:

- a local build script
- a Docker-based build environment
- an Ansible deployment playbook
- release-based deployment with rollback support

## Build Script

The testing, build, and deployment stages are defined in:

```text
basic_infrastructure/ci_cd/deploy.sh
```

## Build Environment

The local build process uses a Docker-based environment defined in:

```text
basic_infrastructure/ci_cd/build
```

## Deployment Playbook

The Ansible deployment playbooks and release tasks are located in:

```text
basic_infrastructure/ci_cd/deploy
```

These playbooks handle release creation, symlink updates, migrations, PM2 process management, and rollback in case of failure.

## Notes

- This CI/CD setup is intended for the single-project `basic_infrastructure` workflow.
- Application builds are performed from the local machine and deployed to the target server using Ansible.
