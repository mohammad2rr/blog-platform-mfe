const {
  withModuleFederation,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederation({
  name: "shell",
  remotes: {
    "admin-panel": "http://localhost:4201/remoteEntry.js",
    "user-panel": "http://localhost:4202/remoteEntry.js",
    "public-panel": "http://localhost:4203/remoteEntry.js",
  },
  exposes: {
    "./ShellComponent": "./apps/shell/src/app/app.component.ts",
  },
  shared: {
    "@angular/core": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^19.0.0",
    },
    "@angular/common": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^19.0.0",
    },
    "@angular/router": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^19.0.0",
    },
    "@angular/forms": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^19.0.0",
    },
    "@angular/animations": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^19.0.0",
    },
    "@angular/platform-browser": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^19.0.0",
    },
    "@angular/platform-browser-dynamic": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^19.0.0",
    },
    rxjs: { singleton: true, strictVersion: true, requiredVersion: "~7.8.0" },
    bootstrap: {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^5.3.0",
    },
    primeng: {
      singleton: true,
      strictVersion: true,
      requiredVersion: "^19.0.0",
    },
    "zone.js": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "~0.15.0",
    },
  },
});
