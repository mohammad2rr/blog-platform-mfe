const {
  withModuleFederation,
} = require("@angular-architects/module-federation/webpack");
module.exports = withModuleFederation(require("./module-federation.config.js"));
