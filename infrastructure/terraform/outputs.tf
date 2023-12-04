data "template_file" "starter_inventory" {
  template = file("${path.module}/starter_inventory.tpl")

  vars = {
    starter_ip = digitalocean_droplet.starter.ipv4_address
  }
}

resource "local_file" "starter_inventory_file" {
  content  = data.template_file.starter_inventory.rendered
  filename = "${path.module}/../host/inventory"
}

data "template_file" "jenkins_inventory" {
  template = file("${path.module}/jenkins_inventory.tpl")

  vars = {
    jenkins_ip = digitalocean_droplet.jenkins.ipv4_address
  }
}

resource "local_file" "jenkins_inventory_file" {
  content  = data.template_file.jenkins_inventory.rendered
  filename = "${path.module}/../jenkins/inventory"
}
