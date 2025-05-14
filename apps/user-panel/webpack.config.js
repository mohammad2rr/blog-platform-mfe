const {
  withModuleFederation,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederation({
  name: "user-panel",
  exposes: {
    "./UserModule": "./apps/user-panel/src/app/user.module.ts",
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
