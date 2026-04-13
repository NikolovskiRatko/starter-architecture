## Terraform Provisioning

This guide covers the Terraform-based infrastructure provisioning flow used in `infrastructure/terraform`.

## Prerequisites

Before using this setup, make sure you have the following installed locally:

- Terraform
- Ansible

## Provisioning Flow

### 1. Create a DigitalOcean Personal Access Token

Create a Personal Access Token in your DigitalOcean account:

```text
https://cloud.digitalocean.com/account/api/tokens
```

### 2. Create the Sensitive Configuration Files

For the Terraform project, create a `terraform.tfvars` file in:

```text
infrastructure/terraform
```

This file should contain the DigitalOcean access token and the paths to your SSH keys.

For the host provisioning layer, create a `sensitive` folder in:

```text
infrastructure/host
```

Add the following files, each containing a single value:

- `.env` — the environment file for the hosted Laravel back end
- `database_password`
- `domain_name`
- `supervisor_password`

For the Jenkins provisioning layer, create a `sensitive` folder in:

```text
infrastructure/jenkins
```

Add the following files, each containing a single value:

- `admin_password`
- `database_password`
- `domain_name`
- `github_access_token`

### 3. Run Terraform

From the `infrastructure/terraform` directory, run:

```shell
terraform init
terraform plan
terraform apply
```

## Jenkins Access

After provisioning and configuration are complete, open the Jenkins instance in the browser and log in with the `admin` user and the configured `admin_password`.

## Notes

- This setup is intended for the broader `infrastructure` workflow.
- Terraform is responsible for the initial infrastructure provisioning, while Ansible is used afterward to configure the provisioned hosts.
