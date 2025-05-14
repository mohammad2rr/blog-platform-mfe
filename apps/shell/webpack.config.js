const {
  withModuleFederation,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederation({
  name: "shell",
  exposes: {},
  remotes: {
    "admin-panel": "http://localhost:4201/remoteEntry.js",
    "user-panel": "http://localhost:4202/remoteEntry.js",
    "public-panel": "http://localhost:4203/remoteEntry.js",
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: true },
    "@angular/common": { singleton: true, strictVersion: true },
    "@angular/router": { singleton: true, strictVersion: true },
    "@angular/forms": { singleton: true, strictVersion: true },
    "@angular/animations": { singleton: true, strictVersion: true },
    rxjs: { singleton: true, strictVersion: true },
    primeng: { singleton: true, strictVersion: true },
    bootstrap: { singleton: true, strictVersion: true },
  },
});
