const {
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  remotes: {
    adminPanel: "adminPanel@http://localhost:4201/remoteEntry.js",
    userPanel: "userPanel@http://localhost:4202/remoteEntry.js",
    publicPanel: "publicPanel@http://localhost:4203/remoteEntry.js",
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: true },
    "@angular/common": { singleton: true, strictVersion: true },
    "@angular/router": { singleton: true, strictVersion: true },
  },
});
