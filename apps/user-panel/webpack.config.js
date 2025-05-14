const {
  withModuleFederation,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederation({
  name: "user-panel",
  exposes: {
    "./UserProfile":
      "./apps/user-panel/src/app/components/profile/profile.component.ts",
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: true },
    "@angular/common": { singleton: true, strictVersion: true },
    "@angular/router": { singleton: true, strictVersion: true },
    "@angular/forms": { singleton: true, strictVersion: true },
    rxjs: { singleton: true, strictVersion: true },
  },
});
