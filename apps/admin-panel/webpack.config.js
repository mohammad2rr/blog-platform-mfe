const {
  withModuleFederation,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederation({
  name: "admin-panel",
  exposes: {
    "./AdminDashboard":
      "./apps/admin-panel/src/app/components/dashboard/dashboard.component.ts",
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: true },
    "@angular/common": { singleton: true, strictVersion: true },
    "@angular/router": { singleton: true, strictVersion: true },
    "@angular/forms": { singleton: true, strictVersion: true },
    rxjs: { singleton: true, strictVersion: true },
  },
});
