# LetsHang #
## How to setup your environment ##
### Prerequistes ###
Before cloning this repository, you should first setup the dependencies on the machine or container that you will be using for development. Here are the items you should install:

- *NodeJS* Start with this. Go to the NodeJS website https://nodejs.org/en/ then download and install the appropriate version.
- *Vue* Install Vue using the NodeJS tool NPM. Run NPM from the OS command line, or in a VS Code terminal. The command is: 
```
npm install vue
```
- *Vue CLI* Vue has a companion command line interface that is installed separately. Again, use NPM for this. The command is: 
```
npm install --global vue-cli
```
- *Vue Router* Vue has two add-on components that are essential for apps. The first is vue-router. Install it using NPM with the command: 
```
npm install vue-router
```
- *Vuex* The second required add-on is Vuex. Install it with the following NPM command: 
```
npm install vuex --save
```
- *Vuetify* Vuetify provides the Material Design styling to the app. Install it with the NPM command: 
```
npm install vuetify --save
```

### Installing ###
After installing your components. Clone this repository into a folder on your development maching. The open and command line or terminal in that folder and type the command: 
```
npm install.
```

### Running the app ###
To run the app in your development environment, simply use the command: 
```
npm run dev
```

The "npm run dev" command will open your default browser to the URL http://localhost:9080 which should display the LetsHang landing page that requests you to sign-in.

### Using the WSL and Docker ###
One of the technology goals for this app is cloud platform independence. To achieve this, the app shall be developed and built on Linux and deployed to Docker containers. When the development machine is a Windows device, this can still be achieved by using the Windows Subsystem for Linux (WSL). The recommended distro is Ubuntu 18.x.

To use the WSL, first uninstall the Windows verion of NodeJS. The install both NodeJS and NPM from the WSL command prompt. It is best to restart the device after the uninstall. Use the following commands to install NodeJS and NPM:
```
$ sudo apt install nodejs
```

and

```
$ sudo apt install npm
```

When doing the first set up, consider uninstalling previous versions of Docker. Use the following command:
```
$ sudo apt-get remove docker docker-engine docker.io containerd runc
```

The steps for installing Docker are found at https://docs.docker.com/install/linux/docker-ce/ubuntu/. This has been tested using the __Install using the repository__ method. The commands are listed here:
```
$ sudo apt-get update
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

The next command has to be run from the root account. When using the WSL, switching to the root account is done with the following:
```
$ sudo su
```

Then continuing with the Docker install:
```
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ apt-key fingerprint 0EBFCD88
    
pub   rsa4096 2017-02-22 [SCEA]
      9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
uid           [ unknown] Docker Release (CE deb) <docker@docker.com>
sub   rsa4096 2017-02-22 [S]

$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

For safety, exit back to the original sudo account and continue:
```
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Ok. I am giving up on installing Docker on the WSL. I think that will have to wait to WSL 2.0. Until then I will continue with the instructions at this URL ... https://davidburela.wordpress.com/2018/06/27/running-docker-on-wsl-windows-subsystem-for-linux/
