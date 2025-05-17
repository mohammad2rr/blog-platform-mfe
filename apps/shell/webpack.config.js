const {
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "shell",
  exposes: {},
  remotes: {
    "public-panel": "public-panel@http://localhost:4203/remoteEntry.js",
    "user-panel": "user-panel@http://localhost:4202/remoteEntry.js",
    "admin-panel": "admin-panel@http://localhost:4201/remoteEntry.js",
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: true },
    "@angular/common": { singleton: true, strictVersion: true },
    "@angular/router": { singleton: true, strictVersion: true },
    "@angular/forms": { singleton: true, strictVersion: true },
    rxjs: { singleton: true, strictVersion: true },
  },
});
