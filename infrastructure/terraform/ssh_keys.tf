# Get key from local filesystem and create a DigitalOcean SSH key resource
resource "digitalocean_ssh_key" "my-ssh-key" {
  name       = "My SSH Key"
  public_key = file(var.ssh_key_path)
}

# Generate a new SSH key for jenkins user
resource "tls_private_key" "jenkins" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Save the private key to a file
resource "local_file" "private_key" {
  content  = tls_private_key.jenkins.private_key_pem
  filename = "${path.module}/../jenkins/sensitive/ssh_keys/id_rsa"
}

# Save the public key to a file
resource "local_file" "public_key" {
  content  = tls_private_key.jenkins.public_key_pem
  filename = "${path.module}/../jenkins/sensitive/ssh_keys/id_rsa.pub"
}

# Create a DigitalOcean SSH key resource
resource "digitalocean_ssh_key" "jenkins-ssh-key" {
  name       = "jenkins_key"
  public_key = tls_private_key.jenkins.public_key_openssh
}
