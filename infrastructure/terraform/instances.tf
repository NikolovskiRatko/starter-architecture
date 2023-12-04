resource "digitalocean_droplet" "starter" {
  image  = "ubuntu-22-04-x64"
  name   = "starter"
  region = "fra1"
  size   = "s-1vcpu-2gb"

  monitoring         = true

  ssh_keys = [digitalocean_ssh_key.my-ssh-key.fingerprint]
}

resource "digitalocean_droplet" "jenkins" {
  image  = "ubuntu-22-04-x64"
  name   = "jenkins"
  region = "fra1"
  size   = "g-2vcpu-8gb"
  monitoring = true
  ssh_keys = [digitalocean_ssh_key.my-ssh-key.fingerprint]
}

output "starter_ip" {
  value = digitalocean_droplet.starter.ipv4_address
}

output "jenkins_ip" {
  value = digitalocean_droplet.jenkins.ipv4_address
}