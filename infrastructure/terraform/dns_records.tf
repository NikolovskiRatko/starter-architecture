# Domain for host server
resource "digitalocean_domain" "starter_domain" {
  name       = var.host_domain_name
  ip_address = digitalocean_droplet.starter.ipv4_address
}

# CNAME record for host server
resource "digitalocean_record" "starter_www_cname" {
  domain = digitalocean_domain.starter_domain.name
  type   = "CNAME"
  name   = "www"
  value  = "${digitalocean_domain.starter_domain.name}."
  ttl    = 3600
}

# Domain for jenkins server
resource "digitalocean_domain" "jenkins_domain" {
  name       = var.jenkins_domain_name
  ip_address = digitalocean_droplet.jenkins.ipv4_address
}

# CNAME record for jenkins server
resource "digitalocean_record" "jenkins_www_cname" {
  domain = digitalocean_domain.jenkins_domain.name
  type   = "CNAME"
  name   = "www"
  value  = "${digitalocean_domain.jenkins_domain.name}."
  ttl    = 3600
}
