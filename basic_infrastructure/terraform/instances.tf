# Starter Droplet
resource "digitalocean_droplet" "starter" {
  image  = "ubuntu-22-04-x64"
  name   = "starter"
  region = "fra1"
  size   = "s-1vcpu-2gb"

  monitoring         = true

  # Use the SSH key from the filesystem
  ssh_keys = [
    digitalocean_ssh_key.my-ssh-key.fingerprint
  ]

  # Wait for SSH to be available
  provisioner "remote-exec" {
    inline = [
      "echo 'SSH to starter droplet successful'"
    ]
    connection {
      host        = self.ipv4_address
      type        = "ssh"
      user        = "root"
      private_key = file(var.ssh_private_key_path)
      timeout     = "1m"
    }
  }
}

# Output the IP Address of Starter Droplet
output "starter_ip" {
  value = digitalocean_droplet.starter.ipv4_address
}

# Provision Starter with Ansible (After Starter is created)
resource "null_resource" "provision_starter" {
  depends_on = [digitalocean_droplet.starter]

  provisioner "local-exec" {
    command = "ansible-playbook -i ${path.module}/../host/inventory ${path.module}/../host/starter.yml --extra-vars 'is_terraform_run=true'"
  }
}