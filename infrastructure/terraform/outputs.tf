data "template_file" "starter_inventory" {
  template = file("${path.module}/templates/starter_inventory.tpl")

  vars = {
    starter_ip = digitalocean_droplet.starter.ipv4_address
  }
}

resource "local_file" "starter_inventory_file" {
  content  = data.template_file.starter_inventory.rendered
  filename = "${path.module}/../host/inventory"
}

data "template_file" "jenkins_inventory" {
  template = file("${path.module}/templates/jenkins_inventory.tpl")

  vars = {
    jenkins_ip = digitalocean_droplet.jenkins.ipv4_address
  }
}

resource "local_file" "jenkins_inventory_file" {
  content  = data.template_file.jenkins_inventory.rendered
  filename = "${path.module}/../jenkins/inventory"
}

data "template_file" "ci_cd_inventory" {
  template = file("${path.module}/templates/ci_cd_inventory.tpl")

  vars = {
    starter_ip = digitalocean_droplet.starter.ipv4_address
  }
}

resource "local_file" "ci_cd_inventory_file" {
  content  = data.template_file.ci_cd_inventory.rendered
  filename = "${path.module}/../jenkins/sensitive/inventory"
}
