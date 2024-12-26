# Technology Practices Manual

**Open Source Enterprise Solution**  
**STARTER ARCHITECTURE**  

## Development Environment
- **Back-end API**
- **Front-end SPA/SSR**
- **Server Provisioning**
- **Release Engineering**
- **Infrastructure as Code**

---

## 1. INTRODUCTION

### Purpose and Scope
[**PENDING** – content to be filled here]

### Audience
[**PENDING** – content to be filled here]

---

## 2. ARCHITECTURE OVERVIEW

### Technologies Used

1. **Terraform**  
   - **Purpose**: Infrastructure as Code (IaC) tool to provision and manage cloud resources and infrastructure  
   - **Language / Syntax**: HashiCorp Configuration Language (HCL)

2. **Ansible**  
   - **Purpose**: Configuration management, application deployment, and task automation  
   - **Language / Syntax**: YAML  

3. **Docker**  
   - **Purpose**: Containerization platform to package applications and their dependencies into containers  
   - **Benefit**: Ensures consistency and portability across environments

4. **Docker Compose**  
   - **Purpose**: Define and run multi-container Docker applications in a single YAML file  
   - **Benefit**: Simplifies management of complex, multi-service applications

5. **Jenkins**  
   - **Purpose**: CI/CD automation server  
   - **Language / Syntax**: Jenkinsfile (Groovy-based) for build, test, and deploy pipelines

6. **Laravel**  
   - **Purpose**: PHP framework for robust back-end APIs  
   - **Approach**: Object-Oriented Design (OOD), SOLID principles

7. **Vue.js**  
   - **Purpose**: Progressive JavaScript framework for building user interfaces (SPA)  
   - **Approach**: Composition API syntax in modern setups

8. **Nuxt**  
   - **Purpose**: Server-Side Rendering (SSR) framework based on Vue.js  
   - **Benefit**: SEO-friendly universal or isomorphic web apps

---

### Folder Structure

