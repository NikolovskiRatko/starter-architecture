[web]
starter ansible_host=${starter_ip} ansible_user=root

[all:vars]
private_key_file='/var/lib/jenkins/.ssh/id_rsa'
ansible_python_interpreter=/usr/bin/python3
ansible_connection=ssh
ansible_become=yes
ansible_become_method=sudo
ansible_become_user=root
ansible_ssh_common_args='-o StrictHostKeyChecking=no'
allow_world_readable_tmpfiles=True