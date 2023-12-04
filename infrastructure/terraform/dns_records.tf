# Domain for thestarter.net
resource "digitalocean_domain" "starter_domain" {
  name       = "thestarter.net"
  ip_address = digitalocean_droplet.starter.ipv4_address
}

# CNAME record for www.thestarter.net
resource "digitalocean_record" "starter_www_cname" {
  domain = digitalocean_domain.starter_domain.name
  type   = "CNAME"
  name   = "www"
  value  = "${digitalocean_domain.starter_domain.name}."
  ttl    = 3600
}

# Domain for jenkins.thestarter.net
resource "digitalocean_domain" "jenkins_domain" {
  name       = "jenkins.thestarter.net"
  ip_address = digitalocean_droplet.jenkins.ipv4_address
}

# CNAME record for www.jenkins.thestarter.net
resource "digitalocean_record" "jenkins_www_cname" {
  domain = digitalocean_domain.jenkins_domain.name
  type   = "CNAME"
  name   = "www"
  value  = "${digitalocean_domain.jenkins_domain.name}."
  ttl    = 3600
}
