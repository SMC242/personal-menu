import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginAstro from "eslint-plugin-astro";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";

export default tseslint.config(
  // pluginReact.configs.flat.recommended,
  ...tseslint.configs.recommended,
  pluginPrettier,
  pluginAstro.configs.recommended,
);