Public Github Repository: [Starter Architecture](https://github.com/NikolovskiRatko/starter-architecture)

```plaintext
basic_infrastructure/   # More suited for personal use on a single project
 ├─ ci_cd/              # Ansible Deployment using local machine
 ├─ host/               # Ansible Provisioning Playbook
 └─ terraform/          # Terraform Cold Start
 
infrastructure/         # More suited for multiple projects and environments
 ├─ dev_env/            # Docker Compose environment
 ├─ ci_cd/              # Jenkins Pipeline, Docker Compose Build Env, Ansible Deployment
 ├─ host/               # Ansible Provisioning Playbook
 ├─ jenkins/            # Ansible Provisioning Playbook
 └─ terraform/          # Terraform Cold Start

app/
 ├─ api/                # Laravel API
 └─ client/
    ├─ admin/           # Vue SPA Admin Panel
    └─ public/          # Nuxt SSR Public Web

```

---

### Integration and Interoperability

- **Admin Panel (Vue.js Single Page Application)**  
  - Uses Laravel as foundation, serving essential web routes (auth, etc.)  
  - Admin users manage everything via a Vue.js SPA

- **Public Content (Nuxt Server-Side Rendering)**  
  - Separate front-end based on Nuxt SSR  
  - Optimized for SEO, performance, Node.js + pm2, pulling data from the same Laravel API

- **Infrastructure (Docker, Terraform, Ansible, Jenkins)**  
  - **Local development**: Docker Compose for a consistent environment (Apache/PHP, MySQL, Node.js, Redis)  
  - **Production**: Terraform to create servers & DNS, Ansible to provision them  
  - Jenkins server integrated with GitHub → multipipeline jobs  
  - Docker Compose for build environment, Ansible for zero-downtime deployments

---

## 3. BEST PRACTICES AND STANDARDS

### Coding Standards

#### Frontend Coding Standards

1. **TypeScript**: Static typing for consistency, early error detection  
2. **Composition API**: Standalone functions representing Vue core capabilities, fosters reusability  
3. **Vue Patterns**:
   - Components: Encapsulated markup, logic, and styles  
   - Composables: Reusable logic via Composition API  
   - State Management: Pinia  
   - Provide/Inject: Data propagation throughout component tree without manual prop drilling  

4. **Global SASS Structure**:
   - Adopting the **7-1 Pattern** for SASS codebase organization

#### Backend Coding Standards

1. **Domain-Driven Design (DDD)**:
   - Separates Business Logic Layer (Services) from Data Access Layer (Repositories)  
   - Emphasis on SOLID principles

2. **Dependency Injection**:
   - Encourages modularity, easy testing

3. **Repository Pattern**:
   - Decouples business logic from data persistence

4. **Microservices-Ready**:
   - Each entity in Laravel has its own folder for Provider, Routes, Requests, Controllers, Services, Repositories, Models

#### Infrastructure Coding Standards

1. **Terraform**: Infrastructure as Code with HCL  
2. **Docker & Docker Compose**:
   - Consistent runtime across environments  
   - Organized folder structure, promoting clarity and reusability

#### Security Practices
[**PENDING** – content to be filled here]

#### Documentation Guidelines
[**PENDING** – content to be filled here]

---

## 4. IMPLEMENTATION WORKFLOW

### Development Flow

This outlines the local project setup.

#### Prerequisites
- Docker Compose  
- Git

#### Build Development Environment

1. **Clone the repository**:
   ```shell
   git clone git@github.com:esofstarter/starter-architecture.git
   ```
2. **Create environment variable files** in `infrastructure/dev_env` and `app/api` (use sample files)
3. **In `infrastructure/dev_env`, run**:
   ```shell
   docker compose build
   docker compose up -d
   ```

4. **Build the application in the containers**:

   - **Laravel API**  
     ```shell
     docker exec -it app /bin/bash
     ```
     Then inside `/app/api`:
     ```shell
     composer install && php artisan config:clear && php artisan view:clear && \
     php artisan route:clear && composer dump-autoload && php artisan cache:clear && \
     php artisan config:cache && php artisan route:cache
     php artisan migrate:fresh && php artisan db:seed
     ```

   - **Vue.js Admin Panel**  
     ```shell
     docker exec -it node /bin/bash
     ```
     Then inside `/app/client/admin`:
     ```shell
     npm install && npm run dev
     ```

   - **Nuxt Public Content SSR**  
     ```shell
     docker exec -it node /bin/bash
     ```
     Then inside `/app/client/public`:
     ```shell
     npm install && npm run dev
     ```

#### Testing Process
[**PENDING** – content to be filled here]

### Deployment Process

**Prerequisites**:  
1. Terraform  
2. Ansible

#### Cold Start Infrastructure as Code

1. **Create** DigitalOcean Personal Access Token:  
   [https://cloud.digitalocean.com/account/api/tokens](https://cloud.digitalocean.com/account/api/tokens)

2. **Clone** repository:
   ```shell
   git clone git@github.com:esofstarter/starter-architecture.git
   ```

3. **Create sensitive information** files:
   - For Terraform: `terraform.tfvars` in `infrastructure/terraform`  
   - For Host server: create folder `sensitive` in `infrastructure/host`  
   - For Jenkins server: create folder `sensitive` in `infrastructure/jenkins`

4. **Run Terraform** in `infrastructure/terraform`:
   ```shell
   terraform init
   terraform plan
   terraform apply
   ```

5. **Go to** `jenkins.thestarter.net` and login with `admin` user:
   ```shell
   admin
   (admin_password)
   ```

#### Monitoring and Logging
[**PENDING** – content to be filled here]

---

## 5. TROUBLESHOOTING AND ISSUE RESOLUTION

**Common Issues**  
[**PENDING** – content to be filled here]

**Debugging Techniques**  
[**PENDING** – content to be filled here]

---

## SPECIFICS

### Bootstrap VueJs SPA using Laravel

1. **Create a single Blade View** in `resources/views/app.blade.php`:
   - Ensure `<div id="app"></div>` for Vue mount

2. **Define web routes**:
   ```shell
   Route::get('/{any}', [HomeController::class, 'index'])->where('any', '.*');
   ```

### Asset Bundling

We use **Vite**:
- Offers faster dev experience  
- Over `app.blade.php`, we can load scripts with something like:
  ```shell
  @vite('src/app.ts')
  ```

### SPA Authentication

We can use **Laravel Sanctum**:
- Cookie-based session authentication  
- Provides CSRF protection, session-based auth  
- Keeps tokens out of local storage

### Routing and Components

- **Router**: define layout components, whether user must be authenticated, etc.  
- **Folder Structure**:
  - `layouts/`: AdminLayout.vue, AdminHeader.vue, AdminSidebar.vue, etc.  
  - `pages/`: one component per route/view  
  - `composables/`: logic extraction with Composition API  
  - `state/`: Pinia if needed

---

