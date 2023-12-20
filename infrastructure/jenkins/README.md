## Introduction
Ansible is a modern configuration management tool that facilitates the task of setting up and maintaining remote servers, with a minimalist design intended to get users up and running quickly. Ansible uses an inventory file to keep track of which hosts are part of your infrastructure, and how to reach them for running commands and playbooks.

This is an Ansible playbook for installing Redmine 4.0.5 with plugins on Ubuntu 18.04.

## Prerequisites

Before you work through this tutorial you need:

### 1. One Ansible Control Node
   The Ansible control node is the machine we’ll use to connect to and control the Ansible hosts over SSH. In our case this is the native Ubuntu environment where we:

#### An SSH keypair associated with your control node’s non-root user with sudo privileges

Useful resource (https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-20-04)

#### Install Ansible

Installation documentation here ( https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installation-guide )
also ( https://www.cyberciti.biz/faq/how-to-install-and-configure-latest-version-of-ansible-on-ubuntu-linux/ )

### 2. Ansible Host
   An Ansible host is any machine that your Ansible control node is configured to automate. The Ansible Host is essentially a remote Ubuntu 22.04 server that has the Ansible control node’s SSH public key added to the authorized_keys of a system user. This user can be either root or a regular user with sudo privileges.

####    1. Copy the inventory sample file and and edit the ip address of your Ansible Host.

Run this command in the ansible folder to test:
```shell
ansible-inventory -i inventory --list
```
Test the connection
```shell
ansible web -i inventory -m ping
```
Test the connection by running a playbook
```shell
ansible-playbook -i inventory test.yml
```
####    2. Add .yml files with the proper configs in the /vars folder

## Usage

To actually provision a LAMP environment, run the following playbook provided in the Starter Kit **infrastructure/jenkins** folder:
```shell
ansible-playbook -i inventory starter.yml
```
