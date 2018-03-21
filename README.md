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

The "npm run dev" command will open your default browser to the URL http://localhost:8080 which should display the LetsHang landing page that requests you to sign-in.