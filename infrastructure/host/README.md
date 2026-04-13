## Host Provisioning

This guide covers the Ansible-based host provisioning setup used in `infrastructure/host`.

## Overview

Ansible is used to provision and configure target servers for the Starter Architecture infrastructure workflow. It uses an inventory file to define the hosts and connection details required to run playbooks over SSH.

## Prerequisites

Before using this setup, make sure you have the following:

### Ansible Control Node

The Ansible control node is the machine used to connect to and automate the target hosts over SSH. In this project, that is typically your local Ubuntu environment.

Requirements:

- an SSH key pair associated with your non-root user with sudo privileges
- Ansible installed locally

Useful resources:

- SSH key setup: `https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-20-04`
- Ansible installation: `https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installation-guide`
- Ubuntu-focused Ansible setup: `https://www.cyberciti.biz/faq/how-to-install-and-configure-latest-version-of-ansible-on-ubuntu-linux/`

### Ansible Host

The Ansible host is the remote server that will be provisioned. In this setup, it is typically an Ubuntu server that has the control node's SSH public key added to the `authorized_keys` of a system user with sufficient privileges.

## Verify the Setup

Edit the inventory file and set the IP address of your target host.

From the `infrastructure/host` directory, you can verify the setup with the following commands.

List the resolved inventory:

```shell
ansible-inventory -i inventory --list
```

Test connectivity:

```shell
ansible web -i inventory -m ping
```

Run the test playbook:

```shell
ansible-playbook -i inventory test.yml
```

## Provision the Host

To provision the server, run the main playbook from the `infrastructure/host` directory:

```shell
ansible-playbook -i inventory starter.yml
```

## Notes

- This setup is part of the broader `infrastructure` workflow.
- The host provisioning layer prepares the server with the dependencies and configuration required to run the Starter Architecture application stack.
- Versioning the Ansible configuration in Git helps keep the server setup reproducible and easier to maintain.
