# Smartypants

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

## Development app

To run the dev app:

```
export NODE_OPTIONS=--openssl-legacy-provider
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### ngrok hosting
To host the development app on ngrok:

```
ngrok http 4200 --domain ace-wallaby-aware.ngrok-free.app --host-header="localhost:4200"
```

(see the reason for [--host-header](https://stackoverflow.com/questions/45425721/invalid-host-header-when-ngrok-tries-to-connect-to-react-dev-server))

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
