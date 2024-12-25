# Windows Prerequisites

## Prerequisites

Before you begin, ensure you have the following software installed on your Windows machine:

1. **Git:** Version control system to clone the repository.
2. **Make:** Utility to automate build tasks.
3. **Docker Desktop:** Platform for developing, shipping, and running applications inside containers.
4. **Docker Compose:** Tool for defining and running multi-container Docker applications.

### 1. Install Git

**Git** is essential for cloning repositories and managing version control.

- **Using Chocolatey:**

  1. **Install Chocolatey:**
     
     Open **PowerShell** as Administrator and run the following command:
     
     ```powershell
     Set-ExecutionPolicy Bypass -Scope Process -Force; `
     [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; `
     iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
     ```

  2. **Install Git:**
     
     After installing Chocolatey, run:
     
     ```powershell
     choco install git -y
     ```

  3. **Verify Installation:**
     
     Open **Command Prompt** or **PowerShell** and run:
     
     ```bash
     git --version
     ```
     
     **Expected Output:**
     ```
     git version 2.x.x
     ```

- **Alternative Method:**

  1. **Download Git Installer:**
     
     Visit [git-scm.com](https://git-scm.com/download/win) to download the Git installer for Windows.

  2. **Install Git:**
     
     Run the installer and follow the on-screen instructions. You can choose default settings unless specific configurations are needed.

  3. **Verify Installation:**
     
     Open **Command Prompt** or **PowerShell** and run:
     
     ```bash
     git --version
     ```
     
     **Expected Output:**
     ```
     git version 2.x.x
     ```

### 2. Install Make

**Make** is a build automation tool used to manage and maintain groups of programs and files.

- **Using Chocolatey:**

  1. **Install Make:**
     
     Open **PowerShell** as Administrator and run:
     
     ```powershell
     choco install make -y
     ```

  2. **Verify Installation:**
     
     Open **Command Prompt** or **PowerShell** and run:
     
     ```bash
     make --version
     ```
     
     **Expected Output:**
     ```
     GNU Make 4.x.x
     ```

- **Alternative Method (Using Git Bash):**

  1. **Install Git for Windows:**
     
     Download and install Git for Windows from [gitforwindows.org](https://gitforwindows.org/).

  2. **Verify Make Availability:**
     
     Open **Git Bash** and run:
     
     ```bash
     make --version
     ```
     
     If Make is not available, consider using Chocolatey or [Scoop](https://scoop.sh/) to install Make.

### 3. Install Docker Desktop

**Docker Desktop** enables you to package applications into containers, ensuring consistency across environments.

1. **Download Docker Desktop:**
   
   Visit [docker.com](https://www.docker.com/products/docker-desktop) and download Docker Desktop for Windows.

2. **Install Docker Desktop:**
   
   Run the installer and follow the on-screen instructions. During installation, ensure that the **WSL 2** feature is enabled for better performance.

3. **Launch Docker Desktop:**
   
   After installation, Docker Desktop should start automatically. If not, launch it manually from the Start menu.

4. **Verify Installation:**
   
   Open **Command Prompt** or **PowerShell** and run:
   
   ```bash
   docker --version
   ```