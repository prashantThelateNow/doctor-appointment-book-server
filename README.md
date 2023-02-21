# doctor-appointment-book

This is a doctor appointment book server application

# Scope of Project

The system need to be developed having feature listed above along with api's & user interfaces, which allows patients to book their appointment with doctors by selecting particular doctor from doctor list based on their availability as per timing mentioned, also doctors can see reports and accepts for appointment schedule of different patients

# Instructions to start project:

Go to project folder where package.json stay

### Install node and npm:

verify you have stable version of node and npm installed.

### Project Setup:

-   Install all project dependencies, which are required for our project.

```
npm install
```

### Start development server:

```
npm run start.
```

# Plugins:

The following plugins we are using right now:

### Prettier

We are using it for code formatting, for configuration please see `.prettierrc.json`

### eslint

We are using it for linting files, for configuration please see `eslintrc.json`

**Note**: we are recommending to use correponding editor plugin for better interactivity. i.e. linter plugin for static type checking, formatter plugin for auto formatting etc.

## Folder Structure

```
Consider following folder structure:

|
| main app 	| - node_modules
			| - src 				| - config
			| - .editorconfig		| - constants
			| - .env				| - controllers
			| - .eslintrc			| - middlewares
			| - .gitignore			| - models
			| - .prettierrc			| - routes
			| - package.json		| - services
			| - package-lock.json	| - utils
			| - README.md			| - validations
			| - main_router.js
			| - server.js
```
