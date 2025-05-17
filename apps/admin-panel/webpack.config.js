const {
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "adminPanel",
  exposes: {
    "./Module": "./src/app/app.ts",
  },
  shared: {
    "@angular/core": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^20.0.0-next.0",
    },
    "@angular/common": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^20.0.0-next.0",
    },
    "@angular/router": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^20.0.0-next.0",
    },
    "@angular/forms": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^20.0.0-next.0",
    },
    rxjs: { singleton: true, strictVersion: true, requiredVersion: "~7.8.0" },
  },
});
