const {
  withModuleFederation,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederation({
  name: "admin-panel",
  exposes: {
    "./AdminDashboard":
      "./projects/admin-panel/src/app/components/dashboard/dashboard.component.ts",
    "./AdminPosts":
      "./projects/admin-panel/src/app/components/posts/posts.component.ts",
    "./AdminUsers":
      "./projects/admin-panel/src/app/components/users/users.component.ts",
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: true },
    "@angular/common": { singleton: true, strictVersion: true },
    "@angular/router": { singleton: true, strictVersion: true },
    "@angular/forms": { singleton: true, strictVersion: true },
    "@angular/animations": { singleton: true, strictVersion: true },
    rxjs: { singleton: true, strictVersion: true },
    bootstrap: { singleton: true, strictVersion: true },
    primeng: { singleton: true, strictVersion: true },
  },
});
