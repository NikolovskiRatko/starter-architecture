# Linux Prerequisites

## Prerequisites

Before you begin, ensure you have the following software installed on your Linux machine:

1. **Git:** Version control system to clone the repository.
2. **Make:** Utility to automate build tasks.
3. **Docker:** Platform for developing, shipping, and running applications inside containers.
4. **Docker Compose:** Tool for defining and running multi-container Docker applications.

### 1. Install Git

**Git** is essential for cloning repositories and managing version control.

- **Debian/Ubuntu-based Systems:**

  1. **Update Package List:**
     
     ```bash
     sudo apt-get update
     ```

  2. **Install Git:**
     
     ```bash
     sudo apt-get install git -y
     ```

  3. **Verify Installation:**
     
     ```bash
     git --version
     ```
     
     **Expected Output:**
     ```
     git version 2.x.x
     ```

- **Fedora:**

  1. **Install Git:**
     
     ```bash
     sudo dnf install git -y
     ```

  2. **Verify Installation:**
     
     ```bash
     git --version
     ```

- **Arch Linux:**

  1. **Install Git:**
     
     ```bash
     sudo pacman -S git
     ```

  2. **Verify Installation:**
     
     ```bash
     git --version
     ```

### 2. Install Make

**Make** is a build automation tool used to manage and maintain groups of programs and files.

- **Debian/Ubuntu-based Systems:**

  1. **Update Package List:**
     
     ```bash
     sudo apt-get update
     ```

  2. **Install Make and Build Essentials:**
     
     ```bash
     sudo apt-get install build-essential -y
     ```

  3. **Verify Installation:**
     
     ```bash
     make --version
     ```
     
     **Expected Output:**
     ```
     GNU Make 4.x.x
     ```

- **Fedora:**

  1. **Install Make and Development Tools:**
     
     ```bash
     sudo dnf groupinstall "Development Tools" -y
     ```

  2. **Verify Installation:**
     
     ```bash
     make --version
     ```

- **Arch Linux:**

  1. **Install Make:**
     
     ```bash
     sudo pacman -S make
     ```

  2. **Verify Installation:**
     
     ```bash
     make --version
     ```

### 3. Install Docker

**Docker** enables you to package applications into containers, ensuring consistency across environments.

- **Debian/Ubuntu-based Systems:**

  1. **Update Package List:**
     
     ```bash
     sudo apt-get update
     ```

  2. **Install Necessary Packages:**
     
     ```bash
     sudo apt-get install \
       apt-transport-https \
       ca-certificates \
       curl \
       gnupg \
       lsb-release -y
     ```

  3. **Add Docker’s Official GPG Key:**
     
     ```bash
     curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
     ```

  4. **Set Up the Stable Repository:**
     
     ```bash
     echo \
       "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
       $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
     ```

  5. **Update the Package List Again:**
     
     ```bash
     sudo apt-get update
     ```

  6. **Install Docker Engine:**
     
     ```bash
     sudo apt-get install docker-ce docker-ce-cli containerd.io -y
     ```

  7. **Verify Installation:**
     
     ```bash
     docker --version
     ```

- **Fedora:**

  1. **Set Up the Repository:**
     
     ```bash
     sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
     ```

  2. **Install Docker Engine:**
     
     ```bash
     sudo dnf install docker-ce docker-ce-cli containerd.io -y
     ```

  3. **Start and Enable Docker:**
     
     ```bash
     sudo systemctl start docker
     sudo systemctl enable docker
     ```

  4. **Verify Installation:**
     
     ```bash
     docker --version
     ```

- **Arch Linux:**

  1. **Install Docker:**
     
     ```bash
     sudo pacman -S docker
     ```

  2. **Start and Enable Docker:**
     
     ```bash
     sudo systemctl start docker
     sudo systemctl enable docker
     ```

  3. **Verify Installation:**
     
     ```bash
     docker --version
     ```

### 4. Install Docker Compose

**Docker Compose** is a tool for defining and running multi-container Docker applications.

- **Debian/Ubuntu-based Systems:**

  1. **Download the Latest Version of Docker Compose:**
     
     ```bash
     sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
     ```
     
     *Note: Replace `v2.20.2` with the latest version number from [Docker Compose Releases](https://github.com/docker/compose/releases).*

  2. **Apply Executable Permissions:**
     
     ```bash
     sudo chmod +x /usr/local/bin/docker-compose
     ```

  3. **Create a Symbolic Link (Optional):**
     
     ```bash
     sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
     ```

  4. **Verify Installation:**
     
     ```bash
     docker-compose --version
     ```
     
     **Expected Output:**
     ```
     docker-compose version 2.20.2, build xxxxxx
     ```

- **Fedora:**

  1. **Download Docker Compose:**
     
     ```bash
     sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
     ```

  2. **Apply Executable Permissions:**
     
     ```bash
     sudo chmod +x /usr/local/bin/docker-compose
     ```

  3. **Verify Installation:**
     
     ```bash
     docker-compose --version
     ```

- **Arch Linux:**

  1. **Install Docker Compose via AUR:**
     
     ```bash
     yay -S docker-compose
     ```
     
     *Note: Requires an AUR helper like `yay`. Install it if not already present.*

  2. **Verify Installation:**
     
     ```bash
     docker-compose --version
     ```