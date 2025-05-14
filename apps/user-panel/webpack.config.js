const {
  withModuleFederation,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederation({
  name: "user-panel",
  exposes: {
    "./UserProfile":
      "./projects/user-panel/src/app/components/profile/profile.component.ts",
    "./UserPosts":
      "./projects/user-panel/src/app/components/posts/posts.component.ts",
    "./UserSettings":
      "./projects/user-panel/src/app/components/settings/settings.component.ts",
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
