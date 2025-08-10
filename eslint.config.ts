import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginAstro from "eslint-plugin-astro";

export default tseslint.config(
  // pluginReact.configs.flat.recommended,
  ...tseslint.configs.recommended,
  pluginAstro.configs.recommended,
);
