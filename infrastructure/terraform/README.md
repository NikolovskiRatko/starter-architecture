##  Deployment Process

###  Prerequisites

1. Install Terraform and Ansible locally

###  Cold Start Infrastructure as Code

1. Create DigitalOcean Personal Access Token

https://cloud.digitalocean.com/account/api/tokens

2. Create sensitive information files.

For Terraform project create file **terraform.tfvars** in **infrastructure/terraform** with the DigitalOcean access token and the path to your ssh keys

For Host server create folder sensitive in **infrastructure/host** with the following files containing a single string:

**.env** (This is the .env file for the hosted Laravel backend)
**database_password**
**domain_name**
**supervisor_password**

For Jenkins server create folder sensitive in **infrastructure/jenkins** with the following files containing a single string:

**admin_password**
**database_password**
**domain_name**
**github_access_token**

3. In folder **infrastructure/terraform** run Terraform commands:
   
```shell
terraform init
```
```shell
terraform plan
```
```shell
terraform apply
```


Go to **jenkins.thestarter.net** and login with admin user

**admin**
**(admin_password)**