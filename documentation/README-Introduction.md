## Introduction
Starter Architecture is a custom web application software project that follows a well defined and standardized technology stack and architectural principles.

## Folder Structure

The folder structure of the components is the following:

**infrastructure**
 **dev_env** (Docker Compose)
 **ci_cd** (Jenkins Pipeline, Docker Compose Build Environment, Ansible Deployment Playbook)
 **host** (Ansible Provisioning Playbook)
 **jenkins** (Ansible Provisioning Playbook)
 **terraform** (Terraform Cold Start)

**app**
 **api** (Laravel API)
 **client**
  **admin** (Vue SPA Admin Panel)
  **public** (Nuxt SSR Public Web)

### 1 - Development Environment
#### Folder: infrastructure/dev_env

Approach: Containerization
Technologies: Docker Compose
Syntax: YAML
Language: Go


### 2 - Back-end API
#### Folder: app/api

Approach: S.O.L.I.D Principles
Technologies: Laravel
Syntax: Object-Oriented design (OOD)
Language: PHP


### 3 - Front-end Single Page Application
#### Folder: client/admin

Approach: Composition API
Technologies: VueJs
Syntax: Typescript
Language: Javascript

### 4 - Front-end Server Side Rendering Application
#### Folder: client/public

Approach: Composition API
Technologies: Nuxt
Syntax: Typescript
Language: Javascript

### 5 - Server Provisioning for Host Server
#### Folder: infrastructure/host

Approach: Configuration Management
Technologies: Ansible
Syntax: YAML
Language: Python 

### 6 - Server Provisioning for Jenkins Server
#### Folder: infrastructure/jenkins

Approach: Configuration Management
Technologies: Ansible
Syntax: YAML
Language: Python 

### 7 - Continuous Integration
#### Folder: infrastructure/ci_cd

Approach: Application Build in Dockerized Environment
Technologies: Jenkins / Docker
Syntax: Jenkinsfile
Language: Groovy

### 8 - Release Management
#### Folder: infrastructure/ci_cd/deploy

Approach: Zero Downtime Deployment
Technologies: Ansible
Syntax: YAML
Language: Python

### 9 - Infrastructure as Code
#### Folder: infrastructure/terraform

Approach: Cold Start
Technologies: Terraform
Syntax: HashiCorp Configuration Language (HCL)
Language: N/A (HCL is a domain-specific language for Terraform)

## Summary

Each of these sections contains key details about the various layers and components of the software project.
They together provide a comprehensive view of the development approach, technologies used, programming principles, and the environment setup.
It could serve as a reference for anyone starting a custom web development project that needs to scale.

### Integration and Interoperability

Our architecture seamlessly integrates two distinct frontend applications backed by a single backend API to provide a comprehensive user experience. This integrated approach allows us to maintain separation between administrative tasks and public-facing content delivery, ensuring a responsive and SEO-friendly web application for all users.

#### Admin Panel (Vue.js Single Page Application)

The integration of Laravel and Vue.js begins with Laravel serving as the foundation. Laravel bootstraps the Vue.js Single Page Application (SPA) by providing the essential web routes, including user authentication and authorization mechanisms. Admin users benefit from a feature-rich Admin Panel built using Vue.js. This panel, hosted within the same domain as the Laravel API, offers an intuitive interface for managing and overseeing various aspects of the application.

#### Public Content (Nuxt Server Side Rendering)

Recognizing the importance of a distinct, public-facing interface, we've provisioned a separate front-end built on Nuxt, leveraging server-side rendering (SSR). Nuxt, powered by Node.js and managed by pm2, optimizes content delivery for public users. This architecture not only provides swift and efficient content rendering but also excels in search engine optimization (SEO). The Nuxt SSR application utilizes the Laravel application as an API, ensuring data consistency and efficient communication between the frontend and backend.

#### Infrastructure (Docker, Terraform, Ansible, Jenkins)

Our infrastructure seamlessly integrates with the application layers. For local development, Docker Compose is employed to create a Dockerized environment consisting of Apache/PHP, MySQL, Node.js, and Redis containers. This environment closely mirrors our production setup, ensuring consistency during development.

On live servers, Terraform orchestrates the creation and configuration of servers and DNS records. Ansible Playbooks are then used for provisioning these servers. Two servers are created: one hosts the application, while the other, a Jenkins server, manages our CI/CD processes. The Jenkins server is tightly integrated with GitHub, automating the creation of multipipeline jobs. Each project defines its pipelines, including a Dockerized build environment via Docker Compose. These pipelines manage the build stage and incorporate Ansible Playbooks for zero downtime deployments and rollback mechanisms in case of failures.
