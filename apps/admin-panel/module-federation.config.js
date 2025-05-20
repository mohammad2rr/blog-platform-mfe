const {
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "adminPanel",
  filename: "remoteEntry.js",
  exposes: {
    "./Module": "./src/app/app.ts",
  },
  shared: {
    "@angular/core": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^17.2.0",
    },
    "@angular/common": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^17.2.0",
    },
    "@angular/router": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^17.2.0",
    },
    "@angular/forms": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^17.2.0",
    },
    "@angular/material": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^17.2.0",
    },
    "@angular/cdk": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^17.2.0",
    },
    rxjs: {
      singleton: true,
      strictVersion: true,
      requiredVersion: "~7.8.0",
    },
    bootstrap: {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^5.3.0",
    },
    "@fortawesome/fontawesome-free": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^6.4.0",
    },
  },
});
