# Starter Droplet
resource "digitalocean_droplet" "starter" {
  image  = "ubuntu-22-04-x64"
  name   = "starter"
  region = "fra1"
  size   = "s-1vcpu-2gb"

  monitoring         = true

  # Use both the SSH key from the filesystem and the Jenkins SSH key
  ssh_keys = [
    digitalocean_ssh_key.my-ssh-key.fingerprint,
    digitalocean_ssh_key.jenkins-ssh-key.fingerprint
  ]
}

# Output the IP Address of Starter Droplet
output "starter_ip" {
  value = digitalocean_droplet.starter.ipv4_address
}

resource "digitalocean_droplet" "jenkins" {
  image  = "ubuntu-22-04-x64"
  name   = "jenkins"
  region = "fra1"
  size   = "g-2vcpu-8gb"
  monitoring = true

  # Use the generated SSH key for Jenkins
  ssh_keys = [digitalocean_ssh_key.my-ssh-key.fingerprint]
}

# Output the IP Address of Jenkins Droplet
output "jenkins_ip" {
  value = digitalocean_droplet.jenkins.ipv4_address
}

# Provision Jenkins with Ansible (After Starter and Jenkins are created)
resource "null_resource" "provision_jenkins" {
  depends_on = [digitalocean_droplet.starter, digitalocean_droplet.jenkins]

  # Provision with Ansible, passing the Starter IP Address
  provisioner "local-exec" {
    command = <<EOT
      bash ${path.module}/wait-for-ssh.sh ${digitalocean_droplet.jenkins.ipv4_address}
      ansible-playbook -i ${path.module}/../jenkins/inventory ${path.module}/../jenkins/starter.yml --extra-vars 'starter_ip=${digitalocean_droplet.starter.ipv4_address}' -vvv
    EOT  }
}

# Provision Starter with Ansible (After Starter and Jenkins are created)
resource "null_resource" "provision_starter" {
  depends_on = [digitalocean_droplet.starter, digitalocean_droplet.jenkins]

  provisioner "local-exec" {
    command = <<EOT
      bash ${path.module}/wait-for-ssh.sh ${digitalocean_droplet.starter.ipv4_address}
      ansible-playbook -i ${path.module}/../host/inventory ${path.module}/../host/starter.yml -vvv
    EOT
  }
}