## Bootstrapping

### Cloning Repo
Run `git clone https://github.com/MaxiSuppes/hypechat-web.git`. It creates a folder called **hypechat-web**.
### Verifying node and npm versions
  1. Node 10.15.0
  2. Npm  6.4.1

### Installing packages
Run `npm install` in the project directory.

### Configuration
  1. In the project directory, create a new file called **.env.local** and copy on it the content of **.env.local.example**.
  2. In WebStorm, right-click on **src** folder and select **Mark Directory as Source root** option.

### Creating docker image
Run `docker image build -t react .`.
 
 
## Running the app

### With docker
#### `docker run -it react`
The docker image "react" should be created.

### Without docker
#### `npm start`
Runs the app in development mode.<br>
Open [localhost](http://localhost:3000) to see it in the browser.


## Testing

### `npm test`
Launches the test runner.


## Deployment

### `npm run build`
Builds the app for production to the **build** folder.<br>
It correctly bundles React in production mode and optimizes the build for a better performance.

The build is minified and the filenames include the hashes.


### With docker and heroku

`heroku login -i`

`heroku container:login`

`heroku container:push web --app hypechat-app`

`heroku container:release web --app hypechat-app`