variable "do_token" {}
variable "ssh_key_path" {}
variable "ssh_private_key_path" {}
variable "host_domain_name" {}

terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

# Configure the DigitalOcean Provider
provider "digitalocean" {
  token = var.do_token
}