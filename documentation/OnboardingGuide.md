# THESTARTER.NET

**Welcome to Starter Architecture**  
We’re so glad you are interested in adopting the Starter Architecture approach! This guide is meant to provide specific information to help you set up your machine and build the Starter Architecture project for the first time. 

## WHO WE ARE

### Our mission
Our mission is to provide developers with a streamlined and opinionated foundation for jumpstarting their projects using the Laravel and Vue.js stack. The Starter Architecture is an open-source enterprise solution designed to be ready out of the box, offering a fully integrated development environment that follows established industry best practices. By leveraging modern technologies such as Docker, Terraform, Ansible, and Jenkins, this architecture ensures consistency from development to deployment. With a strong focus on simplicity, scalability, and maintainability, the Starter Architecture adheres to coding standards across frontend, backend, and infrastructure layers. It enables developers to build robust, modular applications without having to reinvent the wheel—empowering teams to focus on the unique aspects of their projects while staying aligned with industry norms.

### The team
Our team brings together a diverse group of developers, each with their unique strengths and contributions to the Starter Architecture.

- **Ratko Nikolovski**: The initiator and creator of the Starter Architecture, Ratko is a seasoned Full Stack Developer with over a decade of experience in building robust web applications. His expertise in Laravel, Vue.js, and DevOps practices laid the foundation for this project, ensuring it follows industry best practices while being scalable and maintainable.  
  *LinkedIn:* [https://www.linkedin.com/in/ratko-nikolovski-5938586b/](https://www.linkedin.com/in/ratko-nikolovski-5938586b/)

- **Dimitar Pashovski**: A web designer turned frontend developer, Dimitar has contributed significantly to the frontend aspects of the Starter Architecture. His experience in Vue.js and Nuxt, combined with his attention to detail, has helped shape the user interface and performance optimization of the project.  
  *LinkedIn:* [https://www.linkedin.com/in/pashata/](https://www.linkedin.com/in/pashata/)

- **Jovan Dimovski**: A backend and frontend developer with strong expertise in Laravel and Nuxt.js, Jovan contributed to both the architecture and the development of complex features. His focus on performance optimization and CI/CD pipelines has been invaluable to the evolution of the project.  
  *LinkedIn:* [https://www.linkedin.com/in/jovan-dimovski-851905272/](https://www.linkedin.com/in/jovan-dimovski-851905272/)

- **Goran Stefanovski**: A full-stack developer with experience in Laravel and Vue.js, Goran has contributed to both front-end designs and backend API functionalities. His focus on maintaining responsiveness and seamless integration has been key to the project’s development.  
  *LinkedIn:* [https://www.linkedin.com/in/goranstefanovski/](https://www.linkedin.com/in/goranstefanovski/)

- **Stefan Ugrenovikj**: Stefan’s experience with Laravel and Vue.js has helped him make substantial contributions to both the frontend and backend of the project. His work on feature development and legacy code refactoring has strengthened the overall quality and functionality of the architecture.  
  *LinkedIn:* [https://www.linkedin.com/in/stefan-ugrenovikj-0a3661189/](https://www.linkedin.com/in/stefan-ugrenovikj-0a3661189/)

- **Aleksandra Mitrevska**: Specializing in frontend development, Aleksandra has been instrumental in ensuring responsive design and SEO optimization. Her skills in Nuxt and SCSS have helped enhance the project's user interface and accessibility.  
  *LinkedIn:* [https://www.linkedin.com/in/aleksandra-mitrevska-08b3131bb/](https://www.linkedin.com/in/aleksandra-mitrevska-08b3131bb/)

- **Bozidar Spirkovski**: Bozidar’s contributions as a web developer have enhanced the project's structure and quality. His strong adherence to SOLID principles and focus on database management and Vue.js have helped improve the project’s stability and scalability.  
  *LinkedIn:* [https://www.linkedin.com/in/bozidar-spirkovski-78391123a/](https://www.linkedin.com/in/bozidar-spirkovski-78391123a/)

Get to know your team by visiting our LinkedIn profiles!

> "We don't just code, we create—unless it’s Friday, then we’re mostly debugging."

---

## INSTALL UBUNTU OS

### Overview
In this tutorial, we will guide you through the steps required to install Ubuntu Desktop on your machine. You will need a laptop/PC and a USB flash drive of 12GB or above.

### Download the Ubuntu ISO
Go to the official Ubuntu website and download the version of Ubuntu you want to install (an .iso file).

### Create a Bootable USB (Linux version)
1. **Insert your USB drive**: Make sure it’s at least 12GB in size and ensure you’ve backed up any important data, as this process will erase the contents of the drive.  
2. **Open Startup Disk Creator**: Search for "Startup Disk Creator" in the Ubuntu application menu (you can press Super and type the name).  
3. **Select the Source ISO and Destination USB Drive**: In the Startup Disk Creator, choose the Ubuntu ISO file as the Source disk image. Select your USB drive as the Disk to use.  
4. **Click Make Startup Disk**: Confirm that you want to create the startup disk. The process will take a few minutes, depending on your USB speed.  

Once done, you can boot from the USB drive to install or try Ubuntu on another system.

### Create a Bootable USB (Windows version)
1. **Insert your USB drive**: Make sure it’s at least 12GB in size and ensure you’ve backed up any important data, as this process will erase the contents of the drive.  
2. **Download Rufus**: Go to the Rufus official website and download the latest version of Rufus. Rufus is a lightweight, free tool for creating bootable USB drives.  
3. **Open Rufus**: Open Rufus after downloading and installing it. You may need to give administrative permission to run the program.  
4. **Select USB Drive**: In Rufus, under the Device section, select the USB drive you inserted.  
5. **Select Ubuntu ISO**: Click Select next to the "Boot selection" field, and locate the Ubuntu .iso file you downloaded.  
6. **Start the Process**: Click Start to begin creating the bootable USB. Rufus will display a warning that all data on the USB drive will be destroyed. Confirm by clicking OK.  

Once done, you can boot from the USB drive to install or try Ubuntu on another system.

### Boot from USB flash drive
- Restart your computer and enter the BIOS/UEFI settings (usually by pressing a key like F1 for Thinkpad or F12, F2, F10, Del, or Esc during startup—this varies by manufacturer).  
- Change the boot order to prioritize the USB drive.  
- Save and exit the BIOS/UEFI settings. Your computer should now boot from the USB drive, and you can either try or install Ubuntu from there. *(Press F12 to enter boot menu)*

### Installation Setup
Next, you will be prompted to choose between the Normal installation and Minimal installation options. Choose **Normal installation**. In **Other options**, check both boxes and ensure you are able to remain connected to the internet throughout the installation.

### Disk Management Setup
This screen allows you to configure your installation. If you would like Ubuntu to be the only operating system on your device, select **Erase disk and install Ubuntu**. Select manual disk partitioning and remove all partitions. Here’s a suggested partitioning approach to start fresh:

- **EFI System Partition (/boot/efi):** 1 GB (FAT32).  
- **Root Partition (/):** 20 - 30 GB (ext4).  
- **Swap Partition:** 8 GB (or according to your system’s RAM).  
- **Home Partition (/home):** Remaining space (ext4, optional but recommended).

### Choose your Location
Select your location and timezone from the map screen and click **Continue**. This information will be detected automatically if you are connected to the internet.

### Create Login Details
On this screen, you will be prompted to enter your name and the name of your computer as it will appear on the network. Finally, you will create a username and a strong password.  
You can choose to log in automatically or require a password. If you are using your device whilst traveling, it’s recommended to keep automatic login disabled.

### Complete the Installation
Now sit back and enjoy the slideshow as Ubuntu installs in the background!  
Once the installation has completed, you will be prompted to restart your machine. Click **Restart Now**.  
When you restart, you will be prompted to remove your USB flash drive from the device. Once you’ve done this, press **ENTER**.

---

## MAIN TOOLS
> *All of the tools can be downloaded using the App Center.*

### Browser
**Downloading Google Chrome**  
Open your terminal either by using the `Ctrl+Alt+T` keyboard shortcut or by clicking on the terminal icon. Use `wget` to download the latest Google Chrome `.deb` package:

```shell
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
```

## Installing Google Chrome

When prompted, enter your user password, and the installation will start.  
At this point, you have Chrome installed on your Ubuntu system.

---

## Slack

**Installing Slack as a Deb Package**  
Visit the Slack for Linux download page and download the latest Slack `.deb` package.  
Once the download is complete, double-click the file, and the Ubuntu Software Center will open. To start the installation click on the **Install** button. You may be prompted to enter your user password.

---

## Skype

**Installing Skype with apt**  
Skype is available from the official Microsoft Apt repositories. To install it, follow the steps below:

Open your terminal and download the latest Skype `.deb` package using the following `wget` command:

```shell
wget https://go.skype.com/skypeforlinux-64.deb
```

## Installing Skype

Once the download is complete, install Skype by running the following command as a user with **sudo** privileges:

```shell
sudo apt install ./skypeforlinux-64.deb
```

# TERMINAL TOOLS

## Vim
Vim is an advanced and highly configurable text editor built to enable efficient text editing from the command line interface. You can install it by running the following commands from the terminal:

```shell
sudo apt update
sudo apt-get install vim
```

# TERMINAL TOOLS

## Curl
You can install **curl** by running:

```shell
sudo apt install curl
```
# Git

Git is the world’s most popular distributed version control system used by many open-source and commercial projects. It allows you to collaborate on projects with your fellow developers, keep track of your code changes, revert to previous stages, create branches, and more.

**Install Git** by running the following commands:

```shell
sudo apt install git
```

# One of the first things you need to do after installing Git

Git associates your identity with every commit you make.

To set your global commit name and email address, run the following commands:

```shell
git config --global user.name "Your Name"
git config --global user.email "youremail@yourdomain.com"
```

---

# Terminator
Terminator is a terminal emulator that allows you to split windows into multiple panes, making it a great choice for multitasking.

## Step-by-Step Installation

**Update the package list:**
```shell
sudo apt update
```

**Install Terminator:**
```shell
sudo apt install terminator
```

**Run Terminator:**  
After installation, you can launch Terminator from the terminal or the application menu:

```shell
terminator
```

---

# Install Zsh and Oh My Zsh

Zsh is a popular shell with many improvements over Bash, and Oh My Zsh makes managing and customizing Zsh easier.

## Step-by-Step Installation of Zsh

**Install Zsh:**
```shell
sudo apt install zsh
```

**Set Zsh as the default shell:**
```shell
chsh -s $(which zsh)
```
Log out and log back in for the change to take effect, or restart the terminal.

## Step-by-Step Installation of Oh My Zsh

Install Oh My Zsh using the following command:
```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

This will set up Oh My Zsh and back up any existing `.zshrc` configuration file.

### Install and Apply a Theme for Oh My Zsh

Oh My Zsh comes with a number of preinstalled themes, and you can also add custom themes from online repositories. One of the most popular themes is **Powerlevel10k**, which provides a highly customizable and fast Zsh prompt.

**Install Powerlevel10k**:  
To install the Powerlevel10k theme, clone its repository into the Oh My Zsh custom themes directory:

```shell
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

**Activate Powerlevel10k**:  
Open your `.zshrc` file to set the theme to Powerlevel10k:

```shell
vim ~/.zshrc
```

Find the line that says `ZSH_THEME=` and modify it to:

```shell
ZSH_THEME="powerlevel10k/powerlevel10k"
```

Apply the changes:

```shell
source ~/.zshrc
```

The first time you open a new terminal session, Powerlevel10k will automatically run a configuration wizard to guide you through customizing the appearance of your prompt.

### Install ZSH Plugins

- **zsh-autosuggestions**:

```shell
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

- **zsh-syntax-highlighting**:

```shell
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

Open the `~/.zshrc` file in your desired editor:

```shell
vim ~/.zshrc
```

Modify the plugins line to:

```shell
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

Load these new plugins:

```shell
source ~/.zshrc
```

---

# Docker

Docker is an open-source containerization platform that allows you to quickly build, test, and deploy applications as portable containers that can run virtually anywhere.

## Install Docker

### Step 1: Update Your Package List

```shell
sudo apt update
```

### Step 2: Install Required Packages

Docker requires a few packages to allow apt to use packages over HTTPS. Install these dependencies:

```shell
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

### Step 3: Add Docker’s Official GPG Key

```shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

### Step 4: Add the Docker Repository

```shell
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### Step 5: Update the Package List Again

```shell
sudo apt update
```

### Step 6: Install Docker

```shell
sudo apt install docker-ce
```

(**docker-ce** stands for Docker Community Edition.)

### Step 7: Check Docker Status

```shell
sudo systemctl status docker
```

You should see Docker running. If not, you can start Docker using:

```shell
sudo systemctl start docker
```

### Step 8: Enable Docker to Start at Boot (Optional)

```shell
sudo systemctl enable docker
```

### Step 9: Run Docker Without sudo (Optional)

By default, Docker requires sudo privileges to run. If you want to run Docker commands without needing sudo, you can add your user to the **docker** group:

```shell
sudo usermod -aG docker $USER
```

Log out and log back in, or use:

```shell
newgrp docker
```

Verify that Docker runs without sudo:

```shell
docker run hello-world
```

### Step 10: Test Docker Installation

Run a test Docker container to ensure everything is working correctly:

```shell
docker run hello-world
```

This command will download a test image and run a container, which outputs a confirmation message if Docker is installed correctly.

---

## Docker Compose

Docker Compose is a tool that allows you to run multi-container application environments based on definitions set in a YAML file.

### Install Docker Compose

**Step 1: Download the Latest Version of Docker Compose**  
Replace the version number in the URL with the latest from the Docker Compose releases page:

```shell
sudo curl -L "https://github.com/docker/compose/releases/download/v2.29.7/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

This command will download version **v2.29.7** of Docker Compose.

**Make Docker Compose Executable**:

```shell
sudo chmod +x /usr/local/bin/docker-compose
```

**Step 2: Verify the Installation**:

```shell
docker-compose --version
```

**Step 4: Create a Symlink (Optional):**  
If Docker Compose isn’t found after installation, you may need to create a symlink to `/usr/bin`:

```shell
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

---

# Ansible

Ansible is a suite of software tools that enables infrastructure as code. It is open-source, and the suite includes software provisioning, configuration management, and application deployment functionality.

## Install Required Dependencies

Make sure you have the necessary dependencies installed for managing repositories over HTTPS:

```shell
sudo apt install software-properties-common
```

## Add Ansible’s Official PPA (Personal Package Archive)

```shell
sudo add-apt-repository --yes --update ppa:ansible/ansible
```

## Install Ansible

```shell
sudo apt install ansible
```

## Verify the Installation

```shell
ansible --version
```

This will display the version of Ansible installed, confirming that it’s working properly.

## Run Your First Ansible Command

Now that Ansible is installed, you can run a simple Ansible command to test it. For example:

```shell
ansible localhost -m ping
```

If it’s working correctly, you should see a **SUCCESS** message.

---

# Terraform

Terraform is an infrastructure-as-code software tool created by HashiCorp. Users define and provide data center infrastructure using a declarative configuration language known as **HCL** (HashiCorp Configuration Language), or optionally JSON.

## Install Required Dependencies

```shell
sudo apt install -y gnupg software-properties-common curl
```

## Add the HashiCorp GPG Key

```shell
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
```

## Add the HashiCorp Repository

```shell
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
```

## Update and Install Terraform

```shell
sudo apt update
sudo apt install -y terraform
```

## Verify the Installation

```shell
terraform -version
```

---

# SSH Keys

## Generate new SSH keys

Secure Shell (SSH) is a network protocol for creating a secure connection between a client and a server. With SSH, you can run commands on remote machines, create tunnels, forward ports, and more.

To generate a new **4096 bits** SSH key pair with your email address as a comment, run:

```shell
ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"
```

## Adopt SSH Keys

1. **Create the .ssh directory** (if it doesn't exist already):
   ```shell
   mkdir -p ~/.ssh
   ```

2. **Copy the SSH keys to the .ssh directory**:  
   You can use the `cp` command to copy the entire `.ssh` folder or just specific files (like `id_rsa` and `id_rsa.pub`):
   ```shell
   cp /path/to/folder/.ssh/* ~/.ssh/
   ```

3. **Set the Correct Permissions**:
   ```shell
   chmod 700 ~/.ssh
   chmod 600 ~/.ssh/id_rsa
   chmod 644 ~/.ssh/id_rsa.pub
   ```

   If you have other key files like `known_hosts` or `authorized_keys`, you can adjust their permissions similarly:
   ```shell
   chmod 644 ~/.ssh/known_hosts
   chmod 644 ~/.ssh/authorized_keys
   ```

### Add SSH Keys to the SSH Agent

Once your SSH keys are in place, you can add them to the SSH agent so they are available when needed:

```shell
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

If your key has a different name, adjust the command to the appropriate file.

### Test Your SSH Connection

Now that your SSH keys are in place, you can test them by attempting to connect to a remote server (such as a Git repository or SSH server) that you previously connected to. For example, to test connecting to GitHub:

```shell
ssh -T git@github.com
```

You should see a message like:


```shell
Hi <username>! You've successfully authenticated, but GitHub does not provide shell access.
```


---

# DEVELOPMENT TOOLS

## PHPStorm

### Standalone installation
Download the tarball `.tar.gz`.  
Extract the tarball to a directory that supports file execution. For example, to extract it to the recommended `/opt` directory, run the following command *(this is the version number:242.23339.16. This will most likely be a different number so make sure to change it in the commands below)*:

```shell
sudo tar -xzf PhpStorm-242.23339.16.tar.gz -C /opt
```

Execute the **phpstorm** script from the extracted directory to run PhpStorm:

```shell
cd /opt/PhpStorm-242.23339.16/bin
./phpstorm
```

### Create a Shortcut (Optional)

Create a Symlink to Make PhpStorm Available Globally. You can create a symbolic link to the `phpstorm` script in `/usr/local/bin` so you can launch PhpStorm by simply typing `phpstorm` in the terminal:

```shell
sudo ln -s /opt/PhpStorm-242.23339.16/bin/phpstorm /usr/local/bin/phpstorm
```

**Ensure PhpStorm is Available in the Applications Menu**  
If you also want PhpStorm to appear in the Applications menu, you will need to make sure the desktop entry is created. Follow the instructions below:

1. Create the desktop entry file:
```shell
touch ~/.local/share/applications/phpstorm.desktop
vim ~/.local/share/applications/phpstorm.desktop
```

2. Add the following content to the `.desktop` file (replace `/path/to/phpstorm` with the actual installation path):
```shell
[Desktop Entry] Version=1.0 Type=Application Name=PhpStorm Comment=PHP IDE for Professional Development Exec=/opt/PhpStorm-242.23339.16/bin/phpstorm.sh Icon=/opt/PhpStorm-242.23339.16/bin/phpstorm.png Terminal=false Categories=Development;IDE;
```


3. Make the desktop entry executable:
```shell
chmod +x ~/.local/share/applications/phpstorm.desktop
```

4. Refresh the application menu:
```shell
update-desktop-database ~/.local/share/applications
```

---

## Sublime

Sublime Text is a powerful and versatile text editor used for coding, markup, and prose, renowned for its speed and extensive features.

### Install Necessary Dependencies

Install packages that allow apt to use repositories over HTTPS:

```shell
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
```

### Import the GPG Key

```shell
curl -fsSL https://download.sublimetext.com/sublimehq-pub.gpg | sudo gpg --dearmor -o /usr/share/keyrings/sublimehq-archive-keyring.gpg
```

### Add the Sublime Text Repository

```shell
echo "deb [signed-by=/usr/share/keyrings/sublimehq-archive-keyring.gpg] https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
```

### Update Package List

```shell
sudo apt update
```

### Install Sublime Text

```shell
sudo apt install -y sublime-text
```

---

## MySQL Workbench

MySQL Workbench is a unified visual tool for database architects, developers, and DBAs.

### Install MySQL Server

```shell
sudo apt install -y mysql-server
```

Run the security script to improve the security of your MySQL installation:

```shell
sudo mysql_secure_installation utility
```

Ensure that MySQL Server is running:

```shell
sudo systemctl status mysql
```

Optionally, enable MySQL Server to start on boot:

```shell
sudo systemctl enable mysql
```

**Enable UFW (uncomplicated firewall)**:

```shell
sudo ufw enable
```

To enable MySQL in UFW:

```shell
sudo ufw allow mysql
```

### Installing MySQL Workbench

1. **Download MySQL APT Repository Configuration Package**:
```shell
wget https://dev.mysql.com/get/mysql-apt-config_0.8.32-1_all.deb
```

2. **Install the Configuration Package**:
```shell
sudo dpkg -i mysql-apt-config_0.8.32-1_all.deb
```

3. **Update Package List**:
```shell
sudo apt update
```

4. **Install MySQL Workbench**:
```shell
sudo apt install -y mysql-workbench-community
```

---

# STARTER ARCHITECTURE

This is the link to the Git repository containing all of the code, all the separate segments have their respective updated README.md files that contain more specific information:  
[https://github.com/NikolovskiRatko/starter-architecture](https://github.com/NikolovskiRatko/starter-architecture)

Follow the Technology Guide for a more in-depth explanation of the architecture and its usage.

## Build Development Environment

### Create directory

First of all create a folder using your terminal by running the following commands:

```shell
cd ~
mkdir development
cd development
mkdir repositories
cd repositories
```

### Clone the project

Clone Starter Architecture Git repository:

```shell
git clone git@github.com:NikolovskiRatko/starter-architecture.git
```

### Configure the environment variables

Create environment variable files in the **infrastructure/dev_env** and **server/api** folders (use sample files as reference):

```shell
cp .env.sample .env
```

> **HINT**: The `pwd` command stands for print working directory. It is one of the most basic and frequently used commands in Linux. When invoked, the command prints the complete path of the current working directory.

Using PHPStorm or an IDE of your choice, edit the `.env` file and enter the values for **DB_PASSWORD** (the password that you chose when installing MySQL) and **DOCUMENT_ROOT** (the output of running the `pwd` command within the **server** folder).

### Create empty folders

In the **infrastructure/dev_env** folder run:

```shell
mkdir data
mkdir logs
```

### Build and start the docker containers

In the **dev_env** folder from the terminal first run:

```shell
docker-compose build
```

This might take a few minutes, when finished run:

```shell
docker-compose up -d
```

At this stage the docker containers should be running successfully and are ready to be used to build and serve the Starter web application.

### Test docker containers

In order to check if the docker containers are running properly, run:

```shell
docker ps
```

### Custom Domain Simulation

The `/etc/hosts` file on your Ubuntu system is a local configuration file that maps hostnames to IP addresses. When your computer tries to reach a domain name, it first checks this file before querying DNS servers. By adding entries to `/etc/hosts`, you can manually define how hostnames resolve, which is especially useful in development environments.

Adding **starter.test** allows you to simulate a real domain name for local applications. Append the dev domain name `'127.0.0.1 starter.test'` in `/etc/hosts`:

```shell
sudo vim /etc/hosts
```

---
# Automated Build
## Run using Makefile

1. Run all setup steps sequentially in the root folder of the project (cd user-login)

```shell
make full_setup
```

2. Start Vue.js development server for the Admin Panel SPA inside node container

```shell
make start_client_admin
```

3. Start Nuxt.js development server for the Public Content SSR app inside node container

```shell
make start_client_public
```

---

# Manual Build
## Build Laravel API

**Access a shell inside the PHP Docker container**  
For the Laravel API, start the **app** container by running:

```shell
docker exec -it app /bin/bash
```

Then in folder within the app container **server/api** run the following commands:

```shell
composer install && php artisan config:clear && php artisan view:clear && php artisan route:clear && composer dump-autoload && php artisan cache:clear && php artisan config:cache && php artisan route:cache
```

Run these commands to migrate and populate the database:

```shell
php artisan migrate:fresh && php artisan db:seed
```

---

## Build Vue.js Admin Panel

**Access a shell inside the Node Docker container**  
For the Vue.js Admin Panel SPA, start the **app** container by running:

```shell
docker exec -it node /bin/bash
```

First run the following command inside of **client/admin/starter-core/icons** to install starter core package icons:

```shell
npm install && npm run build
```

Then run the following command inside of **client/admin/starter-core/dash-ui** to install starter core package dash-ui:

```shell
npm install && npm run build:production
```

Then back in folder within the node container **client/admin**, run the following command to install the npm dependencies and build the Vue.js SPA for dev environment:

```shell
npm install && npm run dev
```

---

## Build Nuxt.js Public SSR

**Access a shell inside the Node Docker container**  
For the Nuxt.js Public SSR, start the **app** container by running:

```shell
docker exec -it node /bin/bash
```

Run the following command inside of **client/public** to install the npm dependencies and build the Nuxt.js SSR for dev environment:

```shell
npm install && npm run dev
```

---

# Test in browser

Finally visit the [http://starter.test/](http://starter.test/).

**HAPPY CODING!**
