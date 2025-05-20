const {
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "adminPanel",
  filename: "remoteEntry.js",
  exposes: {
    "./AdminModule": "./src/app/app.ts",
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
    rxjs: { singleton: true, strictVersion: true, requiredVersion: "~7.8.0" },
  },
});
