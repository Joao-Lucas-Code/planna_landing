import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    // Build, dependencias e artefatos de QA manual — nada disso e codigo
    // nosso para lintar.
    ".next/**",
    "node_modules/**",
    ".qa-screenshots/**",
  ]),
]);
