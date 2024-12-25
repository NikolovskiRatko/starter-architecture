# macOS Prerequisites

## Prerequisites

Before you begin, ensure you have the following software installed on your macOS machine:

1. **Git:** Version control system to clone the repository.
2. **Make:** Utility to automate build tasks.
3. **Docker Desktop:** Platform for developing, shipping, and running applications inside containers.
4. **Docker Compose:** Tool for defining and running multi-container Docker applications.

### 1. Install Git

**Git** is essential for cloning repositories and managing version control.

- **Using Homebrew:**

  1. **Install Homebrew** (if not already installed):
     
     Open **Terminal** and run:
     
     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```

  2. **Install Git:**
     
     ```bash
     brew install git
     ```

  3. **Verify Installation:**
     
     ```bash
     git --version
     ```
     
     **Expected Output:**
     ```
     git version 2.x.x
     ```

- **Alternative Method:**

  1. **Install Xcode Command Line Tools:**
     
     Open **Terminal** and run:
     
     ```bash
     xcode-select --install
     ```

  2. **Verify Installation:**
     
     ```bash
     git --version
     ```

### 2. Install Make

**Make** is a build automation tool used to manage and maintain groups of programs and files.

- **Using Homebrew:**

  1. **Install Make:**
     
     ```bash
     brew install make
     ```

  2. **Verify Installation:**
     
     ```bash
     make --version
     ```
     
     **Expected Output:**
     ```
     GNU Make 4.x.x
     ```

### 3. Install Docker Desktop

**Docker Desktop** enables you to package applications into containers, ensuring consistency across environments.

1. **Download Docker Desktop:**
   
   Visit [docker.com](https://www.docker.com/products/docker-desktop) and download Docker Desktop for Mac.

2. **Install Docker Desktop:**
   
   Run the installer and follow the on-screen instructions.

3. **Launch Docker Desktop:**
   
   After installation, Docker Desktop should start automatically. If not, launch it manually from the Applications folder.

4. **Verify Installation:**
   
   Open **Terminal** and run:
   
   ```bash
   docker --version
   ```