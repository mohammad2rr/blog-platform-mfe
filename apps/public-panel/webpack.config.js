const {
  withModuleFederation,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederation({
  name: "public-panel",
  exposes: {
    "./Home":
      "./projects/public-panel/src/app/components/home/home.component.ts",
    "./BlogPost":
      "./projects/public-panel/src/app/components/blog-post/blog-post.component.ts",
    "./BlogList":
      "./projects/public-panel/src/app/components/blog-list/blog-list.component.ts",
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
